const httpStatus = require('http-status');
const employeeService = require('../services/employeeService');
const constants = require('../utlis/constants');
const asyncHandler = require("../middlewares/asyncHandler")

const employeeToDB = asyncHandler(async (req, res) => {
  const employeeData = (req.body)
  const ListData = await employeeService.createEmpData(employeeData)
  if (ListData.dataInserted == true) {
    return res.status(201).send({ code: httpStatus.OK, message: constants.INSERTED_SUCCESSULLY })
  } else {
    return res.status(206).send({ code: httpStatus.OK, message: constants.NOT_INSERTED, differnce: ListData.Difference })
  }
})

const DbToEmployee = asyncHandler(async (req, res) => {

  const Data = await employeeService.getEmployeeData();
  if (!Data) {
    return res.status(404).send({ code: httpStatus.OK, message: constants.CANNOT_FETCH })
  }
  return res.status(200).send({ code: httpStatus.OK, message: constants.SUCCESSULLY_FETECHED, data: Data })

}
)
module.exports = {
  employeeToDB,
  DbToEmployee
}