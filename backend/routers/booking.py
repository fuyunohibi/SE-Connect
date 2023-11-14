from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from routers import login
from ZODB import DB
from ZODB.FileStorage import FileStorage
from .database import init_db
import transaction, secrets, string

router = APIRouter()

root = init_db("booking_data.fs")

valid_buildings = {"HM", "ECC", "Prathep"}


def generate_random_string(length):
    alphabet = string.ascii_letters + string.digits
    random_string = "".join(secrets.choice(alphabet) for _ in range(length))
    return random_string


class BookingRequest(BaseModel):
    room_id: str
    building: str
    time_slot: dict
    request_id: str
    date: str
    booked_by: str
    phone_number: str

    def __init__(self, room_id, building, time_slot, date, phone_number):
        super().__init__(
            room_id=room_id,
            building=building,
            time_slot=time_slot,
            request_id=generate_random_string(10),
            date=date,
            booked_by="",
            phone_number=phone_number,
        )


def is_available(booking: BookingRequest):
    if booking.building not in valid_buildings:
        return False

    for request_id in root:
        existing_booking = root[request_id]
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
    if not login.LOGIN_INFO["isLogin"]:
        raise HTTPException(status_code=401, detail="Unauthorized: Please Login First")

    if booking.time_slot["start_time"] >= booking.time_slot["end_time"]:
        raise HTTPException(status_code=400, detail="Bad Request: Invalid Time Slot")

    if not is_available(booking):
        raise HTTPException(status_code=409, detail="Conflict: Room is Unavailable")

    booking.booked_by = login.LOGIN_INFO["user"]
    root[booking.request_id] = booking
    transaction.commit()

    start_time = booking.time_slot["start_time"]
    end_time = booking.time_slot["end_time"]
    message = f"Building Name: {booking.building}, Room ID: {booking.room_id}, Start Time: {start_time}, End Time: {end_time}"

    return {"message": message}


@router.get("/reservation/all", response_model=list)
def get_all_rooms():
    room_list = []
    for request_id in root:
        booking = root[request_id]
        booked_by = booking.booked_by
        user_info = {
            "email": booked_by.email,
            "firstname": booked_by.firstname,
            "lastname": booked_by.lastname,
        }
        room_list.append(
            {
                "Building": booking.building,
                "Room ID": booking.room_id,
                "Start Time": booking.time_slot["start_time"],
                "End Time": booking.time_slot["end_time"],
                "Request ID": booking.request_id,
                "Date": booking.date,
                "Booked By": user_info,
                "phone_number": booking.phone_number,
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
            booked_by = booking.booked_by
            user_info = {
                "email": booked_by.email,
                "firstname": booked_by.firstname,
                "lastname": booked_by.lastname,
            }
            booking_info = {
                "Building": booking.building,
                "Room ID": booking.room_id,
                "Start Time": booking.time_slot["start_time"],
                "End Time": booking.time_slot["end_time"],
                "Request ID": booking.request_id,
                "Date": booking.date,
                "Booked By": user_info,
                "phone_number": booking.phone_number,
            }
            room_bookings.append(booking_info)
    return room_bookings


@router.delete("/reservation/cancel/{requestID}")
def cancel_room(requestID: str):
    try:
        # Check if the data with the specified ID exists
        if requestID in root:
            user_email = (
                login.LOGIN_INFO["user"].email if login.LOGIN_INFO["user"] else None
            )

            if root[requestID].booked_by.email == user_email:
                # Delete the data
                del root[requestID]
                transaction.commit()
                transaction.begin()
                return {"message": f"Request ID: {requestID} deleted successfully"}
            else:
                raise HTTPException(
                    status_code=403,
                    detail="You are not authorized to cancel this room reservation",
                )
        else:
            raise HTTPException(
                status_code=404, detail=f"Request ID: {requestID} not found"
            )
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
