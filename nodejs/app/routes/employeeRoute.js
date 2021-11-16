const express = require("express");
const router = express.Router();

const employeeContoller = require("../controllers/employeeContoller");

router.post("/saveEmpDetails", employeeContoller.employeeToDB) //save  employee data

router.get("/getEmpdetails",employeeContoller.DbToEmployee)   //Save employee data

module.exports = router;