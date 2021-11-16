const { DataTypes } =require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const employeeData = sequelize.define("employee_datas", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        sl_no: {
            type: DataTypes.INTEGER
        },
        employeeId: {
            type: DataTypes.INTEGER
        },
        employeeName: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
        },
        Department: {
            type: DataTypes.STRING,
        },
        Role: {
            type: DataTypes.STRING,
        },
        managerId: {
            type: DataTypes.INTEGER,
        },
     
    },{
        freezeTableName:true
    });
    return employeeData;
};