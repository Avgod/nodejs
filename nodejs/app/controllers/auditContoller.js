//package import
const httpStatus = require('http-status');
const auditService = require('../services/auditService')
const checkListService = require('../services/checkListService');
const constants = require('../utlis/constants');
const asyncHandler = require("../middlewares/asyncHandler")

const saveAuditReport = asyncHandler(async (req, res) => {
    const request = req.body;
    const masterAuditData = await auditService.createAuditReport(request)
    // let teamAuditData = request.teamAudit;
    let teamAuditData = [];
    teamAuditData = request.teamAudit;
    let audit_id = masterAuditData.audit_id;
    teamAuditData.map((ele) => {
        ele["audit_id"] = audit_id
    })
    // teamAuditData.audit_id = masterAuditData.audit_id;
    const teamData = await auditService.createTeamAudit(teamAuditData);
    let tableName = masterAuditData.dataValues.audit_report_id;
    let sendData = request.CheckList.sendData;
    let ColumnHeader = request.CheckList.columnHeaders;
    const checkListDynamic = await checkListService.GenerateDynamicCheckList(ColumnHeader, sendData, undefined, tableName);
    if (checkListDynamic) {
        return res.status(200).send({ code: httpStatus.OK, message: constants.INSERTED_SUCCESSULLY, data: { masterAuditData: masterAuditData.dataValues, teamAudit: teamData.dataValues } })
    } else {
        return res.status(400).send({ code: httpStatus.OK, message: constants.NOT_INSERTED })
    }

})

//get audits 
const getAllAudits = asyncHandler(async (req, res) => {
    const data = await auditService.getAllAudits();
    if (data) {
        return res.status(200).send({ code: httpStatus.OK, message: constants.SUCCESSULLY_FETECHED, data: data })
    }
    else {
        return res.status(400).send({ code: httpStatus.OK, message: constants.CANNOT_FETCH })
    }
}
)

const updateAuditReport = asyncHandler(async (req, res) => {
    const request = req.body;
    let masterAuditData = request.masterAudit;
    let teamAuditData = request.teamAudit;
    let auditReportData = request.CheckList;
    const masterAudit = await auditService.updateAuditReport(masterAuditData)
    const teamUpdateData = await auditService.updateTeamAudit(teamAuditData);
    const checkListDynamic = await auditService.updateDynamicChecklist(auditReportData);
    if (masterAudit && teamUpdateData && checkListDynamic) {
        return res.status(200).send({ code: httpStatus.OK, message: constants.DATA_UPDATED })
    } else {
        return res.status(400).send({ code: httpStatus.OK, message: constants.UPDATE_FAIL })
    }

})

const auditSendDraft = asyncHandler(async (req, res) => {
    const auditId = req.body
    const sentDraftEmail = await auditService.auditDraftService(auditId.audit_id);
    return res.status(200).send(sentDraftEmail)
}
)




module.exports = {
    saveAuditReport,
    getAllAudits,
    updateAuditReport,
    auditSendDraft
}


