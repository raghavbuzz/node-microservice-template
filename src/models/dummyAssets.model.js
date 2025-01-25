const GenericModel = require('./genericModel');
const db = require('../config/db');

class DummyAssetsModel extends GenericModel {
    constructor() {
        super('assets'); // 'assets' is the table name
    }

    // Example: Custom Query (Non-Generic)
    // Get assets by category
    async getAssetsByCategory(category) {
        return db.any(`SELECT * FROM ${this.tableName} WHERE category = $1`, [category]);
    }
}

module.exports = new DummyAssetsModel();