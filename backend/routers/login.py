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
    ID: str = ""
    year: str = ""
    faculty: str = ""
    department: str = ""

class UserData(BaseModel):
    email: str
    ID: str
    year: str
    faculty: str
    department: str

# Define a UserDB class as a persistent object
class UserDB(Persistent):
    def __init__(self, email, password, ID="", year="", faculty="", department=""):
        self.email = email
        self.password = password
        self.ID = ID
        self.year = year
        self.faculty = faculty
        self.department = department

class PasswordUpdateRequest(BaseModel):
    email: str
    new_password: str

# Open the database connection and get the root
storage = FileStorage('mydata.fs')
db = DB(storage)
conn = db.open()
root = conn.root()

# Implement user registration logic
def register_user(user: UserCreate):
    if user.email in root:
        return {"message": "Email already exists"}
    
    user_email = user.email.split('@')
    if (user_email[1] != "kmitl.ac.th" or not user_email[0].isdigit() or len(user_email[0]) != 8 or len(user_email) != 2):
        return {"message": "KMITL email only"}

    # Hash the password before storing it
    hashed_password = pwd_context.hash(user.password)
    
    # Create a unique key for each user (e.g., using email as the key)
    user_db = UserDB(email=user.email, password=hashed_password, ID=user.ID, year=user.year, faculty=user.faculty, department=user.department)
    root[user.email] = user_db
    transaction.commit()
    return {"message": "User registered successfully"}

@router.post("/register", response_model=dict)
async def register(user: UserCreate):
    return register_user(user)

# Implement login logic
@router.post("/login", response_model=dict)
async def login(user: UserCreate):
    user_in_db = root.get(user.email)

    if user_in_db and pwd_context.verify(user.password, user_in_db.password):
        return {"message": "Login successful"}
    
    return {"message": "Login failed"}

@router.put("/update_password", response_model=dict)
async def update_password(request_data: PasswordUpdateRequest):
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


# Add a new endpoint to retrieve user data
@router.get("/get_users", response_model=list[UserData])
async def get_users():
    user_list = [UserData(email=user.email, ID=user.ID, year=user.year, faculty=user.faculty, department=user.department) for user in root.values()]
    return user_list