const db = require('../config/db');

class GenericModel {
    constructor(tableName) {
        this.tableName = tableName;
    }

    // Basic CRUD Operations    
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

    // Advanced Query Methods
    async findByConditions(conditions) {
        const keys = Object.keys(conditions);
        const values = Object.values(conditions);
        const whereClause = keys.map((key, i) => `${key} = $${i + 1}`).join(' AND ');
        const query = `SELECT * FROM ${this.tableName} WHERE ${whereClause};`;
        const result = await db.query(query, values);
        return result.rows;
    }

    async findWithPagination(page, limit) {
        const offset = (page - 1) * limit;
        const query = `SELECT * FROM ${this.tableName} LIMIT $1 OFFSET $2;`;
        const result = await db.query(query, [limit, offset]);
        return result.rows;
    }

    async count() {
        const query = `SELECT COUNT(*) FROM ${this.tableName};`;
        const result = await db.query(query);
        return parseInt(result.rows[0].count, 10);
    }

    async batchInsert(dataArray) {
        const keys = Object.keys(dataArray[0]).join(', ');
        const values = dataArray
            .map((data, index) =>
                `(${Object.values(data).map((_, i) => `$${index * dataArray[0].length + i + 1}`).join(', ')})`
            )
            .join(', ');
        const query = `INSERT INTO ${this.tableName} (${keys}) VALUES ${values} RETURNING *;`;
        const flatValues = dataArray.flatMap(Object.values);
        const result = await db.query(query, flatValues);
        return result.rows
    }

    // Utility Methods
    async runInTransaction(callback) {
        const client = await db.connect();
        try {
            await client.query('BEGIN');
            const result = await callback(client);
            await client.query('COMMIT');
            return result;
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    async findWithSorting(orderBy, order = 'ASC') {
        const query = `SELECT * FROM ${this.tableName} ORDER BY ${orderBy} ${order};`;
        const result = await db.query(query);
        return result.rows;
    }

    async upsert(data, conflictKey) {
        const keys = Object.keys(data).join(', ');
        const values = Object.values(data);
        const placeholders = values.map((_, i) => `$${i + 1}`).join(', ');
        const updateClause = Object.keys(data)
            .map((key, i) => `${key} = EXCLUDED.${key}`)
            .join(', ');
        const query = `
            INSERT INTO ${this.tableName} (${keys}) 
            VALUES (${placeholders})
            ON CONFLICT (${conflictKey}) DO UPDATE SET ${updateClause}
            RETURNING *;
        `;
        const result = await db.query(query, values);
        return result.rows[0];
    }

    // Metadata and Schema Handling
    async getTableColumns() {
        const query = `
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = $1;
        `;
        const result = await db.query(query, [this.tableName]);
        return result.rows;
    }

    async tableExists() {
        const query = `
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_name = $1
            );
        `;
        const result = await db.query(query, [this.tableName]);
        return result.rows[0].exists;
    }
}

module.exports = GenericModel;
