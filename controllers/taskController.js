const { default: mongoose } = require('mongoose');
const Task = require('../models/taskModel')

const createTask = async (req,res) => {
  try {
    const data = req.body
    await Task.create(data)
    res.status(200).json({ message: "Task successfully created" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
};

const getTask = async (req,res) => {
  try {
    const { id } = req.params
    const objId = new mongoose.Types.ObjectId(id)
    const task = await Task.findOne({ _id: objId });
    res.status(200).json(task)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
};

const getAllTask = async (req,res) => {
  try {
    const tasks = await Task.find()
    res.status(200).json(tasks)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
};

const assignTask = async (req,res) => {
  try {
    const { taskId, userId } = req.body
    const objId = new mongoose.Types.ObjectId(taskId)
    const task = await Task.findOne({ _id: objId });
    task.assignedUser = userId;
    await task.save()
    res.status(200).json({ message: "Task successfully assigned to User" })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message })
  }
};

const updateTaskStatus = async (req,res) => {
  try {
    const { taskId, status } = req.body
    const objId = new mongoose.Types.ObjectId(taskId)
    const task = await Task.findOne({ _id: objId });
    task.status = status;
    await task.save()
    res.status(200).json({ message: "Task status successfully updated" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
};

const deleteTask = async (req,res) => {
  try {
    const { id } = req.params
    const objId = new mongoose.Types.ObjectId(id)
    const task = await Task.findOne({ _id: objId });
    await task.deleteOne()
    res.status(200).json({ message: "Task successfully deleted" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
};

const getTaskStats = async (req,res) => {
  try {
    const date = new Date();
    date.setDate(date.getDate() - 7);

    const completedTasks = await Task.countDocuments({
      status: 'completed',
      dueDate: { $gte: date },
    });

    const pendingTasks = await Task.countDocuments({ status: 'pending' });
    res.status(200).json({ completedTasks, pendingTasks  })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
};


module.exports = {
  createTask,
  getTask,
  getAllTask,
  assignTask,
  updateTaskStatus,
  deleteTask,
  getTaskStats
}

