import handleResponse from "../../utils/responseHandler";
import CustomError from "../../utils/customError";
import db from "../../db";
const debug = require("debug")("log");

const createEmployee = async (employeeData) => {
  // create new employee using req params
  const sql = `
    INSERT INTO employees (first_name, last_name, phone_no, email, department_id, hire_date, address)
    values($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
  `;

  const values = [
    employeeData.firstName,
    employeeData.lastName,
    employeeData.phoneNo,
    employeeData.email,
    employeeData.departmentId,
    employeeData.hireDate,
    employeeData.address || "",
  ];

  let employee;
  try {
    const rows = await db.query(sql, values);
    employee = rows[0];
  } catch (error) {
    debug("An error occured inserting new employee");
    debug(error.message);
    throw error;
  }

  return employee;
};

const employeesCtrl = {
  createEmployee: async (req, res, next) => {
    try {
      const employee = await createEmployee(req.body);

      return handleResponse(res, 201, {
        status: "success",
        data: employee.employee_id,
      });
    } catch (error) {
      console.log(`error creating employee: ${error.message}`);
      if (error.message.indexOf("bad request") >= 0) {
        return next(new CustomError(409, "Invalid body supplied"));
      }

      return next(error);
    }
  },
};

export default employeesCtrl;
