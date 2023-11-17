from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from .database import init_db
from enum import Enum
from typing import Dict
import transaction, secrets, string

router = APIRouter()

root = init_db("locker_data.fs")

class LockerStatusEnum(str, Enum):
    available = "available"
    unavailable = "unavailable"

def initialize_lockers():
    for i in range(1, 134):  # Create 133 lockers
        locker_id = str(i)
        if locker_id not in root:  
            root[locker_id] = LockerRequest(
                lockerID=locker_id,
                status=LockerStatusEnum.available,
                lockerPassword="",
                owner={}
            )
    transaction.commit()
    
class LockerRequest(BaseModel):
    lockerID: str
    status: LockerStatusEnum = LockerStatusEnum.available
    lockerPassword: str
    owner: Dict[str, str]


@router.post("/reservation/locker/request", response_model=dict)
async def request_booking(booking: LockerRequest):
    locker_id = booking.lockerID

    if locker_id in root and root[locker_id].status == LockerStatusEnum.unavailable:
        raise HTTPException(status_code=409, detail="Conflict: Locker is Unavailable")
    root[locker_id] = LockerRequest(
        lockerID=locker_id,
        status=LockerStatusEnum.unavailable,  # Setting the status as unavailable
        lockerPassword=booking.lockerPassword,
        owner=booking.owner
    )
    transaction.commit()

    return root[locker_id].dict()



@router.get("/reservation/locker/all", response_model=list)
def get_all_reservations():
    return [
        LockerRequest(
            status=booking.status,
            lockerID=booking.lockerID,
            lockerPassword=booking.lockerPassword,
            owner=booking.owner,
        )
        for booking in root.values()
    ]