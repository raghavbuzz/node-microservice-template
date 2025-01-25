exports.seed = async function (knex) {
    const seedName = '20250127_seed_assets_table'; // Unique name for this seed script

    // Check if the seed script has already been executed
    const existingLog = await knex('seed_log').where({ seed_name: seedName }).first();
    if (existingLog) {
        console.log(`Seed "${seedName}" has already been executed. Skipping...`);
        return;
    }

    // Define the seed data
    const seedData = [
        {
            name: 'Office Chair',
            category: 'Furniture',
            price: 75.99,
            purchase_date: '2023-01-15',
            status: 'Active',
            description: 'Ergonomic office chair with lumbar support',
        },
        {
            name: 'Laptop',
            category: 'Electronics',
            price: 1200.0,
            purchase_date: '2022-12-10',
            status: 'Active',
            description: '15-inch laptop with Intel Core i7 processor',
        },
        {
            name: 'Projector',
            category: 'Electronics',
            price: 450.5,
            purchase_date: '2023-02-01',
            status: 'Active',
            description: 'HD projector for conference room',
        },
        {
            name: 'Standing Desk',
            category: 'Furniture',
            price: 300.0,
            purchase_date: '2023-03-20',
            status: 'Active',
            description: 'Adjustable height standing desk',
        },
        {
            name: 'Conference Table',
            category: 'Furniture',
            price: 850.0,
            purchase_date: '2023-04-05',
            status: 'Active',
            description: 'Large conference table for meetings',
        },
        {
            name: 'Printer',
            category: 'Electronics',
            price: 150.75,
            purchase_date: '2023-05-10',
            status: 'Active',
            description: 'Multi-function laser printer',
        },
        {
            name: 'Smartphone',
            category: 'Electronics',
            price: 999.99,
            purchase_date: '2023-06-15',
            status: 'Active',
            description: 'Flagship smartphone with high-end camera',
        },
        {
            name: 'Office Sofa',
            category: 'Furniture',
            price: 550.0,
            purchase_date: '2023-07-10',
            status: 'Active',
            description: 'Comfortable 3-seater office sofa',
        },
        {
            name: 'Desk Lamp',
            category: 'Furniture',
            price: 25.5,
            purchase_date: '2023-08-05',
            status: 'Active',
            description: 'LED desk lamp with adjustable brightness',
        },
        {
            name: 'Whiteboard',
            category: 'Furniture',
            price: 120.0,
            purchase_date: '2023-09-15',
            status: 'Active',
            description: 'Magnetic whiteboard with aluminum frame',
        },
    ];

    // Insert seed data into the assets table
    await knex('assets').insert(seedData);
    console.log('Assets seed data inserted successfully.');

    // Log this seed execution into the seed_log table
    await knex('seed_log').insert({ seed_name: seedName });
    console.log(`Seed "${seedName}" logged in seed_log table.`);
};
