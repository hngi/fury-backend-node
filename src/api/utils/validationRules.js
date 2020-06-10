import Joi from 'joi';

export const createEmployeeSchema = Joi.object().keys({
    firstName: Joi.string().min(2).max(100).required(),
    lastName: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    hireDate: Joi.date().required(),
    userId: Joi.number().required(),
    departmentId: Joi.number().required(),
    phoneNo: Joi.string().regex(/^\d{3}-\d{3}-\d{4}$/).required(),
    address: Joi.string().min(5).required()
})