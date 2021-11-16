'use strict';
var Sequelize = require('sequelize');
require("dotenv").config();

var db = {};

var sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, 'avin', {
  host: process.env.DB_HOST,
  port: '5454',
  dialect: "postgres",
  define: {
    freezeTableName: true
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.users = require("./user")(sequelize, Sequelize);
db.employeeData = require("./employee")(sequelize, Sequelize);
db.projectData = require("./project")(sequelize, Sequelize);
db.masterAudit = require("./masterAudit")(sequelize, Sequelize);
db.masterCheckList = require("./master_checklist")(sequelize, Sequelize);
db.auditTeam = require("./audit_team")(sequelize, Sequelize);
db.auditStatus = require('./audit_status')(sequelize, Sequelize);
module.exports = db;