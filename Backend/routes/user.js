const router=require("express").Router();
const User= require("../models/user");
const bcrypt = require("bcryptjs");

//signup-route
router.post("/sign-up",async (req,res) =>{
    try{
        const{username,email,password}=req.body;
        if(!username||!email||!password){
            return res.status(400).json({message:"All fields  are required"});
        }
        if(username.length<5){
            return res.status(400).json({message:"Username must have 5 characters"});
        }
        if(password.length<6){
            return res.status(400).json({message:"Password must have 6 characters"});
        }

        //Check whether user exist or not:
        const existingEmail= await User.findOne({email:email});
        const existingUsername=await User.findOne({username:username});
        if(existingEmail||existingUsername){
            return res.status(400).json({message:"Username or Email already exist"})
        }

        //Has the password
        const salt =await bcrypt.genSalt(10);
        const hashedPass=await bcrypt.hash(password,salt);
        const newUser= new User({username,email,password:hashedPass});
        await newUser.save();
        return res.status(200).json({message:"Account created"})
        }
        catch(error){
        console.log(error);
        res.status(400).json({error});
    }
});

//signin-route





module.exports=router;