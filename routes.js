const {
  createTask,
  getTask,
  getAllTask,
  assignTask,
  updateTaskStatus,
  deleteTask,
  getTaskStats
  } = require('./controllers/taskController')
const {
  createUser,
  userLogin
  } = require('./controllers/userController')
const express = require('express');
const router = express.Router();
const requireAuth = require('./middlewares/auth');

router.post('/users', createUser)
router.post('/users/login', userLogin)
router.get('/tasks', getAllTask)
router.get('/task/:id', getTask)
router.get('/tasks/stats', getTaskStats)

router.use(requireAuth)

router.post('/task', createTask)
router.post('/tasks/assign', assignTask)
router.post('/tasks/status', updateTaskStatus)
router.delete('/tasks/:id', deleteTask)

module.exports = router;