# Pochara Wiangkham

## Prerequisites

Before you can run the code, you'll need to install the following Python packages. You can install them using pip:

```bash
pip install uvicorn
pip install fastapi
pip install zodb
pip install passlib
pip install bcrypt
pip install python-multipart
pip install "pydantic[email]"
pip install PyJWT
```
## Getting Started
Navigate to the 'backend' folder in the cloned repository.
```bash
cd backend
```
Run the following command to start the application

```bash
uvicorn main:app --reload
```