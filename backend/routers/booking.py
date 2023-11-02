from fastapi import APIRouter
from pydantic import BaseModel
import transaction
from ZODB import DB
from ZODB.FileStorage import FileStorage
import secrets
import string

router = APIRouter()

storage = FileStorage('roomdata3.fs')
db = DB(storage)
conn = db.open()
root = conn.root()

buildings = ["HM","ECC","Prathep"]


def generate_random_string(length):
    alphabet = string.ascii_letters + string.digits  # You can customize this to include other characters
    random_string = ''.join(secrets.choice(alphabet) for _ in range(length))
    return random_string

class BookARoom(BaseModel):
    ID: str
    building:str
    time:dict
    requestID:str
    date:str

    def __init__(self ,ID ,building ,time ,date):
        super().__init__(ID=ID ,building=building ,time=time ,requestID=generate_random_string(10) ,date=date)

                    #12:00, 13:30
def isGreaterTime(time1: str, time2: str):
    try:
        hour1, minute1 = map(int, time1.split(":"))
        hour2, minute2 = map(int, time2.split(":"))

        if hour1 > hour2 or (hour1 == hour2 and minute1 > minute2):
            return True
        else:
            return False
    except (ValueError, IndexError):
        return False

def isAvaliable(booking :BookARoom):
    if booking.building not in buildings:
        return False
    
    for request in root:
        book = root[request]
        if book.date != booking.date:
            continue
        if booking.building != book.building or booking.ID != book.ID:
            continue
        if isGreaterTime(booking.time["startTime"] ,book.time["startTime"]) and isGreaterTime(book.time["endTime"],booking.time["startTime"]):
            return False
        if isGreaterTime(booking.time["endTime"] ,book.time["startTime"]) and isGreaterTime(book.time["endTime"] ,booking.time["endTime"]):
            return False
        if isGreaterTime(booking.time["endTime"] ,book.time["endTime"]) and isGreaterTime(book.time["startTime"] ,booking.time["startTime"]):
            return False
        if isGreaterTime(book.time["endTime"] ,booking.time["endTime"]) and isGreaterTime(booking.time["startTime"] ,book.time["startTime"]):
            return False
        if booking.time["startTime"] == book.time["startTime"] or book.time["endTime"] == booking.time["endTime"]:
            return False
    return True
    
@router.post('/book/request' ,response_model=dict)
async def requestBooking(booking: BookARoom):
    if int(booking.time["startTime"][0:2]) > int(booking.time["endTime"][0:2]):
        return {"message":"Invalid Time"}
    elif booking.time["startTime"][0:2] == booking.time["endTime"][0:2]:
        if int(booking.time["startTime"][3:5]) >= int(booking.time["endTime"][3:5]):
            return {"message":"Invalid Time"}
        
    if not isAvaliable(booking):
        return {"message":"Unavaliable Room"}    
    root[booking.requestID] = booking
    transaction.commit()
    start_time = booking.time["startTime"]
    end_time = booking.time["endTime"]
    message = f"Building Name :{booking.building} ID : {booking.ID} Start Time : {start_time} End Time : {end_time} "
    return {"message":message}


@router.get("/get_rooms",response_model=list)
def get_rooms():
    room_list = []
    for request in root:
        room = root[request]
        room_list.append({
            "ID":room.ID,
            "building":room.building,
            "Start Time":room.time["startTime"],
            "End Time":room.time["endTime"],
            "requestID":room.requestID,
            "Date":room.date
        })
    return room_list


@router.get("/roomID/building={building}/id={ID}",response_model=list[dict])
async def getRoom(building:str ,ID:str):
    arr = []
    for r in root:
        room = root[r]
        if room.building == building and room.ID == ID:
            dict = {
                "ID":room.ID,
                "building":room.building,
                "Start Time":room.time["startTime"],
                "End Time":room.time["endTime"],
                "requestID":room.requestID,
                "Date":room.date
            }
            arr.append(dict)
    return arr