const config  = require("../config/config.json");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userController = {
// Register 
userRegister:async(req,res)=>{
    try{
       console.log(req.body);
       const {username, email , password, dob} = req.body;
       
       const user = await User.findOne({email});
       if(user){
           return res.status(400).json({message:"User already exists"});
       }
       if(user == 0){
        return res.status(400).json({message:"User is not Active"}); 
       }
       const passwordhash = await bcrypt.hash(password,10);
       const newUser = new User({
           username:username,
           email:email,
           password:passwordhash,
           dob:dob
       });
       await newUser.save();
       return res.status(201).json({
           message:"User Registered Successfully",
           data:newUser
       });
    }catch(err){
        return res.status(500).json({err:err.message});
    }
},


// Login 

userLogin:async(req,res)=>{
    try{
      console.log(req.body);
      const {email, password }  =req.body;
      const validate = validator.isEmail(email);
       if(!validate){
           return res.status(400).json({error:{message:"Invalid Email format"}});
       }
      
      const user = await User.findOne({email});
      if(!user){
          return res.status(400).json({error:{message:"User is not registered"}});
      }
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(400).json({error:{password:"User password does not matched"}})
    }
    const accessToken  = jwt.sign({
        id:user._id,
    }, config.SECRET_KEY,{expiresIn:"5d"});
    return res.status(200).json({message:"User login Successfully", data:user,token:accessToken});
    }catch(err){
        return res.status(600).json({
            message:"Invalid credentials Error"
        });
    }
},

// change passowrd
change_password:async(req,res)=>{
    try{
        const {password,email} = req.body;
      const user = await User.findOne({email:email});
      const isMatch = bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: { password: "Incorrect Password" } });
      }
      const passwordhash = await bcrypt.hash(password,10);
      const changePassword = await User.findOneAndUpdate({
        email:email
      },{
          password:passwordhash
      });
      return res.status(200).json({
          message:"Password change successfully",
          data:changePassword
      });
    }catch(err){
        return res.status(500).json({
            message:err.message
        })
    }
}

}

module.exports = userController;