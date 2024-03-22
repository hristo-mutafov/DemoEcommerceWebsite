# Project Setup

For running this project locally, you should have Python, Pip and Docker installed.

## Setup Steps

1. Create a `.env` file, following the `.env.example` file (copy-paste it for the default setup).

2. Create a virtual environment (venv):
   - For Windows:
     ```
     py -m venv venv
     ```
   - For Unix/MacOS:
     ```
     python -m venv venv
     ```
   *If these commands fail with an error like "python not recognized," try replacing "python" with "python3" or "py."

3. After creating the virtual environment, activate it:
   - For Windows:
     ```
     venv\Scripts\activate.bat
     ```
   - For Unix/MacOS:
     ```
     source venv/bin/activate
     ```

4. Install the dependencies:
    ```
     pip install -r requirements.txt
     ```

## Setting up PostgreSQL Docker Container

5. Build and run your PostgreSQL Docker container:
- Create the image from Dockerfile:
  ```
  docker build -t my-postgres-image .
  ```
  *my-postgres-image => the name of the image

- Run the image:
  ```
  docker run --name my-postgres-container -p 5432:5432 -d my-postgres-image
  ```
  *my-postgres-image => the name of the already created image
  *my-postgres-container => the name of the container


## Run it locally

6. Apply the database migrations:
```
  python manage.py migrate
  ```

7. Run the local server:
```
  python manage.py runserver
  ```

## Test it locally
You can test it locally using the provided Postman collection named:
```
DemoEcommerceWebsite.postman_collection.json
```
