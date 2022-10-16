
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {JWT_STRONG} = require("../config/envConfig");

module.exports.hashedPassword = async(password)=>{
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password,salt);
    return hashed;
}

module.exports.comparePassword = async(password,dbPassword)=>{
    return await bcrypt.compare(password,dbPassword);
}

module.exports.createToken = (user)=>{
    return jwt.sign({id : user._id, name : user.name},JWT_STRONG,{expiresIn : "7d"});
}