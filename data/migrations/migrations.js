exports.up = function(knex) {
    return knex.schema.createTable('projects', table => {
      table.increments('project_id'); // Primary key
      table.string('project_name').notNullable(); // Required string
      table.string('project_description'); // Optional string
      table.integer('project_completed').defaultTo(0); // Defaults to 0 (false)
  
      // Add any other columns or constraints if needed
    })
    .createTable('resources', table => {
      table.increments('resource_id'); // Primary key
      table.string('resource_name').notNullable().unique(); // Required and unique string
      table.string('resource_description'); // Optional string
  
      // Add any other columns or constraints if needed
    })
    .createTable('tasks', table => {
      table.increments('task_id'); // Primary key
      table.string('task_description').notNullable(); // Required string
      table.text('task_notes'); // Optional text
      table.integer('task_completed').defaultTo(0); // Defaults to 0 (false)
      table
        .integer('project_id')
        .unsigned()
        .notNullable()
        .references('project_id')
        .inTable('projects')
        .onDelete('CASCADE')
        .onUpdate('CASCADE'); // Foreign key referencing the projects table
  
      // Add any other columns or constraints if needed
    })
    .createTable('project_resources', table => {
      table.increments('project_resource_id'); // Primary key
      table
        .integer('project_id')
        .unsigned()
        .notNullable()
        .references('project_id')
        .inTable('projects')
        .onDelete('CASCADE')
        .onUpdate('CASCADE'); // Foreign key referencing the projects table
      table
        .integer('resource_id')
        .unsigned()
        .notNullable()
        .references('resource_id')
        .inTable('resources')
        .onDelete('CASCADE')
        .onUpdate('CASCADE'); // Foreign key referencing the resources table
  
      // Add any other columns or constraints if needed
    });
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists('project_resources')
      .dropTableIfExists('tasks')
      .dropTableIfExists('resources')
      .dropTableIfExists('projects');
  };
  