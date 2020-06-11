const express = require("express");
const router = express.Router();
const createDB = require("./../../db/create-db");

router.post("/", async (req, res) => {
  var { departmentName, managerId } = req.body;

  if (managerId == null) managerId = "";
  try {
    const query = "INSERT INTO departments(name, manager_id) values($1, $2)";
    const vars = [departmentName, managerId];

    //Inserting new data into database
    await createDB.query(query, vars, (error, results) => {
      if (error) {
        throw error;
      }
      res
        .status(200)
        .json({ message: `Department added with ID: ${results.insertId}` });
    });
  } catch (e) {
    res
      .status(400)
      .json({ status: "Error", data: "Invalid arguments for fields" });
  }
});

module.exports = router;
