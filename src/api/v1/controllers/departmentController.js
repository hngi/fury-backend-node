import db from '../../db';
import responseHandler from '../../utils/responseHandler';
import CustomError from '../../utils/customError';

export const createDepartment = async (req, res, next) => {
    try {
        const { userId } = req.user
        const { departmentName, managerId } = req.body
        const body = [departmentName, managerId, userId]
        const sql = `
            INSERT INTO departments (name, manager_id, user_id)
            VALUES ($1, $2, $3)
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

export const updateDepartment = async (req, res, next) => {
    try {
        const { departmentName, managerId } = req.body
        const body = [departmentName, managerId]
        const { departmentId } = req.params

        const department = await db.query(`SELECT * FROM departments WHERE id=${departmentId}`)
        if (!department[0]) {
            const err = new CustomError(400, 'department does not exist')
            return next(err)
        }

        const sql = `
            UPDATE departments SET name=$1, manager_id=$2
             WHERE id=${departmentId}
            RETURNING *
          `;
        let rows = await db.query(sql, body)

        return responseHandler(res, 200, {
            data: rows[0].name
        })
    } catch (error) {
        const err = new CustomError(400, {
            status: 'error',
            data: error.message
        })
        next(err)
    }
}

export const deleteDepartment = async (req, res, next) => {
    try {
        const { departmentId } = req.params

        const department = await db.query(`SELECT * FROM departments WHERE id=${departmentId}`)
        if (!department[0]) {
            const err = new CustomError(400, 'department does not exist')
            return next(err)
        }
        await db.query(`DELETE FROM departments WHERE id=${departmentId}`)
        return responseHandler(res, 204, {
            data: `${department[0].name} deleted successfully`
        })
    } catch (error) {
        console.log(error)
        const err = new CustomError(400, {
            status: 'error',
            data: error.message
        })
        next(err)
    }
}

export const getSingleDepartment = async (req, res, next) => {
    try {
        const { departmentId } = req.params

        const department = await db.query(`SELECT * FROM departments WHERE id=${departmentId}`)
        if (!department[0]) {
            const err = new CustomError(400, 'department does not exist')
            return next(err)
        }

        return responseHandler(res, 200, {
            data: department[0].name
        })
    } catch (error) {
        const err = new CustomError(400, {
            status: 'error',
            data: error.message
        })
        next(err)
    }
}

export const getAllDepartments = async (req, res, next) => {
    try {
        const department = await db.query(`SELECT * FROM departments`)
        if (department.length < 1) {
            const err = new CustomError(400, 'no department found')
            return next(err)
        }
        return responseHandler(res, 200, {
            data: department
        })
    } catch (error) {
        const err = new CustomError(400, {
            status: 'error',
            data: error.message
        })
        next(err)
    }
}