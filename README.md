Task Management Server

Introduction

This is a simple Node.js CRUD (Create, Read, Update, Delete) application for managing tasks. The project allows you to add, view, update, and delete tasks through a server hosted on localhost. It uses JSON files to persist tasks.

Prerequisites

- Node.js (version 12 or higher)
- NPM (Node Package Manager)
- A terminal (Command Prompt, PowerShell, or Git Bash)


Steps to Host the Server Locally

1.Clone the Repository First, clone the repository to your local machine:
  git clone https://github.com/your-repository-link.git
  
2.Navigate to the Project Directory After cloning, navigate to the project folder:
  cd your-repository-name/servidor-tareas

3.Install Dependencies Install all the necessary dependencies by running the following command in the terminal:
  npm install

4.Start the Server To start the server, you need to run the init.bat file, which is located inside the servidor-tareas folder.
In Command Prompt or PowerShell, run:
  .\init.bat
This will start the server on http://localhost:3000/api/tareas.

5.Access the Application Open your browser and go to:
  http://localhost:3000/api/tareas

Endpoints
GET /api/tareas
- Retrieve all tasks
  
POST /api/tareas 
- Add a new task
  
GET /api/tareas/
- Retrieve a specific task
  
PUT /api/tareas/
- Update a specific task
  
DELETE /api/tareas/
- Delete a specific task

Notes:

The tasks are saved to a tasks.json file located in the same directory, and they are automatically loaded when the server starts.
If you encounter any issues, ensure that all dependencies are installed and that Node.js is running properly.
