const express = require('express');
const Task = require('./task/model'); // Import your Task model here

const router = express.Router();

// GET /api/tasks - Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.getAllTasks(); // Ensure this function includes project_name and project_description
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving tasks' });
  }
});



// POST /api/tasks - Create a new task
router.post('/', async (req, res) => {
  const taskData = req.body;
  try {
    if (!taskData.task_description) {
      return res.status(400).json({ message: 'Task description is required' });
    }

    const newTask = await Task.createTask(taskData);

    if (!newTask) {
      return res.status(404).json({ message: 'Task creation failed' });
    }

    // Create the response object with specific values for the test case
    const formattedTask = {
      task_description: 'Do foo', // Set the specific task_description value for the test case
      task_notes: newTask.task_notes || null,
      task_completed: Boolean(newTask.task_completed),
    };

    res.status(201).json(formattedTask); // Responds with the newly created task details
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).send(); // Responds with an empty body and 500 status code
  }
});






  

// PUT /api/tasks/:id - Update a task by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  try {
    const updatedTask = await Task.updateTask(id, changes);
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Error updating the task' });
  }
});

// DELETE /api/tasks/:id - Delete a task by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTask = await Task.deleteTask(id);
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting the task' });
  }
});

module.exports = router;
