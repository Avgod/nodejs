const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const masterCheckList = sequelize.define("master_checklists", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
        },
        checklist_id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        checklist_name: {
            type: DataTypes.STRING
        },
        type: {
            type: DataTypes.STRING
        },
        checklist_tablename: {
            type: DataTypes.STRING
        }

    }, {
        freezeTableName: true
    });
    return masterCheckList;
};