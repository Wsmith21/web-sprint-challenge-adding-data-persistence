const db = require('../../data/dbConfig');

function getAllResources() {
  return db('resources');
}

function getResourceById(id) {
  return db('resources').where({ id }).first();
}

async function createResource(resourceData) {
  try {
    const [newResource] = await db('resources').insert(resourceData).returning('*');
    return newResource;
  } catch (error) {
    console.error('Error creating resource:', error);
    throw new Error('Error creating resource: Internal server error');
  }
}


function updateResource(id, resourceData) {
  return db('resources').where({ id }).update(resourceData).returning('*');
}

function deleteResource(id) {
  return db('resources').where({ id }).del();
}

module.exports = {
  getAllResources,
  getResourceById,
  createResource,
  updateResource,
  deleteResource,
};
