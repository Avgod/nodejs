const dbInstance = require("../models")


//From excel to DB
const createEmployeeDB = async (employee_data) => {
    let compareList = []
    for (let data of employee_data) {
        let { "Sl. No.": SlNo, "Emp ID": EmpID, "Emp Name": EmpName, "Email ID": email, Department, Role, "Manager ID": ManagerId } = data
        compareList.push({ sl_no: SlNo, employeeId: EmpID, employeeName: EmpName, email: email, Department: Department, Role: Role, managerId: ManagerId })
        await dbInstance.employeeData.create({ sl_no: SlNo, employeeId: EmpID, employeeName: EmpName, email, Department, Role, managerId: ManagerId })
    }
    const db_data = await dbInstance.employeeData.findAll({ raw: true, attributes: ["sl_no", "employeeId", "employeeName", "email", "Department", "Role", "managerId"] })
    return compareList, db_data;
}

const getAllEmployeeData = async () => {
    return await dbInstance.employeeData.findAll({ raw: true, attributes: ["sl_no", "employeeId", "employeeName", "email", "Department", "Role", "managerId"] })
}

const findEmployee = async (masterAudits) => {
    try {
        const empEmail = await dbInstance.employeeData.findAll({ attributes: ["email"], where: { employeeId: masterAudits }, raw: true })
        return empEmail;
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    findEmployee,
    createEmployeeDB,
    getAllEmployeeData
}

