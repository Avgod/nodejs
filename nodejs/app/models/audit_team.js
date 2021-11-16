const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const auditTeam = sequelize.define("audit_team", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        audit_id: {
            type: DataTypes.STRING
        },
        audit_role: {
            type: DataTypes.STRING,
        },
        team_member: {
            type: DataTypes.INTEGER
        },
        remarks: {
            type: DataTypes.STRING,
        },
    }, {
        freezeTableName: true
    });
    return auditTeam;
};