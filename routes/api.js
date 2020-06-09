const express = require('express');
const bcrypt = require('bcryptjs');

const router = express.Router();

router.get('/employees', (req, res, next) => {
	res.status(200).json({
		message: 'Getting all employees',
	});
});

router.post('/employess', (req, res, next) => {
	res.status(201).json({
		message: 'Employee created successfully',
	});
});

router.get('/employee/:id', (req, res, next) => {
	const id = req.params.id;
	res.status(200).json({
		message: `Getting employee with ID: ${id}`,
	});
});

router.patch('/employee/:id', (req, res, next) => {
	let updateOps = {};
	const id = req.params.id;

	res.status(201).json({
		message: 'Records updated succeessfully',
	});
});

router.delete('/employee/id', (req, res, next) => {
	const id = req.params.id;
	res.status(200).json({
		message: 'Employee deleted',
	});
});

router.get('/departments', (req, res, next) => {
	res.status(200).json({
		message: 'Getting all departments',
	});
});
router.get('/department/:dept', (req, res, next) => {
	const department = req.params.dept;
	res.status(200).json({
		message: `Getting all members of department ${department}`,
	});
});

router.get('/position', (req, res, next) => {
	res.status(200).json({
		message: 'Getting all heads of departments and management staff',
	});
});

module.exports = router;
