const express = require("express");
const router = express.Router();

const auditController = require("../controllers/auditContoller");

// save  master adut details,team audit details and generate audit report

router.post("/saveMasterAudit", auditController.saveAuditReport);

router.post("/updateMasterAudit", auditController.saveAuditReport);

router.post("/sendDraft",auditController.auditSendDraft);
// router.get("/allCheckLists", auditContoller.getCheckLists) // get all checklist info

module.exports = router;