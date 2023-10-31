from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import persistent
import transaction
from ZODB import DB
from ZODB.FileStorage import FileStorage
import re

router = APIRouter()


class UserCreate(BaseModel):
    email: str
    password: str
    ID: str = ""
    year: str = ""
    faculty: str = ""
    department: str = ""

class UserDB(persistent.Persistent):
    def __init__(self, email, password, ID="", year="", faculty="", department=""):
        self.email = email
        self.password = password
        self.ID = ID
        self.year = year
        self.faculty = faculty
        self.department = department

# Open the database connection and get the root
storage = FileStorage('mydata.fs')
db = DB(storage)
conn = db.open()
root = conn.root()

# Implement user registration logic
def register_user(user: UserCreate):
    if user.email in root:
        return {"message":"Email already exists"}
        #raise HTTPException(status_code=400, detail="Email already exists")\
    #65011636@kmitl.ac.th
    user_email = user.email.split('@') #65011636 , kmitl.ac.th
    if(user_email[1] != "kmitl.ac.th" or not user_email[0].isdigit() or len(user_email[0]) != 8 or len(user_email) != 2):
        return {"message":"KMITL email only"}

    user_db = UserDB(**user.dict())
    root[user_db.email] = user_db
    transaction.commit()
    return {"message": "User registered successfully"}

@router.post("/register", response_model=dict)
async def register(user: UserCreate):
    return register_user(user)

# Implement login logic with extended User model
@router.post("/login", response_model=dict)
async def login(user: UserCreate):
    user_in_db = root.get(user.email)

    if user_in_db and user_in_db.password == user.password:
        return {"message": "Login successful"}
    
    raise HTTPException(status_code=401, detail="Login failed")


@router.get("/get_users")
def get_users():
    user_list = []
    for key, user in root.items():
        user_list.append({"email": user.email, "password": user.password, "ID": user.ID, "year": user.year, "faculty": user.faculty, "department": user.department})
    
    return user_list