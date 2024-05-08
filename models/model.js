import Knex from 'knex';
import { database } from 'src/database';

class Model {
	static get table() {
		if (!this.tableName) {
			throw new Error('You must set a table name!');
		}
		return database(this.tableName);
	}

	static async all() {
		return this.table;
	}

	static async insert(data) {
		const [result] = await this.table.insert(data).returning('*');
		return result;
	}

	static async update(id, data) {
		const [result] = await this.table
			.where({ id })
			.update(data)
			.returning('*');
		return result;
	}

	static async delete(id) {
		return this.table.where({ id }).del();
	}

	static async findById(id) {
		return this.table.where('id', id).first();
	}

	static async findBy(data) {
		return this.table.where(data).first();
	}
}

module.exports.Model = Model;
