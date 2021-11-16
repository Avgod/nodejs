require("dotenv").config();
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, 'avin', {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,

  dialect: "postgres",  
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Users = require("./app/models/user")(sequelize, Sequelize);

module.exports = sequelize;
































// var sequelize = new Sequelize(`postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`);

// const { Pool } = require("pg");

// const isProduction = process.env.NODE_ENV === "production";

// const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

// const pool = new Pool({
//   connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
//   ssl: isProduction
// });

// module.exports = { pool };
