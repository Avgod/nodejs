const express = require("express");
const router = express.Router();
const middleware=require("../middlewares/validation")
const checkListController = require("../controllers/checkListController");

router.post("/saveChecklist",middleware.checkListValidation,checkListController.checkListToDb);// save  checklist

router.get("/allCheckLists", checkListController.getCheckLists) // get all checklist info

router.post("/checkListData", checkListController.getCheckListByName) // get checklist by name


module.exports = router;