exports.seed = async function (knex) {
    const seedName = '20250126_seed_assets_table'; // Unique name for this seed script

    // Check if the seed script has already been executed
    const existingLog = await knex('seed_log').where({ seed_name: seedName }).first();
    if (existingLog) {
        console.log(`Seed "${seedName}" has already been executed. Skipping...`);
        return;
    }

    // Define the seed data
    const seedData = [
        { name: 'Laptop', category: 'Electronics', price: 1000.00, purchase_date: '2023-01-01', status: 'Active', description: 'Work laptop' },
        { name: 'Chair', category: 'Furniture', price: 150.00, purchase_date: '2023-01-15', status: 'Active', description: 'Office chair' },
    ];

    // Insert seed data into the assets table
    await knex('assets').insert(seedData);
    console.log('Assets seed data inserted successfully.');

    // Log this seed execution into the seed_log table
    await knex('seed_log').insert({ seed_name: seedName });
    console.log(`Seed "${seedName}" logged in seed_log table.`);
};
