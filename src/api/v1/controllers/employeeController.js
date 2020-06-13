import db from "../../db";
import responseHandler from "../../utils/responseHandler";
import CustomError from "../../utils/customError";

export const createEmployee = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const {
      firstName,
      lastName,
      phoneNo,
      email,
      departmentId,
      hireDate,
      address,
    } = req.body;
    const body = [
      firstName,
      lastName,
      phoneNo,
      email,
      departmentId,
      hireDate,
      address,
      userId,
    ];
    const sql = `
            INSERT INTO employees (first_name, last_name,phone_no, email, department_id,hire_date,address,user_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *
          `;
    let rows = await db.query(sql, body);

    return responseHandler(res, 201, {
      data: rows[0].id,
    });
  } catch (error) {
    const err = new CustomError(400, {
      status: "error",
      data: error.message,
    });
    next(err);
  }
};

export const deleteEmployee = async (req, res, next) => {
  try {
    const { employeeId } = req.params;

    const employee = await db.query(
      `SELECT * FROM employees WHERE id=${employeeId}`
    );
    if (!employee[0]) {
      const err = new CustomError(400, "employee does not exist");
      return next(err);
    }
    await db.query(`DELETE FROM employee WHERE id=${employeeId}`);
    return responseHandler(res, 204, {
      data: `${employee[0].first_name} ${employee[0].last_name} deleted successfully`,
    });
  } catch (error) {
    console.log(error);
    const err = new CustomError(400, {
      status: "error",
      data: error.message,
    });
    next(err);
  }
};

export const getSingleEmployee = async (req, res, next) => {
  try {
    const { employeeId } = req.params;

    const employee = await db.query(
      `SELECT * FROM employees WHERE id=${employeeId}`
    );
    if (!employee[0]) {
      const err = new CustomError(400, "employee does not exist");
      return next(err);
    }

    return responseHandler(res, 200, {
      data: employee[0].name,
    });
  } catch (error) {
    const err = new CustomError(400, {
      status: "error",
      data: error.message,
    });
    next(err);
  }
};

export const getAllEmployees = async (req, res, next) => {
  try {
    const employees = await db.query(`SELECT * FROM employees`);
    if (employees.length < 1) {
      const err = new CustomError(400, "no employees found");
      return next(err);
    }
    return responseHandler(res, 200, {
      data: employees,
    });
  } catch (error) {
    const err = new CustomError(400, {
      status: "error",
      data: error.message,
    });
    next(err);
  }
};
