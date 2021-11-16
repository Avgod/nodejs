const express = require("express");
const router = express.Router();
const middleware = require("../middlewares/validation")

const projectController = require("../controllers/projectController");

router.post("/saveProjectData", middleware.checkArrayValidation, projectController.projectToDB) // saving project data

router.get("/allProjects", projectController.getProjects) // get all projects list

router.get("/projectDetails", projectController.getProjectByName) //get project details based on name



module.exports = router;