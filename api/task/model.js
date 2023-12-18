const db = require('data/dbConfig.js');

async function getAllTasks() {
  try {
    const tasks = await db('tasks as t')
      .leftJoin('projects as p', 't.project_id', 'p.project_id')
      .select(
        't.task_id',
        't.task_description',
        't.task_notes',
        db.raw('CAST(t.task_completed AS BOOLEAN) AS task_completed'), // Convert task_completed to boolean
        'p.project_name',
        'p.project_description'
      );

    // Modify task_completed to a boolean in the tasks array
    const tasksWithBooleanCompleted = tasks.map(task => ({
      ...task,
      task_completed: Boolean(task.task_completed),
    }));

    return tasksWithBooleanCompleted;
  } catch (error) {
    console.error('Error retrieving tasks:', error);
    throw new Error('Error retrieving tasks');
  }
}



async function getTaskById(id) {
  return db('tasks as t')
    .where('t.id', id)
    .leftJoin('projects as p', 't.project_id', 'p.project_id')
    .select(
      'project_description',
      'project_name',
    )
    .first();
}


function createTask(taskData) {
  return db('tasks')
    .insert(taskData)
    .returning('*');
}

function updateTask(id, changes) {
  return db('tasks')
    .where({ id })
    .update(changes)
    .returning('*');
}

function deleteTask(id) {
  return db('tasks')
    .where({ id })
    .del();
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
