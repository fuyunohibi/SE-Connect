# Pochara Wiangkham

## Prerequisites

Before you can run the code, you'll need to install the following Python packages:

- [passlib](https://pypi.org/project/passlib/)
- [bcrypt](https://pypi.org/project/bcrypt/)

You can install them using pip:

```bash
pip install passlib
pip install bcrypt
pip install python-multipart
pip install "pydantic[email]"
uvicorn main:app --reload
```
## Getting Started
Navigate to the 'backend' folder in the cloned repository.
```bash
cd backend
```
Run the following command to start the application

```bash
python populate_db.py
uvicorn main:app --reload
```