from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from routers import login, booking
from ZODB import DB, FileStorage
import transaction
from contextlib import contextmanager

# Define CORS settings
origins = [
    "http://127.0.0.1:3000",  
]


app = FastAPI()
app.mount("/static", StaticFiles(directory="profileImages"), name="static")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Include your routers
app.include_router(login.router)
app.include_router(booking.router)
