//package import
const httpStatus = require('http-status');
const projectService = require('../services/projectService');
const constants = require('../utlis/constants');
const asyncHandler = require("../middlewares/asyncHandler")


const projectToDB = asyncHandler(async (req, res) => {
  const projectData = (req.body.sendData)
  const ListData = await projectService.createProjectData(projectData)
  if (ListData.dataInserted == true) {
    return res.status(201).send({ message: constants.INSERTED_SUCCESSULLY })
  } else {
    return res.status(206).send({ differnce: ListData.Difference, message: constants.NOT_INSERTED })
  }
})


//get Projects On click On projects dropdown
const getProjects = asyncHandler(async (req, res) => {
  const data = await projectService.getProjects()
  if (data) {
    return res.status(200).send({ code: httpStatus.OK, message: constants.SUCCESSULLY_FETECHED, data: data })
  }
  else {
    return res.status(400).send({ code: httpStatus.OK, message: constants.CANNOT_FETCH })
  }
})

//get Projects On click On projects dropdown
const getProjectByName = asyncHandler(async (req, res) => {
  const projName = req.body;
  const data = await projectService.getProjects({ projName: projName })
  if (data) {
    return res.status(200).send({ code: httpStatus.OK, message: constants.SUCCESSULLY_FETECHED, data: data })
  }
  else {
    return res.status(400).send({ code: httpStatus.OK, message: constants.CANNOT_FETCH })
  }
}
)
module.exports = {
  projectToDB,
  getProjects,
  getProjectByName
}