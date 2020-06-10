import express from 'express';

import validationMiddleware from '../../src/api/v1/middleware/validationMiddleware';
import { createEmployeeSchema } from '../../src/api/utils/validationRules';
import errorHandler from '../../src/api/utils/errorhandler';

const request = require('supertest');

describe('validation middleware', () => {
    it('should return error when a required field is empty or invalid format', async () => {
        const testApp = express();
        testApp.use(express.json());

        testApp.post('/employee', validationMiddleware(createEmployeeSchema), (req, res) => {
            return res.status(200).send({ success: true })
        })
        testApp.use((error, req, res, next) => {
            errorHandler(error, req, res, next);
        });

        const res = await request(testApp)
            .post('/employee')
            .send({
                firstName: '',
                lastName: 'Doe',
                email: 'test@test.com',
                hireDate: Date(),
                userId: 234,
                departmentId: 123,
                phoneNo: '070-682-4176',
                address: 'aso rock, Abuja'
            })
        expect(res.status).toBe(401);
        expect(res.body.status).toBe('error');
        expect(res.body.error).toBe('"firstName" is not allowed to be empty');
    })

    it('should not throw error when all fields are valid', async () => {
        const testApp = express();
        testApp.use(express.json());

        testApp.post('/employee', validationMiddleware(employeeSchema), (req, res) => {
            return res.status(200).send({ success: true })
        })
        testApp.use((error, req, res, next) => {
            errorHandler(error, req, res, next);
        });

        const res = await request(testApp)
            .post('/employee')
            .send({
                firstName: 'john',
                lastName: 'Doe',
                email: 'test@test.com',
                hireDate: Date(),
                userId: 234,
                departmentId: 123,
                phoneNo: '070-682-4176',
                address: 'aso rock, Abuja'
            })
        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
    })
})
