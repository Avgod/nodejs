require('dotenv').config();
const express = require('express')
const app = express()
const port = 4000;
const routes =require("./app/routes/routes")
const cors = require("cors");
const sequelize = require('./db.config');
const models = require('./app/models');
// const cronScheduler = require('./app/Scripts/ScheduleTask'); //final adding features
const errorHandler = require('./app/middlewares/errorHandler');


app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', "*"); //For Development purposes
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

app.use(express.json())

app.use(cors());


app.use("/", routes)


sequelize.authenticate().then(() => {
    console.log('Connection To Database has been established successfully.');
    models.sequelize.sync({});
}).catch((error) => {
    console.error('Unable to connect to the database:', error);
});

// cronScheduler.cronTask();



//error Handler
app.use(errorHandler)


app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
