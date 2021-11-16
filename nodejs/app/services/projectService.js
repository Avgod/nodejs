const projectRepo = require('../repositories/projectRepository')

const createProjectData = async (project_data) => {
    console.log("inside Service")
    const check_data = await projectRepo.createProjectDB(project_data)
    if (check_data[0].length === check_data[1].length) {
        return { dataInserted: true }
    } else {
        return { dataInserted: false, Difference: check_data[1].length - check_data[0].length }
    }
}

const getProjects = async () => {
    return await projectRepo.get();
}

const getProjectsByName = async () => {
    return await projectRepo.getOne();
}

module.exports = {
    createProjectData,
    getProjects,
    getProjectsByName
}