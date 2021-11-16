const { DataTypes } =require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const projectData = sequelize.define("project_datas", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        sl_no: {
            type: DataTypes.INTEGER
        },
        ProjectId: {
            type: DataTypes.STRING
        },
        ProjectName: {
            type: DataTypes.STRING
        },
        ProjectManager: {
            type: DataTypes.STRING
        },
        QA: {
            type: DataTypes.STRING,
        },
        EmpID: {
            type: DataTypes.INTEGER,
        },
        Role: {
            type: DataTypes.STRING,
        },
    },{
        freezeTableName:true
    });
    return projectData;
};