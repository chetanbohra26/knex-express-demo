require('dotenv').config();
const express = require('express');

const knex = require('./knex/knex');

const app = express();
const PORT = process.env.PORT || 7500;

app.use(express.json());

app.get('/', (req, res) => {
	res.json({ success: true, message: 'Welcome to express' });
});

app.get('/users', async (req, res) => {
	const data = await knex.from('users');
	res.json({ success: true, message: 'Data fetched successfully', data });
});

app.post('/users', async (req, res) => {
	const record = req.body;

	const data = await knex('users').insert(record).returning('*');

	res.json({
		success: true,
		message: 'Data added successfully',
		data,
	});
});

app.listen(PORT, (err) => {
	if (err) throw err;
	console.log(`Listening on port ${PORT}..!`);
});
