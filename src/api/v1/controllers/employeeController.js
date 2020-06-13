import db from '../../db';
import responseHandler from '../../utils/responseHandler';
import CustomError from '../../utils/customError';

export const createEmployee = async (req, res, next) => {
    try {
        const { userId } = req.user
        const { firstName, lastName, phoneNo
            , email, departmentId,
            hireDate, address } = req.body
        const body = [firstName, lastName, phoneNo, email, departmentId, hireDate, address, userId]
        const sql = `
            INSERT INTO employees (first_name, last_name,phone_no, email, department_id,hire_date,address,user_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *
          `;
        let rows = await db.query(sql, body)

        return responseHandler(res, 201, {
            data: rows[0].id
        })

    } catch (error) {
        const err = new CustomError(400, {
            status: 'error',
            data: error.message
        })
        next(err)
    }
}