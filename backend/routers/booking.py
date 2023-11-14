from fastapi import APIRouter
from pydantic import BaseModel
from routers import login
from ZODB import DB
from ZODB.FileStorage import FileStorage
import transaction
import secrets
import string

router = APIRouter()

storage = FileStorage('booking_data1.fs')
db = DB(storage)
connection = db.open()
root = connection.root()

valid_buildings = {"HM", "ECC", "Prathep"}

def generate_random_string(length):
    alphabet = string.ascii_letters + string.digits
    random_string = ''.join(secrets.choice(alphabet) for _ in range(length))
    return random_string

class BookingRequest(BaseModel):
    room_id: str
    building: str
    time_slot: dict
    request_id: str
    date: str
    booked_by: str
    phoneNumber: str

    def __init__(self, room_id, building, time_slot, date ,phoneNumber):
        super().__init__(room_id=room_id, building=building, time_slot=time_slot, request_id=generate_random_string(10), date=date, booked_by="",phoneNumber=phoneNumber)

def is_available(booking: BookingRequest):
    if booking.building not in valid_buildings:
        return False
    
    for request_id in root:
        existing_booking = root[request_id]
        if existing_booking.date != booking.date:
            continue
        if booking.building != existing_booking.building or booking.room_id != existing_booking.room_id:
            continue
        if booking.time_slot["start_time"] < existing_booking.time_slot["end_time"] and booking.time_slot["end_time"] > existing_booking.time_slot["start_time"]:
            return False
    return True

@router.post('/reservation/request', response_model=dict)
async def request_booking(booking: BookingRequest):
    if not login.LOGIN_INFO["isLogin"]:
        return {'message':"Please Login First"}
    
    if booking.time_slot["start_time"] >= booking.time_slot["end_time"]:
        return {"message": "Invalid Time"}
    
    if not is_available(booking):
        return {"message": "Unavailable Room"}
    
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
            "lastname": booked_by.lastname
        }
        room_list.append({
            "Building": booking.building,
            "Room ID": booking.room_id,
            "Start Time": booking.time_slot["start_time"],
            "End Time": booking.time_slot["end_time"],
            "Request ID": booking.request_id,
            "Date": booking.date,
            "Booked By": user_info,
            "phoneNumber":booking.phoneNumber
        })
    return room_list


@router.get("/reservation/building={building}/room_id={room_id}", response_model=list[dict])
async def get_room(building: str, room_id: str):
    room_bookings = []
    for request_id in root:
        booking = root[request_id]
        if booking.building == building and booking.room_id == room_id:
            booked_by = booking.booked_by
            user_info = {
                "email": booked_by.email,
                "firstname": booked_by.firstname,
                "lastname": booked_by.lastname
            }
            booking_info = {
                "Building": booking.building,
                "Room ID": booking.room_id,
                "Start Time": booking.time_slot["start_time"],
                "End Time": booking.time_slot["end_time"],
                "Request ID": booking.request_id,
                "Date": booking.date,
                "Booked By": user_info,
                "phoneNumber":booking.phoneNumber
            }
            room_bookings.append(booking_info)
    return room_bookings