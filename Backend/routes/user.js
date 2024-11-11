const router=require("express").Router();
const User= require("../models/user");
const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken");

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
        res.status(500).json({error});
    }
});

//signin-route
router.post("/sign-in",async(req,res)=>{
    try{
        const{email,password}=req.body;
        if(!email||!password){
            return res.status(400).json({message:"All fields  are required"});
        }
        //to check user exist or not 
        const existingUser= await User.findOne({email:email});
        if(!existingUser){
            return res.status(400).json({message:"Invalid credentials"});
        }

        //to check password is same or not
        const isMatch=await bcrypt.compare(password,existingUser.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"});
        }

        //Generate JWT token
        const token=jwt.sign(
        {id:existingUser._id,email:existingUser.email},
        process.env.JWT_SECRET,
        {expiresIn:"30d" }
    );
    res.cookie("podcasterUSerToken",token,{
        httpOnly: true,
        maxAge: 30*24*60*60*1000,//30days
        secure: process.env.NODE_ENV=== "production",
        sameSite: "None", 
    });
    return res.status(200).json({
        id:existingUser._id,
        username:existingUser.username,
        email:email,
        message:"Sign-in Successfully",
    })
    }catch(error){
        res.status(500).json({error});
    }
});

//LOGOUT ROUTER:
router.post("/logout",async(req,res)=>{
    res.clearCookie("podcasterUSerToken",{
        httpOnly: true,
    });
    res.json({message: "Logged out"});
});


// TO CHECK COOKIE IS PRESENT OR NOT
router.get("/check-cookie", async (req, res) => {
    const token = req.cookies.podcasterUSerToken;
    if (token) {
        return res.status(200).json({ message: "true" });
    }
    return res.status(200).json({ message: "false" });
});
module.exports=router;