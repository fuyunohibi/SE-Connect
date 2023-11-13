from fastapi import FastAPI, HTTPException, APIRouter, File, UploadFile, Query, Form
from pydantic import BaseModel
from ZODB import DB
from ZODB.FileStorage import FileStorage
from persistent import Persistent
from passlib.context import CryptContext
from typing import Optional
import transaction, base64, uuid, os

router = APIRouter()

# Password hashing configuration
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class UserCreate(BaseModel):
    email: str
    password: str
    firstname: str
    lastname: str
    ID: str
    year_of_study: str
    profile_picture: Optional[str] = None


class UserLogin(BaseModel):
    email: str
    password: str


class UserData(BaseModel):
    email: str
    firstname: str
    lastname: str
    ID: str
    year_of_study: str
    profile_picture: Optional[str] = None


# Define a UserDB class as a persistent object
class UserDB(Persistent):
    def __init__(
        self,
        email,
        password,
        firstname,
        lastname,
        ID,
        year_of_study,
        profile_picture=None,
    ):
        self.email = email
        self.password = password
        self.firstname = firstname
        self.lastname = lastname
        self.ID = ID
        self.year_of_study = year_of_study
        self.profile_picture = profile_picture


LOGIN_INFO = {"isLogin": False, "user": ""}

storage = FileStorage("user_data.fs")
db = DB(storage)
connection = db.open()
root = connection.root()

user_register = {
    "email": None,
    "password": None,
}


@router.post("/auth/register/identifier", response_model=dict)
async def register_email(email_data: dict):
    email = email_data["email"]
    if email in root:
        return {"message": "Email already exists"}

    user_email = email.split("@")
    if (
        user_email[1] != "kmitl.ac.th"
        or not user_email[0].isdigit()
        or len(user_email[0]) != 8
        or len(user_email) != 2
    ):
        return {"message": "Requires KMITL email only"}
    user_register["email"] = email
    return {"message": "Email is valid"}


@router.post("/auth/register/password", response_model=dict)
async def register_password(password_data: dict):
    password = password_data["password"]
    # Hash the password before storing it
    hashed_password = pwd_context.hash(password)
    user_register["password"] = hashed_password

    return {"message": "Password is valid"}


UPLOAD_FOLDER = "profileImages"

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)


# Function to save the uploaded file to a specific location within a subdirectory named after the user's ID
def save_uploaded_file(contents, filename, user_id):
    user_directory = os.path.join(UPLOAD_FOLDER, user_id)
    if not os.path.exists(user_directory):
        os.makedirs(user_directory)

    file_path = os.path.join(user_directory, filename)
    with open(file_path, "wb") as new_file:
        new_file.write(contents)

    return file_path


@router.post("/auth/register/user-details", response_model=dict)
async def register_user_details(
    firstname: str = Form(...),
    lastname: str = Form(...),
    ID: str = Form(...),
    year_of_study: str = Form(...),
    profile_picture: UploadFile = File(...),
):
    contents = await profile_picture.read()
    unique_filename = str(uuid.uuid4()) + ".jpeg"
    file_path = save_uploaded_file(contents, unique_filename, ID)

    user_db = UserDB(
        email=user_register["email"],
        password=user_register["password"],
        firstname=firstname,
        lastname=lastname,
        ID=ID,
        year_of_study=year_of_study,
        profile_picture=file_path,
    )
    root[user_register["email"]] = user_db
    transaction.commit()
    return {"message": "User registered successfully"}


user_login = {
    "email": None,
    "password": None,
}
IS_VALID_EMAIL = False


@router.post("/auth/login/identifier")
async def is_valid_email(email_data: dict):
    global IS_VALID_EMAIL
    email = email_data["email"]
    user_in_db = root.get(email)
    if user_in_db:
        IS_VALID_EMAIL = True
        user_login["email"] = email
        return {"message": "Email is valid"}
    return {"message": "Email not found"}


@router.post("/auth/login/password", response_model=dict)
async def is_valid_password(password_data: dict):
    password = password_data["password"]
    print(IS_VALID_EMAIL)
    if IS_VALID_EMAIL:
        user_in_db = root.get(user_login["email"])
        if user_in_db and pwd_context.verify(password, user_in_db.password):
            LOGIN_INFO["isLogin"] = True
            LOGIN_INFO["user"] = UserCreate(
                email=user_in_db.email,
                password=user_in_db.password,
                firstname=user_in_db.firstname,
                lastname=user_in_db.lastname,
                ID=user_in_db.ID,
                year_of_study=user_in_db.year_of_study,
            )
            return {"message": "Login successful"}
        return {"message": "Password is incorrect"}
    return {"message": "Email not found"}


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
            year_of_study=user.year_of_study,
            profile_picture=user.profile_picture,
        )
        for user in root.values()
    ]
    return user_list


@router.get("/users/{user_id}", response_model=UserData)
async def get_user_by_id(user_id: str):
    for user_key in root.keys():
        user = root[user_key]
        if user.ID == user_id:
            user_data = UserData(
                email=user.email,
                firstname=user.firstname,
                lastname=user.lastname,
                ID=user.ID,
                year_of_study=user.year_of_study,
                profile_picture=user.profile_picture,
            )
            return user_data
    return {"message": "User not found"}


@router.get("/logout", response_model=dict)
async def logout():
    if not LOGIN_INFO["isLogin"]:
        return {"message": "Login First"}
    else:
        LOGIN_INFO["isLogin"] = False
        LOGIN_INFO["user"] = ""
        return {"message": "Logout Successfully"}
