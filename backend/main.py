from fastapi import FastAPI
from routers import login, booking
from ZODB import DB, FileStorage
import transaction
from contextlib import contextmanager
import transaction

app = FastAPI()

# Define a context manager for the ZODB connection
@contextmanager
def zodb_connection():
    storage = FileStorage('mydata.fs')
    db = DB(storage)
    conn = db.open()
    root = conn.root()
    try:
        yield conn, root
    finally:
        transaction.commit()
        conn.close()
        db.close()

# Include your routers
app.include_router(login.router)
app.include_router(booking.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)
