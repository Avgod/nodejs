const express = require("express");

//Import ReferalReasons routes
const userRoute = require('./userRoute');// login
const employeeRoute = require('./employeeRoute'); //project Details route
const checkListRoute = require('./checkListRoute'); // checklist details
// const rolesRoute = require('./rolesRoute');// roles
const projectRoute = require('./projectRoute'); //project Details route
const auditRoute = require('./auditDetailsRoute'); //audit details route
const serviceRouter = express.Router();
const token=require("../services/tokenService")

// Audit tool Work Flow Settings Routes

serviceRouter.use('/user', userRoute)    //user details

serviceRouter.use("/checklist", checkListRoute);   // saving checklist data 

serviceRouter.use("/employeeData", employeeRoute)   //saving employee data

serviceRouter.use('/projectData', projectRoute)   // project detials 

// serviceRouter.use('/roles-responsibility', rolesRoute)  //roles details

serviceRouter.use('/audit', auditRoute) //audit details route

serviceRouter.use("/token",token.verifyAccessToken)

serviceRouter.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status=404;
    next(error)
})

serviceRouter.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    });
});



module.exports = serviceRouter;




