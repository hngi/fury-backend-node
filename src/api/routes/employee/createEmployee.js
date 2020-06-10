var express = require('express');
var router = express.Router();
const createDB = require("./../../db/create-db"); 
const helpers = require('./helpers');

router.post('/', async (req,res) =>{
    /* Fields = firstName(req), lastName(req), phoneNo(req), 
    email(req), departmentId(req), hireDate(req), address, userId(req)
*/
    const {firstName, lastName, phoneNo, email, departmentId, hireDate, address} = req.body

    if(address == null)address = "";

    //Checking for empty or invalid inputs
    if(helpers.isEmpty(firstName) && helpers.isEmpty(lastName)
    && helpers.empty(phoneNo) && helpers.isValidEmail(email)
    && helpers.empty(departmentId) && helpers.empty(hireDate) ){
        return res.status(400).json({status: "Error", data: "Invalid arguments for fields"})
    }
    try{
        const query = 'INSERT INTO eployees(first_name, last_name, phone_no, email, department_id, hire_date, address) values($1, $2, $3, $4, $5, $6, $7)';
        const vars = [firstName, lastName, phoneNo, email, departmentId, hireDate, address]

        //Inserting new data into database
        await createDB.query(query, vars, (error, results) => {
            if (error) {
                throw error
              }
            response.status(200).json({message:`User added with ID: ${result.insertId}`})
        });
    }catch(e){
        res.status(400).json({status: "Error", data: "Invalid arguments for fields"})
    }

});