const express = require('express');
const Projects = require('api/project/model.js');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const projects = await Projects.getAllProjects();

    if (!Array.isArray(projects) || projects.length === 0) {
      return res.status(404).json({ error: 'No projects found' });
    }

    const formattedProjects = projects.map(project => ({
      ...project,
      project_completed: Boolean(project.project_completed),
    }));

    res.status(200).json(formattedProjects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Error fetching projects' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Projects.getProjectById(id);

    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  const { project_name, project_description, project_completed } = req.body;

  try {
    const newProject = await Projects.addProject({
      project_name,
      project_description,
      project_completed
    });

    const responseProject = {
      project_name: newProject.project_name,
      project_description: newProject.project_description || null,
      project_completed: !!newProject.project_completed,
    };

    res.status(201).json(responseProject);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Error creating project' });
  }
});

module.exports = router;
