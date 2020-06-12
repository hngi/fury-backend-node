import db from '../../db';
import responseHandler from '../../utils/responseHandler';
import CustomError from '../../utils/customError';

export const createDepartment = async (req, res, next) => {
    try {
        const { departmentName, managerId } = req.body
        const body = [departmentName, managerId]
        const sql = `
            INSERT INTO departments (name, manager_id)
            VALUES ($1, $2)
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