import Joi from "joi";

export const createEmployeeSchema = {
  body: Joi.object().keys({
    firstName: Joi.string().min(2).max(100).required(),
    lastName: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    hireDate: Joi.date().required(),
    userId: Joi.number().required(),
    departmentId: Joi.number().required(),
    phoneNo: Joi.string()
      .regex(/^\d{3}-\d{3}-\d{4}$/)
      .required(),
    address: Joi.string().min(5).required(),
  }),
};

export const updateEmployeeSchema = {
  body: Joi.object().keys({
    firstName: Joi.string().min(2).max(100),
    lastName: Joi.string().min(2).max(100),
    email: Joi.string().email(),
    hireDate: Joi.date(),
    departmentId: Joi.number(),
    phoneNo: Joi.string().regex(/^\d{3}-\d{3}-\d{4}$/),
    address: Joi.string().min(5),
  }),
  params: Joi.object().keys({
    employeeId: Joi.number().required(),
  }),
};

export const createDepartmentSchema = {
  body: Joi.object().keys({
    departmentName: Joi.string().min(2).max(100).required(),
    managerId: Joi.number().required(),
  }),
};

export const updateDepartmentSchema = {
  body: Joi.object().keys({
    departmentName: Joi.string().min(2).max(100).required(),
    managerId: Joi.number().required(),
  }),
  params: Joi.object().keys({
    departmentId: Joi.number().required(),
  }),
};

export const deleteEmployeeSchema = {
  params: Joi.object().keys({
    employeeId: Joi.number().required(),
  }),
};
