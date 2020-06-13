import db from "../../db";
import responseHandler from "../../utils/responseHandler";
import CustomError from "../../utils/customError";

export const createEmployee = async (req, res, next) => {
  try {
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
      Date.now(),
    ];
    const sql = `
            INSERT INTO employees (first_name, last_name,phone_no, email, department_id,hire_date,address,user_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *
          `;
    let rows = await db.query(sql, body);

    return responseHandler(res, 201, rows[0].id);
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
    return responseHandler(
      res,
      204,
      `${employee[0].first_name} ${employee[0].last_name} deleted successfully`
    );
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

    return responseHandler(res, 200, employee[0].name);
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
    return responseHandler(res, 200, employees);
  } catch (error) {
    const err = new CustomError(400, {
      status: "error",
      data: error.message,
    });
    next(err);
  }
};
export const updateEmployee = async (req, res, next) => {
  try {
    const employeeId = req.params.employeeId;
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
    ];

    const employee = await db.query(
      `SELECT * FROM employees WHERE id=${employeeId}`
    );
    if (!employee[0]) {
      const err = new CustomError(404, "employee does not exist");
      return next(err);
    }

    const sql = `UPDATE employees SET firstName=$1, lastName=$2, phoneNo=$3 email=$4, departmentId=$5, hiredDate=$6, address=$7 WHERE id=${employeeId} RETURNING *`;
    let rows = await db.query(sql, body);

    return responseHandler(res, 200, {
      data: `${rows[0].firstName} ${rows[0].lastName} updated successfully`,
    });
  } catch (error) {
    const err = new CustomError(400, {
      status: "error",
      data: error.message,
    });
    next(err);
  }
};
