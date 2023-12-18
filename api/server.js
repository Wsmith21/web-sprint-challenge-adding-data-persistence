const express = require('express');
const tasksRouter = require('./task/router'); // Import your tasks router
const resourcesRouter = require('./resource/router'); // Import your resources router
const projectsRouter = require('./project/router')
const server = express();
server.use(express.json());

// Connect your routers
server.use('/api/tasks', tasksRouter);
server.use('/api/resources', resourcesRouter);
server.use('/api/projects', projectsRouter);
module.exports = server;
