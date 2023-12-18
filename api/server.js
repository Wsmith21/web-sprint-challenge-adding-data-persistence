const express = require('express');
const tasksRouter = require('/Users/walynsmith/web-sprint-challenge-adding-data-persistence/api/task/router.js'); // Import your tasks router
const resourcesRouter = require('/Users/walynsmith/web-sprint-challenge-adding-data-persistence/api/resource/router.js'); // Import your resources router
const projectsRouter = require('/Users/walynsmith/web-sprint-challenge-adding-data-persistence/api/project/router.js')
const server = express();
server.use(express.json());

// Connect your routers
server.use('/api/tasks', tasksRouter);
server.use('/api/resources', resourcesRouter);
server.use('/api/projects', projectsRouter);
module.exports = server;
