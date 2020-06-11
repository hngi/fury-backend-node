const express = require("express");
const router = express.Router();
const createDB = require("./../../db/create-db");

router.post("/", async (req, res) => {
  var {
    firstName,
    lastName,
    phoneNo,
    email,
    departmentId,
    hireDate,
    address,
  } = req.body;

  if (address == null) address = "";
  try {
    const query =
      "INSERT INTO eployees(first_name, last_name, phone_no, email, department_id, hire_date, address) values($1, $2, $3, $4, $5, $6, $7)";
    const vars = [
      firstName,
      lastName,
      phoneNo,
      email,
      departmentId,
      hireDate,
      address,
    ];

    //Inserting new data into database
    await createDB.query(query, vars, (error, results) => {
      if (error) {
        throw error;
      }
      response
        .status(200)
        .json({ message: `User added with ID: ${results.insertId}` });
    });
  } catch (e) {
    res
      .status(400)
      .json({ status: "Error", data: "Invalid arguments for fields" });
  }
});

module.exports = router;
