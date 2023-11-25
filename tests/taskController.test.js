const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const routes = require('../routes');
require("dotenv").config();

const Task = require('../models/taskModel');
const User = require('../models/userModel');

const app = express();
app.use(express.json());
app.use('/api', routes);


beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI_TESTDB)
});

afterAll(async () => {
  await User.deleteMany()
  await Task.deleteMany()
  await mongoose.connection.close();
});

let authToken; 
let taskId;
let userId;

beforeEach(async () => {

  const user = await User.create({
    name: 'testuser',
    email: 'test@email.com',
    password: 'testpassword',
  });

  userId = user._id

  authToken = jwt.sign({}, process.env.JWT_SECRET_KEY, {
    expiresIn: '1h',
  });
  
});

describe('POST /api/task', () => {
  it('should create a new task', async () => {
    const taskData = {
      title: 'Test Task',
      description: 'This is a test task',
      dueDate: new Date(),
      status: 'pending',
    };

    const response = await request(app)
      .post('/api/task')
      .set('Authorization', `Bearer ${authToken}`)
      .send(taskData)
      .expect(200);

    expect(response.body.message).toBe('Task successfully created');

    const createdTask = await Task.findOne({ title: 'Test Task' });
    taskId = createdTask._id.toString(); 

    expect(createdTask).not.toBeNull();
    expect(createdTask.title).toBe('Test Task');
    expect(createdTask.status).toBe('pending');
  });
});

describe('POST /api/task/assign', () => {
  it('should assign user to task', async () => {
    const objId = new mongoose.Types.ObjectId(userId)
    const data = {
      taskId,
      userId: objId,
    };

    const response = await request(app)
      .post('/api/task/assign')
      .set('Authorization', `Bearer ${authToken}`)
      .send(data)
      .expect(200);

    expect(response.body.message).toBe('Task successfully assigned to User');

    const updatedTask = await Task.findOne({ _id: taskId });
    expect(updatedTask).not.toBeNull();
    expect(updatedTask.assignedUser).toStrictEqual(objId);
  });
});
