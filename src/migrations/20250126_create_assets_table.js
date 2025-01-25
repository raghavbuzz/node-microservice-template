exports.up = async function (knex) {
    await knex.schema.createTable('assets', (table) => {
        table.increments('id').primary();
        table.string('name', 255).notNullable();
        table.string('category', 100).notNullable();
        table.decimal('price', 10, 2).notNullable();
        table.date('purchase_date').notNullable();
        table.string('status', 50).defaultTo('Active');
        table.text('description').nullable();
        table.timestamps(true, true); // created_at, updated_at
    });
};

exports.down = async function (knex) {
    await knex.schema.dropTableIfExists('assets');
};
