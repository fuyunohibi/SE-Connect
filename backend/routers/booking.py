from fastapi import APIRouter
from pydantic import BaseModel
import transaction
from ZODB import DB
from ZODB.FileStorage import FileStorage
import secrets
import string

router = APIRouter()

storage = FileStorage('roomdata.fs')
db = DB(storage)
conn = db.open()
root = conn.root()

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

    def __init__(self, room_id, building, time_slot, date):
        super().__init__(room_id=room_id, building=building, time_slot=time_slot, request_id=generate_random_string(10), date=date)

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

@router.post('/book/request', response_model=dict)
async def request_booking(booking: BookingRequest):
    if booking.time_slot["start_time"] >= booking.time_slot["end_time"]:
        return {"message": "Invalid Time"}
    
    if not is_available(booking):
        return {"message": "Unavailable Room"}    

    root[booking.request_id] = booking
    transaction.commit()
    start_time = booking.time_slot["start_time"]
    end_time = booking.time_slot["end_time"]
    message = f"Building Name: {booking.building}, Room ID: {booking.room_id}, Start Time: {start_time}, End Time: {end_time}"
    return {"message": message}

@router.get("/get_rooms", response_model=list)
def get_rooms():
    room_list = []
    for request_id in root:
        booking = root[request_id]
        room_list.append({
            "Room ID": booking.room_id,
            "Building": booking.building,
            "Start Time": booking.time_slot["start_time"],
            "End Time": booking.time_slot["end_time"],
            "Request ID": booking.request_id,
            "Date": booking.date
        })
    return room_list

@router.get("/room/room_id={room_id}/building={building}", response_model=list[dict])
async def get_rooms_for_user(room_id: str, building: str):
    room_bookings = []
    for request_id in root:
        booking = root[request_id]
        if booking.building == building and booking.room_id == room_id:
            booking_info = {
                "Room ID": booking.room_id,
                "Building": booking.building,
                "Start Time": booking.time_slot["start_time"],
                "End Time": booking.time_slot["end_time"],
                "Request ID": booking.request_id,
                "Date": booking.date
            }
            room_bookings.append(booking_info)
    return room_bookings