const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const auditStatus = sequelize.define("audit_status", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        status: {
            type: DataTypes.STRING,
        },

    }, {
        freezeTableName: true
    });
    return auditStatus;
};