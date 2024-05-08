/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
	const migration = await knex.schema.createTable('users', function (table) {
		table.bigIncrements('id').primary();
		table.string('email').notNullable().unique().index();
		table.string('password').notNullable();
		table.string('first_name').notNullable();
		table.string('last_name').notNullable();
		table.timestamps(true, true);
	});

	return migration;
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
	const migration = await knex.schema.dropTable('users');

	return migration;
};
