from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from routers import login, booking
from ZODB import DB, FileStorage
import transaction
from contextlib import contextmanager

app = FastAPI()
app.mount("/files", StaticFiles(directory="files"), name="files")


# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Include your routers
app.include_router(login.router)
app.include_router(booking.router)
