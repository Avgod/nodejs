
const dbInstance = require("../models")
const Date = require("../utlis/date")
const { Op } = require("sequelize")


const findAllAudits = async () => {
   try {
      const AllAudit = await dbInstance.masterAudit.findAll({ where: { status: { [Op.ne]: 'closed' } }, raw: true });
      if (AllAudit.length > 0) {
         return Date.AuditExpiryDate(AllAudit)
      }
   } catch (error) {
      console.log(error);
   }
}

const createAuditReport = async (project_data) => {
   return await dbInstance.masterAudit.create(project_data)
}

const createTeamAudit = async (project_data) => {
   return await dbInstance.auditTeam.bulkCreate(project_data)
}

// get all projects 
const getAudits = async () => {
   return await dbInstance.masterAudit.findAll()
}

const getLastAuditID = async () => {
   return await dbInstance.masterAudit.findAll({
      raw: true,
      limit: 1,
      attributes: ["audit_id", "audit_report_id"],
      order: [['createdAt', 'DESC']]
   })
}

const updateAuditReport = async (masterAuditData) => {
   return await dbInstance.masterAudit.update(masterAuditData)
}

const updateTeamAudit = async (teamAuditData) => {
   return await dbInstance.auditTeam.update(teamAuditData)
}

const updateDynamicChecklist = async (auditReportData) => {
   return await dbInstance.masterAudit.update(auditReportData)
}

const getauditTeamID=async(auditId)=>{
return await dbInstance.auditTeam.findAll({attributes:["team_member"], where: { audit_id: auditId }, raw: true })
}


module.exports = {
   findAllAudits,
   getAudits,
   createAuditReport,
   createTeamAudit,
   getLastAuditID,
   updateDynamicChecklist,
   updateTeamAudit,
   updateAuditReport,
   getauditTeamID
}








