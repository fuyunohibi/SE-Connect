from fastapi import APIRouter, HTTPException, Form, File, UploadFile
from pydantic import BaseModel
from .database import init_db
from .booking import generate_random_string
from typing import List
from datetime import datetime
import transaction, uuid, os
from typing import Optional

router = APIRouter()

root = init_db("news_data.fs")


class NewsRequest(BaseModel):
    newsID: int = None
    title: str
    backgroundImage: Optional[str] = None
    profileImage: Optional[str] = None
    content: str
    date: str = None
    author: str
    authorID:str

    def __init__(self, **data):
        super().__init__(**data)
        self.newsID = generate_random_string(10)
        current_time = datetime.now()
        self.date = current_time.strftime("%Y-%m-%d")


UPLOAD_FOLDER = "files/newsImages"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


def save_uploaded_file(contents, filename, authorID):
    user_directory = os.path.join(UPLOAD_FOLDER, authorID)
    os.makedirs(user_directory, exist_ok=True)
    file_path = os.path.join(user_directory, filename)
    with open(file_path, "wb") as new_file:
        new_file.write(contents)
    return file_path


@router.post("/create/news", response_model=dict)
async def request_booking(
    title: str = Form(...),
    profileImage: str = Form(...),
    backgroundImage: UploadFile = File(...),
    content: str = Form(...),
    author: str = Form(...),
    authorID: str = Form(...)
):
    try:
        bgImage = await backgroundImage.read()
        unique_bg_filename = f"{uuid.uuid4()}.jpeg"
        bg_file_path = save_uploaded_file(bgImage, unique_bg_filename, authorID)

        news_db = NewsRequest(
            title=title,
            profileImage=profileImage,
            backgroundImage=bg_file_path,
            content=content,
            author=author,
            authorID=authorID,
        )
        root[news_db.newsID] = news_db
        transaction.commit()
        message = f"{news_db.title} has been posted!! "
        return {"message": message}
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/news/feed", response_model=List[NewsRequest])
async def get_all_news():
    # NOTE: Sort news first by date, then by time
    sorted_news_by_date = sorted(
        root.values(), key=lambda news: news.date, reverse=False
    )

    return sorted_news_by_date
  
@router.get("/news/{ID}")
async def getByID(ID : str):
    for new in root.values():
        if new.newsID == ID:
            return new.dict()
    return {"message":"ID not found"}
  
  
@router.get("/news/feed/latest-three", response_model=List[NewsRequest])
async def get_latest_news():
    # NOTE: ort news by date in descending order and take the first three
    sorted_news = sorted(
        root.values(), 
        key=lambda news: datetime.strptime(news.date, "%Y-%m-%d"), 
        reverse=True
    )
    latest_three_news = sorted_news[:3]
    return latest_three_news

