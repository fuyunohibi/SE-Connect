from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import login, booking
from ZODB import DB, FileStorage
import transaction
from contextlib import contextmanager

# Initialize your FastAPI application
app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Include your routers
app.include_router(login.router)
app.include_router(booking.router)
