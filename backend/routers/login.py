from fastapi import FastAPI, HTTPException, APIRouter
from pydantic import BaseModel
from ZODB import DB
from ZODB.FileStorage import FileStorage
from persistent import Persistent
from passlib.context import CryptContext
import transaction

router = APIRouter()

# Password hashing configuration
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class UserCreate(BaseModel):
    email: str
    password: str
    firstname: str
    lastname: str
    ID: str
    year: str
    faculty: str
    department: str

class UserLogin(BaseModel):
    email: str
    password: str

class UserData(BaseModel):
    email: str
    firstname: str
    lastname: str
    ID: str
    year: str
    faculty: str
    department: str

# Define a UserDB class as a persistent object
class UserDB(Persistent):
    def __init__(self, email, password, firstname, lastname, ID, year, faculty, department):
        self.email = email
        self.password = password
        self.firstname = firstname
        self.lastname = lastname
        self.ID = ID
        self.year = year
        self.faculty = faculty
        self.department = department

LOGIN_INFO = {"isLogin": False, "user": ""}

storage = FileStorage("user_data.fs")
db = DB(storage)
conn = db.open()
root = conn.root()

def register_user(user: UserCreate):
    if user.email in root:
        return {"message": "Email already exists"}

    user_email = user.email.split("@")
    if (
        user_email[1] != "kmitl.ac.th"
        or not user_email[0].isdigit()
        or len(user_email[0]) != 8
        or len(user_email) != 2
    ):
        return {"message": "KMITL email only"}

    # Hash the password before storing it
    hashed_password = pwd_context.hash(user.password)

    # Create a unique key for each user (e.g., using email as the key)
    user_db = UserDB(
        email=user.email,
        password=hashed_password,
        firstname=user.firstname,
        lastname=user.lastname,
        ID=user.ID,
        year=user.year,
        faculty=user.faculty,
        department=user.department,
    )
    root[user.email] = user_db
    transaction.commit()
    return {"message": "User registered successfully"}

@router.post("/register", response_model=dict)
async def register(user: UserCreate):
    return register_user(user)

@router.post("/login", response_model=dict)
async def login(user: UserLogin):
    user_in_db = root.get(user.email)

    if user_in_db and pwd_context.verify(user.password, user_in_db.password):
        LOGIN_INFO["isLogin"] = True
        LOGIN_INFO["user"] = UserCreate(
            email=user_in_db.email,
            password=user_in_db.password,
            firstname=user_in_db.firstname,
            lastname=user_in_db.lastname,
            ID=user_in_db.ID,
            year=user_in_db.year,
            faculty=user_in_db.faculty,
            department=user_in_db.department,
        )
        return {"message": "Login successful"}
    
    return {"message": "Login failed"}

@router.put("/update_password", response_model=dict)
async def update_password(request_data: UserLogin):
    email = request_data.email
    new_password = request_data.new_password
    user_in_db = root.get(email)
    if user_in_db:
        # Hash the new password
        new_hashed_password = pwd_context.hash(new_password)
        user_in_db.password = new_hashed_password
        transaction.commit()
        return {"message": "Password updated successfully"}
    return {"message": "User not found"}

@router.get("/users/all", response_model=list[UserData])
async def get_all_users():
    user_list = [
        UserData(
            email=user.email,
            ID=user.ID,
            firstname=user.firstname,
            lastname=user.lastname,
            year=user.year,
            faculty=user.faculty,
            department=user.department,
        )
        for user in root.values()
    ]
    return user_list

@router.get("/users/{user_id}", response_model=dict)
async def get_user_by_id(user_id: str):
    for i in router:
        user = router[i]
        if user.ID == user_id:
            return user.dict()
    return {"message": "User not found"}

@router.get("/logout", response_model=dict)
async def logout():
    if not LOGIN_INFO["isLogin"]:
        return {"message": "Login First"}
    else:
        LOGIN_INFO["isLogin"] = False
        LOGIN_INFO["user"] = ""
        return {"message": "Logout Successfully"}