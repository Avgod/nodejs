const dbInstance = require('../models');

const create = async (user) => {
    return await dbInstance.users.create(user)
}

const checkEmail = async(email)=>{
    return await dbInstance.users.findOne({ where: { email:email} })
}


module.exports = {
    create,
    checkEmail,
    
}