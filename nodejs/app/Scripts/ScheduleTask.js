const cron = require('node-cron');
const express = require('express');
const nodemailer = require('nodemailer');
const AuditRepo = require("../repositories/auditRepository")
const EmployeeRepo = require("../repositories/employeeRepository")
const {AuditNotClose}=require("../utlis/EmailSchema")
const {sendMail}=require("../utlis/email")
app = express();

const cronTask = async () => {
  cron.schedule('*/1000 * * * * *', async function () {
    console.log('running a task every 1000s');
    const masterAudits = await AuditRepo.findAllAudits();
    const emails = await EmployeeRepo.findEmployee(masterAudits);
    const receipentEmails = emails.map(mail => mail.email)
    const sentMail=sendMail(AuditNotClose.subject,AuditNotClose.text,AuditNotClose.html,receipentEmails)
  });
}

app.listen(8000);

module.exports = {
  cronTask,
}
