const db = require('../config/db');

class GenericModel {
    constructor(tableName) {
        this.tableName = tableName;
    }

    async getAll() {
        return db.any(`SELECT * FROM ${this.tableName}`);
    }

    async getById(id) {
        return db.oneOrNone(`SELECT * FROM ${this.tableName} WHERE id = $1`, [id]);
    }

    async create(data) {
        const keys = Object.keys(data).join(', ');
        const values = Object.values(data);
        const placeholders = values.map((_, idx) => `$${idx + 1}`).join(', ');
        return db.one(
            `INSERT INTO ${this.tableName} (${keys}) VALUES (${placeholders}) RETURNING *`,
            values
        );
    }

    async update(id, data) {
        const updates = Object.keys(data)
            .map((key, idx) => `${key} = $${idx + 1}`)
            .join(', ');
        const values = [...Object.values(data), id];
        return db.one(
            `UPDATE ${this.tableName} SET ${updates} WHERE id = $${values.length} RETURNING *`,
            values
        );
    }

    async delete(id) {
        return db.result(`DELETE FROM ${this.tableName} WHERE id = $1`, [id]);
    }
}

module.exports = GenericModel;
