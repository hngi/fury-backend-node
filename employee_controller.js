import createDB from "../../db/create-db";

const employee = `
CREATE TABLE employee (
    firstName varchar,
    lastName varchar,
    phoneNo varchar
    email varchar,
    departmentId bigint,
    hireDate date, 
    address varchar, 
    userId bigint
);
`;

createDB.query(employee)
.then(res => {
    console.log('Employee Table is successfully created');
})
.catch(err => {
    console.error(err);
})
.finally(() => {
    createDB.end();
});


//Creating a new Employee data
const createEmployee = (req, res) => {
    const {firstName, 
        lastName,
        phoneNo,
        email, 
        departmentId, 
        hireDate, 
        address, 
        userId} = req.body

    const EmployeeData = `
    INSERT INTO employee (firstName, lastName, phoneNo, email, 
        departmentId, hireDate, address, userId)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING id
    `
    createDB.query(EmployeeData,
        [firstName, lastName, phoneNo, email, 
        departmentId, hireDate, address, userId], (err, result) => 
        {
            if (err) {
                res.status(400).send({"status":"error", "data": err });
            }
            res.status(201).send({"status":"success", "data":result.rows.id})
        })
};

//Updating an employee details
const updateEmployee = (req, res) => {
    const id = parseInt(req.params.id)
    const upEmp = `SET firstName=$1, lastName=$2, phoneNo=$3, email=$4,
    departmentId=$5, hireDate=$6, address=$7, WHERE id=$8`

    createDB.query(
      `UPDATE employee ${upEmp}`,
      [firstName, lastName, phoneNo, email, 
        departmentId, hireDate, address, id],
      (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).send({"status":"success", "data":results})
      }
    )
};

module.exports ={
    createEmployee,
    updateEmployee,
}