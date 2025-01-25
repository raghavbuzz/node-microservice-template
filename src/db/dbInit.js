const knex = require('knex');
const knexfile = require('./knexfile');

const environment = process.env.NODE_ENV || 'development';
const db = knex(knexfile[environment]);

async function initializeDatabase() {
    try {
        console.log('Running migrations...');
        await db.migrate.latest(); // Runs all pending migrations.

        console.log('Running seeders...');
        await db.seed.run(); // Executes all seeders.

        console.log('Database initialized successfully.');
    } catch (err) {
        console.error('Error initializing database:', err);
        process.exit(1); // Exit the process if initialization fails.
    } finally {
        await db.destroy(); // Close the database connection.
    }
}

module.exports = initializeDatabase;
