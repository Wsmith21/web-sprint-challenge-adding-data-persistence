const express = require('express');
const tasksRouter = require('api/task/router.js'); // Import your tasks router
const resourcesRouter = require('api/resource/router.js'); // Import your resources router
const projectsRouter = require('api/project/router.js')
const server = express();
server.use(express.json());

// Connect your routers
server.use('/api/tasks', tasksRouter);
server.use('/api/resources', resourcesRouter);
server.use('/api/projects', projectsRouter);
module.exports = server;
