const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const morgan = require('morgan');

const app = express();

app.use(morgan);
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type,Accept, Authorization'
	);

	if (req.method === 'OPTIONS') {
		res.header(
			'Access-Control-Allow-Origin',
			'GET',
			'PUT',
			'POST',
			'PATCH',
			'DELETE'
		);
		return res.status(200).json({});
	}
	next();
});

app.use('/api', require('./routes/api'));

app.use((req, res, next) => {
	const error = new Error('Not Found');
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message,
		},
	});
});

app.use('/public', express.static(path.join(__dirname, 'public')));

module.exports = app;
