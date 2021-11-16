const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const masterAudit = sequelize.define("master_audits", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        audit_id: {
            type: DataTypes.STRING
        },
        audit_report_id: {
            type: DataTypes.STRING
        },
        project_id: {
            type: DataTypes.STRING
        },
        checklist_id: {
            type: DataTypes.STRING
        },
        audit_start_date: {
            type: DataTypes.DATE,
        },
        audit_end_date: {
            type: DataTypes.DATE,
        },
        status: {
            type: DataTypes.STRING,
        },
        // emp_id: {
        //     type: DataTypes.INTEGER,
        // },
        place_of_audit: {
            type: DataTypes.STRING,
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'created_at'
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'updated_at'
        }
    }, {
        freezeTableName: true
    });
    return masterAudit;
};