import db from "../../db/create-db";

//getting all Employee data
exports.AllEmployee = (req,res)=>{
    const department_id = parseInt(request.params.department_id)
db.query('SELECT * FROM employees WHERE department_id=$1', [department_id], 
(error, results) => {
        if (err) {
            res.status(400).send({"status":"error", "data": err });
        }
        res.status(200).send({"status":"success", "data":results})
    })
};