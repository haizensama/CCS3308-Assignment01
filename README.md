This assignment was done by 22UG2-0179

This readme files contains detailed instructions on how you can run this dockerized application locally on your machine or cloud device.

Deployment Requirements: 

Docker installed for dockerization
Ubuntu as Operating System
Internet connection to download dependecies
Git installed for cloning


• Application Description: 

The application is a simple to-do application that is built to log tasks that the user has to complete. The UI is simple and color coded with red and green buttons to mimic general design principles.

Once the user enters a task into the text box and clicks on Add, it will be added onto the list.
When the task is completed, it can be selected from the list and deleted.


• Network and Volume Details: 

Network Name-
Network todo-app_todo-net

The network is a user-defined bridge network which will allow the frontend, backend, and database to communicate with each other through their service names.

Volume Name-
Volume "todo-app_pgdata"

The volume called todo-app_pgdata is created through the setup in order to persist PostgreSQL data.
The mountpoint of the volume is (/var/lib/postgresql/data).

To find the mountpoint of the volume run the command: docker volume inspect pgdata


• Container Configuration: 

All the containers below are connected to the todo-net network

db (PostgreSQL)

Image: postgres:15
container name is set to todo-db
The environment variables will configure the database name, user, and password.
There is an initialization script called init.sql to set up a scheme on the first execution.
The restart policy is set to unless-stopped

backend (Express.js API Server)

Image: node:18
This is built from the ./backend folder
container name is to todo-backend 
The database is connected to the backend through env variables such as DB_HOST= db and DB_USER=todo_user
The API for the backend is exposed on port 5000
Rest endpoints are configured for CRUD /api/todos)

frontend (React + Nginx UI)

Image: node:18
This is built from ./frontend
The frontend serves a react app through a NGINX port on 80 that is mapped to port 3000 on the host.


• Container List: 

CONTAINER ID   IMAGE               COMMAND                  CREATED       STATUS       PORTS                                         NAMES
76ddf935d895   todo-app-frontend   "/docker-entrypoint.…"   2 hours ago   Up 2 hours   0.0.0.0:3000->80/tcp, [::]:3000->80/tcp       todo-frontend
63f933d659c4   todo-app-backend    "docker-entrypoint.s…"   2 hours ago   Up 2 hours   0.0.0.0:5000->5000/tcp, [::]:5000->5000/tcp   todo-backend
8ca8454bcead   postgres:15         "docker-entrypoint.s…"   2 hours ago   Up 2 hours   5432/tcp                                      todo-db


todo-db 
This container is for the database and it stores all the records in the PostgreSQL with persistence

todo-backend
This container is for the backend and provides the REST API that manages the todos, frontend, and connections with the database

todo-frontend
This container is for the frontend and serves the user interface for the web application along with a connection with the backend API.

• Instructions:

Step 01: First clone the repository through the link

Step 02: Navigate to the root folder with the web application 

Step 03: Run the command below to provide permissions in order to run the scripts

chmod +x prepare-app.sh start-app.sh stop-app.sh remove-app.sh

Step 04: Prepare the app

./prepare-app.sh

Step 05: Start the app

./start-app.sh

Step 06: Access the web application

The App is available at http://http://localhost:3000

Step 07: Stop the application

./stop-app.sh

Step 08: Remove resources

./remove-app.sh

o How to access the application via a web browser.

The App is available at http://http://localhost:3000

• Example Workflow: 

Enter a task into the text box

Click on the green "Add" button

Watch as the task gets added onto the list

Select the task by clicking on the check box

To delete the task click on delete after the selection.
