import jwt
import datetime
from fastapi import HTTPException, APIRouter, File, UploadFile, Form, status, Depends
from pydantic import BaseModel, EmailStr
from persistent import Persistent
from passlib.context import CryptContext
from passlib.context import CryptContext
from typing import Optional
from .database import init_db
import transaction, uuid, os

# SECRET: secure key in production
SECRET_KEY = "$/se-connect/hello-world-from-mesan/14-11-2023$"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

router = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def create_access_token(data: dict, expires_delta: datetime.timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.datetime.utcnow() + expires_delta
    else:
        expire = datetime.datetime.utcnow() + datetime.timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


class UserCreate(BaseModel):
    email: EmailStr
    password: str
    firstname: str
    lastname: str
    ID: str
    year_of_study: str
    profile_picture: Optional[str] = None


class UserRegistrationData(BaseModel):
    registration_id: str
    firstname: str
    lastname: str
    ID: str
    year_of_study: str
    profile_picture: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserData(UserCreate):
    password: str


class UserDB(Persistent):
    def __init__(self, user_data: UserCreate):
        self.logged_in = False
        for field in user_data.dict():
            setattr(self, field, user_data.dict()[field])


class UserResponse(BaseModel):
    email: EmailStr
    firstname: str
    lastname: str
    ID: str
    year_of_study: str
    profile_picture: Optional[str] = None


root = init_db()
in_progress_registrations = {}


# NOTE: Validate KMITL email
def is_valid_kmitl_email(email: str) -> bool:
    return (
        email.endswith("@kmitl.ac.th")
        and email.split("@")[0].isdigit()
        and len(email.split("@")[0]) == 8
    )


@router.post("/auth/signup/identifier", response_model=dict)
async def register_email(user_data: dict):
    email = user_data.get("email")
    if email in root:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="Email already exists"
        )

    if not is_valid_kmitl_email(email):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Requires KMITL email only"
        )

    registration_id = str(uuid.uuid4())
    in_progress_registrations[registration_id] = {"email": email}
    return {"registration_id": registration_id, "message": "Email is valid"}


@router.post("/auth/signup/password", response_model=dict)
async def register_password(user_data: dict):
    registration_id = user_data.get("registration_id")
    password = user_data.get("password")

    registration_data = in_progress_registrations.get(registration_id)
    if not registration_data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid registration process.",
        )
    
    hashed_password = pwd_context.hash(password)
    registration_data["password"] = hashed_password
    in_progress_registrations[registration_id] = registration_data

    return {"message": "Password is valid"}


UPLOAD_FOLDER = "profileImages"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


# NOTE: Save the uploaded file
def save_uploaded_file(contents, filename, user_id):
    user_directory = os.path.join(UPLOAD_FOLDER, user_id)
    os.makedirs(user_directory, exist_ok=True)
    file_path = os.path.join(user_directory, filename)
    with open(file_path, "wb") as new_file:
        new_file.write(contents)
    return file_path


@router.post("/auth/signup/user-details", response_model=dict)
async def register_user_details(
    registration_id: str = Form(...),
    firstname: str = Form(...),
    lastname: str = Form(...),
    ID: str = Form(...),
    year_of_study: str = Form(...),
    profile_picture: UploadFile = File(...),
):
    try:
        registration_data = in_progress_registrations.get(registration_id)
        if not registration_data:
            raise HTTPException(status_code=400, detail="Invalid registration process.")

        email = registration_data.get("email")
        hashed_password = registration_data.get("password")

        if email is None or hashed_password is None:
            raise HTTPException(
                status_code=400,
                detail="Email and password are required",
            )

        contents = await profile_picture.read()
        unique_filename = f"{uuid.uuid4()}.jpeg"
        file_path = save_uploaded_file(contents, unique_filename, ID)

        user_db = UserDB(
            UserCreate(
                email=email,
                password=hashed_password,
                firstname=firstname,
                lastname=lastname,
                ID=ID,
                year_of_study=year_of_study,
                profile_picture=file_path,
            )
        )
        root[email] = user_db
        
        user_in_db = root.get(email)
        
        if user_in_db and pwd_context.verify(password, user_in_db.password):
          user_in_db.logged_in = True
        transaction.commit()

        access_token_expires = datetime.timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": email}, expires_delta=access_token_expires
        )
        return {
            "message": "Register & successful",
            "access_token": access_token,
            "token_type": "bearer",
            "user": {
                "logged_in": user_in_db.logged_in,
                "email": user_in_db.email,
                "firstname": user_in_db.firstname,
                "lastname": user_in_db.lastname,
                "ID": user_in_db.ID,
                "year_of_study": user_in_db.year_of_study,
                "profile_picture": user_in_db.profile_picture,
            },
        }

    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/auth/login/identifier", response_model=dict)
async def is_valid_email(email: EmailStr):
    user_in_db = root.get(email)
    if user_in_db:
        return {"message": "Email is valid"}
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Email not found")


@router.post("/auth/login/password", response_model=dict)
async def is_valid_password(login_data: UserLogin):
    email = login_data.email
    password = login_data.password

    user_in_db = root.get(email)

    if user_in_db and pwd_context.verify(password, user_in_db.password):
        user_in_db.logged_in = True
        transaction.commit()

        access_token_expires = datetime.timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": email}, expires_delta=access_token_expires
        )
        return {
            "message": "Login successful",
            "access_token": access_token,
            "token_type": "bearer",
            "user": {
                "email": user_in_db.email,
                "firstname": user_in_db.firstname,
                "lastname": user_in_db.lastname,
                "ID": user_in_db.ID,
                "year_of_study": user_in_db.year_of_study,
                "profile_picture": user_in_db.profile_picture,
            },
        }

    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials"
    )


@router.put("/update_password", response_model=dict)
async def update_password(email: EmailStr, new_password: str):
    user_in_db = root.get(email)
    if user_in_db:
        # Hash the new password
        new_hashed_password = pwd_context.hash(new_password)
        user_in_db.password = new_hashed_password
        transaction.commit()
        return {"message": "Password updated successfully"}
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")


@router.get("/users/all", response_model=list[UserResponse])
async def get_all_users():
    return [
        UserResponse(
            email=user.email,
            firstname=user.firstname,
            lastname=user.lastname,
            ID=user.ID,
            year_of_study=user.year_of_study,
            profile_picture=user.profile_picture,
        )
        for user in root.values()
        if isinstance(user, UserDB)
    ]


@router.get("/users/{user_id}", response_model=UserResponse)
async def get_user_by_id(user_id: str):
    for user in root.values():
        if isinstance(user, UserDB) and user.ID == user_id:
            return UserResponse(
                email=user.email,
                firstname=user.firstname,
                lastname=user.lastname,
                ID=user.ID,
                year_of_study=user.year_of_study,
                profile_picture=user.profile_picture,
            )
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")


@router.get("/logout", response_model=dict)
async def logout(email: EmailStr):
    user_in_db = root.get(email)
    if user_in_db and user_in_db.logged_in:
        transaction.commit()
        return {"message": "Logged out successfully"}
    raise HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="User not logged in or email mismatch",
    )
