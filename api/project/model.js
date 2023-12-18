// Example: api/project/model.js
const db = require('../../data/dbConfig');

async function getAllProjects() {
  try {
    const projects = await db('projects');
    console.log(projects); // Log the fetched projects
    return projects; // Return the projects fetched from the database
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw new Error('Error fetching projects');
  }
}

async function getProjectById(id) {
  try {
    const project = await db('projects').where({ project_id: id }).first();
    return project;
  } catch (error) {
    console.error('Error fetching project by ID:', error);
    throw new Error('Error fetching project by ID');
  }
}
// Assume this is your addProject function
async function addProject({ project_name, project_description, project_completed }) {
  try {
    const [newProjectId] = await db('projects').insert({
      project_name,
      project_description,
      project_completed, // Include project_completed in the insert operation
    });

    const newProject = await db('projects').where('project_id', newProjectId).first();
    return newProject;
  } catch (error) {
    console.error('Error adding project:', error);
    throw new Error('Error adding project');
  }
}






// Add other necessary functions for CRUD operations

module.exports = {
  getAllProjects,
  getProjectById,
  addProject
  // Other exported functions
};
