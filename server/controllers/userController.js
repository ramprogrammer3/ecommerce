

const {validationResult} = require('express-validator');
const User = require("../models/userModel");
const {hashedPassword,createToken,comparePassword} = require("../services/authService");

module.exports.register = async(req,res)=>{
    const errors = validationResult(req);
    if(errors.isEmpty()){
        const {name,email, password} = req.body;
        try {
            const emailExist = await User.findOne({email});
            if(!emailExist){
                const hashed = await hashedPassword(password);
                const user = await User.create({
                    name,
                    email,
                    password : hashed,
                    admin : true
                })
               
                const token = createToken({id : user._id,name : user.name})
                return res.status(201).json({msg : "your account has been created",token})

            }else{
                return res.status(401).json({errors : [{msg : "email already exist "}]})
            }
            
        } catch (error) {
            console.log(error.message);
            return res.status(500).json("Internal server error ");
        }

    }else{
        // validation failed 
        return res.status(400).json({errors : errors.message})
    }
}


module.exports.login =async (req,res)=>{
    const {email, password} = req.body;
    const errors = validationResult(req);

    if(errors.isEmpty()){
        const user = await User.findOne({email});
        if(user){

            if(await comparePassword(password,user.password)){
                const token = createToken({id : user._id,name : user.name})

                if(user.admin){
                    return res.status(200).json({token, admin: true})
                }else{
                    return res.status(200).json({token,admin : false})
                }

            }else{
                return res.status(401).json({errors : [{msg : "password does not match"}]})
            }


        }else{
            return res.status(404).json({errors : [{msg : "user not found with this eamil"}]});
        }

    }else{
        return res.status(400).json({errors : errors.array()})
    }
}