const {  DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define("users", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
  },
    full_name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING
    },
    emp_id: {
      type: DataTypes.INTEGER,
    },
    expiry_date:{
      type:DataTypes.DATE,   
    },
    role:{
      type:DataTypes.STRING,
      allowNull: true
    }
  });
  return Users;
};