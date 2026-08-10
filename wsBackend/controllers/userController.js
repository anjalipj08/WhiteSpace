const User = require('../models/userModels')
const jwt = require('jsonwebtoken')
//Logic for register
exports.userRegister = async(req,res)=>{
    console.log('Inside Register Function')
    const {username,email,password,role} = req.body  

    try{
        const existingUser =await User.findOne({email})
        if (existingUser){
            res.status(402).json("User Alredy Existing")
        }
        else{
            const newUser =new User({username,email,password,role})
            await newUser.save()
            res.status(200).json({message:"Registeration Successfull...",newUser})
        }
    }
    catch(err){
        res.status(500).json(err)
    }
    
}

//Logic for Login
exports.userLogin = async(req,res)=>{
    console.log('Inside Login Function')
    const {email,password} = req.body  

    try{
        const existingUser =await User.findOne({email})
        if (existingUser){
            if(existingUser.password==password){
                //token generation
                const token = jwt.sign({userMail:existingUser.email, role:existingUser.role},process.env.jwtKey)
                console.log(token)
                res.status(200).json({message:"Login Success",existingUser,token})
            }
            else{
                res.status(401).json("Password Missmatch")
            }
        }
        else{
            res.status(401).json("User not Registerd")
        }
    }
    catch(err){
        res.status(500).json(err)
    }
    
}

//update user
exports.updateUser= async(req,res)=>{
    const {username, bio ,password , profile, location, businessType} = req.body
    const email = req.payload
    const uploadedProfile = req.file? req.file.filename:profile
    try{
        const updateUser = await User.findOneAndUpdate({email},{username,bio,location,password, businessType,profile:uploadedProfile},{new:true})
        await updateUser.save()
        res.status(200).json({message:"Updated Successfully",updateUser})
    }
    catch(err){
        res.status(500).json(err)
    }
}

//get advetiser
exports.getAdvertiser=async(req,res)=>{
    try{
        const email = req.payload
        const advertiser =await User.findOne({email})
        res.status(200).json(advertiser)
        
    }
    catch(err){
        res.status(500).json(err)
    }
}

//get all Users
exports.getAllUsers=async(req,res)=>{
    try{
        const users =await User.find({ role: { $ne: 'admin' } })
        res.status(200).json(users)       
    }
    catch(err){
        res.status(500).json(err)
    }
}

//get Admin 
exports.getAdmin=async(req,res)=>{
    try{
        const admin =await User.findOne({role:"admin"})
        res.status(200).json(admin)       
    }
    catch(err){
        res.status(500).json(err)
    }
}