from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from .database import init_db
from enum import Enum
from typing import Dict
from datetime import datetime
import transaction, secrets, string

router = APIRouter()

root = init_db("booking_data.fs")

valid_buildings = {"HM", "ECC", "Prathep"}


class ReservationStatusEnum(str, Enum):
    idle = "idle"
    success = "success"
    cancelled = "cancelled"


def generate_random_string(length):
    alphabet = string.ascii_letters + string.digits
    random_string = "".join(secrets.choice(alphabet) for _ in range(length))
    return random_string


class BookingRequest(BaseModel):
    status: ReservationStatusEnum = ReservationStatusEnum.idle
    room_id: str
    building: str
    time_slot: Dict[str, str]
    request_id: str = None
    date: str
    booked_by: Dict[str, str]

    def __init__(self, **data):
        super().__init__(**data)
        self.request_id = generate_random_string(10)


def is_available(booking: BookingRequest):
    if booking.building not in valid_buildings:
        return False

    for request_id in root:
        existing_booking = root[request_id]
        if existing_booking.status == ReservationStatusEnum.cancelled:
            continue
        if existing_booking.date != booking.date:
            continue
        if (
            booking.building != existing_booking.building
            or booking.room_id != existing_booking.room_id
        ):
            continue
        if (
            booking.time_slot["start_time"] < existing_booking.time_slot["end_time"]
            and booking.time_slot["end_time"] > existing_booking.time_slot["start_time"]
        ):
            return False
    return True


@router.post("/reservation/request", response_model=dict)
async def request_booking(booking: BookingRequest):
    if booking.time_slot["start_time"] >= booking.time_slot["end_time"]:
        raise HTTPException(status_code=400, detail="Bad Request: Invalid Time Slot")

    if not is_available(booking) or booking.status == ReservationStatusEnum.success:
        raise HTTPException(status_code=409, detail="Conflict: Room is Unavailable")

    booking.status = ReservationStatusEnum.success
    root[booking.request_id] = booking
    transaction.commit()

    start_time = booking.time_slot["start_time"]
    end_time = booking.time_slot["end_time"]
    user_info = booking.booked_by["firstname"] + " " + booking.booked_by["lastname"]
    iso_date = datetime.strptime(booking.date, "%d/%m/%Y").isoformat()
    message = f"Building Name: {booking.building}, Room ID: {booking.room_id}, Date: {iso_date}, Start Time: {start_time}, End Time: {end_time}, Booked by: {user_info}, Status: {booking.status.name}"

    return {"message": message}


@router.get("/reservation/all", response_model=list)
def get_all_rooms():
    room_list = []
    for request_id in root:
        booking = root[request_id]
        user_info = booking.booked_by["firstname"] + " " + booking.booked_by["lastname"]
        iso_date = datetime.strptime(booking.date, "%d/%m/%Y").isoformat()
        room_list.append(
            {
                booking
            }
        )
    return room_list


@router.get(
    "/reservation/building={building}/room_id={room_id}", response_model=list[dict]
)
async def get_room(building: str, room_id: str):
    room_bookings = []
    for request_id in root:
        booking = root[request_id]
        if booking.building == building and booking.room_id == room_id:
            user_info = (
                booking.booked_by["firstname"] + " " + booking.booked_by["lastname"]
            )
            iso_date = datetime.strptime(booking.date, "%d/%m/%Y").isoformat()
            booking_info = {
                "Building": booking.building,
                "Room ID": booking.room_id,
                "Start Time": booking.time_slot["start_time"],
                "End Time": booking.time_slot["end_time"],
                "Request ID": booking.request_id,
                "Date": iso_date,
                "Booked By": user_info,
                "Status": booking.status,
            }
            room_bookings.append(booking_info)
    return room_bookings


@router.delete("/reservation/cancel/{requestID}")
def cancel_room(requestID: str):
    try:
        # Check if the data with the specified ID exists
        if requestID in root:
            root[requestID].status = ReservationStatusEnum.cancelled
            transaction.commit()
            return {"message": f"Request ID: {requestID} cancelled successfully"}
        else:
            raise HTTPException(
                status_code=404, detail=f"Request ID: {requestID} not found"
            )
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
