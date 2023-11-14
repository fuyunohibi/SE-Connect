from ZODB import DB
from ZODB.FileStorage import FileStorage


def init_db(file_name="user_data.fs"):
    storage = FileStorage(file_name)
    db = DB(storage)
    connection = db.open()
    return connection.root()
