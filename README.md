# Assignment

## Steps to run project locally
- Must have node installed in the system
- Clone the repo
- cd project
- npm install
- npm run

## Steps to run tests
- cd project
- npm test

## API endpoints
- POST http://localhost:4000/api/users
  - Input Parameters : name, email, password
  - Expected Response : "message: user successfully created"

- POST http://localhost:4000/api/users/login
  - Input Parameters : email, password 
  - Expected Response : message, token

- POST http://localhost:4000/api/task
  - Input Parameters  
  header : Authorization  
  body : { title, description ,dueDate ,status}  
  - Expected Response : "message : Task successfully created"

- GET http://localhost:4000/api/tasks
 - Expected Response : [ tasks ]

GET http://localhost:4000/api/task/:id
single task

POST http://localhost:4000/api/tasks/assign
{
      "taskId": "65622543fb780de58bb1bf87",
      "userId": "65622311c02afe7813a88745"
}
{
    "message": "Task successfully assigned to User"
}


POST http://localhost:4000/api/tasks/status

{
      "taskId": "65622543fb780de58bb1bf87",
      "status": "completed"
}

{
    "message": "Task status successfully updated"
}


GET http://localhost:4000/api/tasks/stats
{
    "completedTasks": 1,
    "pendingTasks": 0
}

DELETE http://localhost:4000/api/task/:id

{
    "message": "Task successfully deleted"
}








