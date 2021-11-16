const masterAudit = require('../models/masterAudit');
const auditRepo = require('../repositories/auditRepository')
const EmployeeRepo=require("../repositories/employeeRepository")
const {sendMail}= require("../utlis/email")
const {sendDraftData} = require("../utlis/EmailSchema")

const createAuditReport = async (request) => {
    let audit_id = await auditIDdGeneratorFunc(request);
    let audit_report_id = await auditReportIDdGenerator(request);
    let masterAuditData1 = request.masterAudit;
    masterAuditData1.audit_id = audit_id;
    masterAuditData1.audit_report_id = audit_report_id;
    const result = await auditRepo.createAuditReport(masterAuditData1)
    return result
}

const createTeamAudit = async (teamAuditData) => {
    return await auditRepo.createTeamAudit(teamAuditData)
}

const getAllAudits = async () => {
    return await auditRepo.getAudits();
}
const auditReportIDdGenerator = async (request) => {
    let startNumber = "0001", uniqueNumber;
    const lastAuditReport = await auditRepo.getLastAuditID()
    console.log('lastAuditReport==', lastAuditReport);
    if (lastAuditReport.length > 0) {
        uniqueNumber = parseInt(lastAuditReport[0].audit_report_id.match(/(\d+)(?!.*\d)/)) + 1;
        console.log('uniqueNumber==', uniqueNumber);
    } else {
        uniqueNumber = startNumber
    }
    let auditReportID = "ar" + "_" + "audit" + "_" + request.masterAudit.project_id + "_" + request.masterAudit.checklist_id + "_" + parseInt(uniqueNumber)   //auto generate
    return auditReportID;
}

const updateAuditReport = async (masterAuditData) => {
    return await auditRepo.updateAuditReport(masterAuditData)
}

const updateTeamAudit = async (teamAuditData) => {
    return await auditRepo.updateTeamAudit(teamAuditData)
}

const updateDynamicChecklist = async (auditReportData) => {
    return await auditRepo.updateDynamicChecklist(auditReportData)
}

const auditIDdGeneratorFunc = async (request) => {
    let startNumber = "0001", uniqueNumber;
    const lastMasterAudit = await auditRepo.getLastAuditID()
    if (lastMasterAudit.length > 0) {
        uniqueNumber = parseInt(lastMasterAudit[0].audit_id.match(/(\d+)(?!.*\d)/)) + 1;
    } else {
        uniqueNumber = startNumber
    }
    let auditID = "audit" + "_" + request.masterAudit.project_id + "_" + request.masterAudit.checklist_id + "_" + parseInt(uniqueNumber)   //auto generate
    return auditID;
}

const auditDraftService=async(auditId)=>{
    const getAuditTeam=await auditRepo.getauditTeamID(auditId);
    const empIds=getAuditTeam.map(ele=>ele.team_member);
    const emailObject = await EmployeeRepo.findEmployee(empIds);
    const emails=emailObject.map(ele=>ele.email);
    const sendTeamMail=await sendMail(sendDraftData.subject,sendDraftData.text,sendDraftData.html,emails);
    return sendTeamMail;
}

module.exports = {
    createAuditReport,
    getAllAudits,
    createTeamAudit,
    auditReportIDdGenerator,
    updateAuditReport,
    updateTeamAudit,
    updateDynamicChecklist,
    auditDraftService
}

