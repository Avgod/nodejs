const jwt = require("jsonwebtoken");



const verifyAccessToken = (req, res) => {
    var token;
    // console.log(req.headers['authorization'])
    if ('authorization' in req.headers)
      token = req.headers['authorization'].split(' ')[1];
    if (!token)
      return res.status(403).send({ auth: false, message: 'No token provided.' });
    else {
      jwt.verify(token, process.env.ACCESS_TOKEN,
        (err, decoded) => {
          if (err)
            return res.status(500).send({ auth: false, message: 'Token authentication failed.' });
          else {
            req.username = decoded.name;
            console.log(req.username)
            res.status(200).json({message:"token verified"})
          }
        }
      )
    }
  }


  const generateAccessToken = (username) => {
    const user = { name: username }
    const accesstoken = jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: "5m" })
    return accesstoken
  }



  module.exports={
      verifyAccessToken,
      generateAccessToken
  }