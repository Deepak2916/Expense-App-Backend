const signupModel=require('../models/signupModel')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
require('dotenv').config()
 
function geneterateToken(email){
    return jwt.sign({email:email},process.env.SECRETKEY)
}
const Postusers= async (req,res)=>{
    
       let {name,email,number,password}=req.body
  
    try{
    bcrypt.hash(password, 10,  async (err,hash)=>{ 

    await signupModel.create({ name,email,number,password:hash})
    res.status(200).json({
        message:'successfully created',
        success:true})
    })
    }
    catch(err){
        res.send(err)
        res.status(208).json({
            error:err.errors[0].message.split(" ")[0],
            success:false})
    }
}
const Getusers=async (req,res)=>{
    try{
    const users=await signupModel.findAll()
    res.json(users) 
    }
    catch(err){
        res.json(err)
    }
}
const GetLogin=async (req,res)=>{
    let email=req.query.email
    let password=req.query.password
    let login=await signupModel.findAll({where:{email:email}})
    let userExist=login[0]
    if(userExist){
        bcrypt.compare(password,userExist.password, (err,result)=>{
            if(result){
                res.status(200).json({
                    success:true,
                    message:'User login sucessful',
                    token:geneterateToken(userExist.email)
                })
            }
            else{
                res.status(401).json({
                    success:false,
                    message:'User not authorized'
                })
            }
            if(err){
                res.status(500).json({
                    success:false,
                    message:'something went wrong'
                })
            }
        })
       
    }
    else{
        res.status(404).json({
            success:false,
            message:'User not found'
        })
    }
    
}
const DeleteUser=async (req,res)=>{
    let email=req.params.email
    await signupModel.destroy({where:{email:email}})
    res.json('deleted')
}


module.exports={Postusers,Getusers,GetLogin,DeleteUser}