const employeeRepository = require('../repositories/employeeRepository')

const createEmpData = async (EmployeeData) => {
    const check_data = await employeeRepository.createEmployeeDB(EmployeeData)
    if (check_data[0].length === check_data[1].length) {
        return { dataInserted: true }
    } else {
        return { dataInserted: false, Difference: check_data[1].length - check_data[0].length }
    }
}

const getEmployeeData=async()=>{
    return await employeeRepository.getAllEmployeeData();
}
module.exports = {
    createEmpData,
    getEmployeeData
}