from ZODB import DB
from ZODB.FileStorage import FileStorage
import persistent
import transaction

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

try:
    users = [
        UserDB(email="12user1@example.com", password="password1", ID="123", year="2023", faculty="Engineering", department="Computer Science"),
        UserDB(email="12user2@example.com", password="password2", ID="456", year="2024", faculty="Science", department="Physics"),
    ]

    for user in users:
        root[user.email] = user

    transaction.commit()
    print("Database populated with sample user data.")
except Exception as e:
    transaction.abort()
    print("Error:", str(e))
finally:
    conn.close()
    db.close()
