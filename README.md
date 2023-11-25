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
  body :  title, description, dueDate, status  
  - Expected Response : "message : Task successfully created"

- GET http://localhost:4000/api/tasks
  - Expected Response : [ tasks ]  

- GET http://localhost:4000/api/task/:id
  - Expected Response : task  

- POST http://localhost:4000/api/tasks/assign
  - Input Parameters : taskId, userId  
  - Expected Response :  "message: Task successfully assigned to User"


- POST http://localhost:4000/api/tasks/status
  - Input Parameters : taskId,  status  
  - Expected Response : "message: Task status successfully updated"

- GET http://localhost:4000/api/tasks/stats
  - Expected Response : completedTasks, pendingTasks  

- DELETE http://localhost:4000/api/task/:id
  - Expected Response : "message: Task successfully deleted"


