const Joi = require('joi');


const signUpSchema = Joi.object().keys({
    name: Joi.string().min(3).max(30).required(),
    employeeID: Joi.number().required(),
    emailID: Joi.string().email().required(),
    password: Joi.string().min(3).max(15).required().label('Password'),
    confirm: Joi.any().equal(Joi.ref('password'))
    .required()
    .label('Confirm password')
    .messages({ 'any.only': '{{#label}} does not match' })
});

const loginSchema = Joi.object().keys({
    username: Joi.string().email().required(),
    password: Joi.string().required(),              //what if only Number
});

const NameTypeObjSchema=Joi.object().keys({
    name: Joi.string().min(3).max(16).required(),
    type: Joi.string().min(3).max(16).required(),
});

const ArraysObjSchema=Joi.object().keys({
    ColumnHeader: Joi.array().min(1).required(),
    sendData: Joi.array().min(1).required(),
    obj:NameTypeObjSchema
});

const arraySchema=Joi.object().keys({
    sendData:Joi.array().min(1).required(),
})  


module.exports={
    signUpSchema,
    loginSchema,
    NameTypeObjSchema,
    ArraysObjSchema,
    arraySchema
}