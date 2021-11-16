const { signUpSchema, loginSchema, ArraysObjSchema, arraySchema } = require("../utlis/validationSchema")
const constants = require("../utlis/constants")

const signUpValidation = (req, res, next) => {
  const result = signUpSchema.validate(req.body);
  const { error } = result;
  const valid = error == null;
  if (!valid) {
    console.log(error)
    res.status(422).send({ message: constants.INVALID_INPUT, data: req.body, error: error.details })
  } else {
    next()
  }
}

const loginValidation = (req, res, next) => {
  const result = loginSchema.validate(req.body);
  const { error } = result;
  const valid = error == null;
  if (!valid) {
    res.status(422).send({ message: constants.INVALID_INPUT, data: req.body })
  } else {
    next()
  }
}

const checkListValidation = (req, res, next) => {
  console.log(req.body)
  const result = ArraysObjSchema.validate(req.body);
  const { value, error } = result;
  const valid = error == null;
  if (!valid) {
    console.log(error)
    res.status(422).send({ message: constants.INVALID_INPUT, data: req.body })
  } else {
    next()
  }
}

const checkArrayValidation = (req, res, next) => {
  const result = arraySchema.validate(req.body);
  const { value, error } = result;
  const valid = error == null;
  if (!valid) {
    console.log(error)
    res.status(422).send({ message: constants.INVALID_INPUT, data: req.body })
  } else {
    next()
  }

}


module.exports = {
  signUpValidation,
  loginValidation,
  checkListValidation,
  checkArrayValidation
}

