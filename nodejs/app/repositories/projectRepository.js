const dbInstance = require("../models")


const createProjectDB = async (project_data) => {
    let compareList = []
    for (let data of project_data) {
        console.log("inside this")
        let { "Sl. No.": SlNo, "Project ID": ProjectId, "Project Name": ProjectName, "Project Manager": ProjectManager, QA, "Emp ID": EmpID, Role } = data
        compareList.push({ sl_no: SlNo, ProjectId: ProjectId, ProjectName: ProjectName, ProjectManager: ProjectManager, QA: QA, EmpID: EmpID, Role: Role });
        await dbInstance.projectData.create({ sl_no: SlNo, ProjectId: ProjectId, ProjectName: ProjectName, ProjectManager: ProjectManager, QA: QA, EmpID: EmpID, Role })
    }
    const db_data = await dbInstance.projectData.findAll({ raw: true, attributes: ["sl_no", "ProjectId", "ProjectName", "ProjectManager", "QA", "EmpID", "Role"] })
    console.log(compareList,db_data)
    return compareList, db_data;
}

// get all projects 
const get = async () => {
    return await dbInstance.projectData.findAll()
}

// get  projects by name
const getOne = async () => {
    return await dbInstance.masterAudit.findOne()
}
module.exports = {
    createProjectDB,
    get,
    getOne
}
