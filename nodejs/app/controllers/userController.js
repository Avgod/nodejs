const userService = require('../services/userService');
const TokenService = require("../services/tokenService")
const DateFunction = require("../utlis/date")
const httpStatus = require('http-status');
const constants = require("../utlis/constants")
const asyncHandler = require("../middlewares/asyncHandler")

const createUser = asyncHandler(async (req, res) => {
  const { name, employeeID, emailID, password } = req.body;
  console.log(name, employeeID, emailID, password)
  const user = await userService.createUser({ full_name: name, emp_id: employeeID, email: emailID, password })
  return res.status(201).send({ code: httpStatus.OK, message: constants.USER_CREATED })
}
)

const loginUser = asyncHandler(async (req, res) => {
  const user = await userService.checkemail(req.body.username);
  if (!user) {
    return res.status(401).send({ code: httpStatus.OK, message: constants.NO_RECORD_FOUND })
  } else if (await userService.CheckPassword(req.body.password, user.password)) {
    const token = TokenService.generateAccessToken(req.body.username)
    const day_diff = DateFunction.differenceCal(user.expiry_date)
    return res.status(200).send({ code: httpStatus.OK, accessToken: token, password_expiry: day_diff, confirmRole: user.role, message: constants.LOGGED_ID })
  } else {
    return res.status(403).send({ code: httpStatus.OK, message: constants.INVALID_CREDENTIALS })
  }
})



module.exports = {
  createUser,
  loginUser
}
