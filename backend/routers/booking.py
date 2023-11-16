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
    ID: str
    building: str
    availability: Dict[str, str]
    requestID: str = None
    date: str
    bookedBy: Dict[str, str]

    def __init__(self, **data):
        super().__init__(**data)
        self.requestID = generate_random_string(10)


class BookingResponse(BaseModel):
    requestID: str
    status: ReservationStatusEnum
    ID: str
    building: str
    availability: Dict[str, str]
    date: datetime
    bookedBy: Dict[str, str]


def is_available(booking: BookingRequest):
    if booking.building not in valid_buildings:
        return False

    for requestID in root:
        existing_booking = root[requestID]
        if existing_booking.status == ReservationStatusEnum.cancelled:
            continue
        if existing_booking.date != booking.date:
            continue
        if (
            booking.building != existing_booking.building
            or booking.ID != existing_booking.ID
        ):
            continue
        if (
            booking.availability["startTime"] < existing_booking.availability["endTime"]
            and booking.availability["endTime"]
            > existing_booking.availability["startTime"]
        ):
            return False
    return True


@router.post("/reservation/request", response_model=dict)
async def request_booking(booking: BookingRequest):
    if booking.availability["startTime"] >= booking.availability["endTime"]:
        raise HTTPException(status_code=400, detail="Bad Request: Invalid Time Slot")

    if not is_available(booking) or booking.status == ReservationStatusEnum.success:
        raise HTTPException(status_code=409, detail="Conflict: Room is Unavailable")

    booking.date = datetime.strptime(booking.date, "%d/%m/%Y")
    booking.status = ReservationStatusEnum.success
    root[booking.requestID] = booking
    transaction.commit()

    startTime = booking.availability["startTime"]
    endTime = booking.availability["endTime"]
    user_info = booking.bookedBy["firstname"] + " " + booking.bookedBy["lastname"]
    message = f"Building Name: {booking.building}, Room ID: {booking.ID}, Date: {booking.date}, Start Time: {startTime}, End Time: {endTime}, Booked by: {user_info}, Status: {booking.status.name}"

    return {"message": message}


@router.get("/reservation/all", response_model=list)
def get_all_reservations():
    def get_date_key(booking):
        if isinstance(booking.date, str):
            try:
                return datetime.strptime(booking.date, "%d/%m/%Y")
            except ValueError:
                # If parsing fails, handle it as needed or use a default datetime
                return datetime.min
        return booking.date

    sorted_bookings = sorted(
        root.values(),
        key=get_date_key,
    )

    return [
        BookingResponse(
            requestID=booking.requestID,
            status=booking.status,
            ID=booking.ID,
            building=booking.building,
            availability=booking.availability,
            date=get_date_key(booking),
            bookedBy=booking.bookedBy,
        )
        for booking in sorted_bookings
        if isinstance(booking, BookingRequest)
    ]


@router.get("/reservation/building={building}/ID={ID}", response_model=list)
async def get_room(building: str, ID: str):
    room_bookings = []
    for requestID in root:
        booking = root[requestID]
        if (
            isinstance(booking, BookingRequest)
            and booking.building == building
            and booking.ID == ID
        ):
            booking_info = BookingResponse(
                requestID=booking.requestID,
                status=booking.status,
                ID=booking.ID,
                building=booking.building,
                availability=booking.availability,
                date=booking.date,
                bookedBy=booking.bookedBy,
            )
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

@router.get("/reservation/latest/{firstname}/{lastname}")
def get_user_latest_reservation(firstname:str, lastname:str):
    arr = []
    for room in root.values():
        if(room.bookedBy["firstname"] == firstname and room.bookedBy["lastname"] == lastname):
            arr.append(room)
    if(len(arr) > 0):
        return arr[len(arr) - 1].dict()
    return {"message":"User has not booked any room yet"}