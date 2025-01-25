exports.up = async function (knex) {
    await knex.schema.createTable('seed_log', (table) => {
        table.increments('id').primary(); // Primary key
        table.string('seed_name').notNullable().unique(); // Name of the seed script
        table.timestamp('executed_at').defaultTo(knex.fn.now()); // Execution timestamp
    });
};

exports.down = async function (knex) {
    await knex.schema.dropTableIfExists('seed_log');
};
