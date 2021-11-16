const userRespository = require('../repositories/userRepository');
const bcrypt = require("bcryptjs");



const getExpiryDate = () => {
    const currentDate = new Date();
    const finalDate = new Date();
    return finalDate.setDate(currentDate.getDate() + 90); //Add 90 Days To Current Date 
}

const createUser = async (user) => {
    const hashedpassword = await bcrypt.hash(user.password, 10)
    const finalDate = getExpiryDate();
    user.password = hashedpassword;
    user.expiry_date = finalDate;
    return await userRespository.create(user);
}

const checkemail = async (email) => {
    return await userRespository.checkEmail(email);
}

const CheckPassword = async (UserPass, DBPass) => {
    return await bcrypt.compare(UserPass, DBPass)
}


module.exports = {
    getExpiryDate,
    createUser,
    checkemail,
    CheckPassword
}
