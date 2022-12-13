const resetPassword=require('../models/forgetpassword')
const path=require('path')
const User=require('../models/signupModel')
const { v4: uuidv4 } = require('uuid')
// const sendMail=require('@sendgrid/mail')
const  bcrypt=require('bcrypt')

let PostRequest=async (req,res)=>{
    let email=req.body.email
//    console.log(req.body.email)
//     let API_KEY=''

//     sendMail.setApiKey(API_KEY)
//     const message={
//         to:email,
//         from:'deepakelimilla@gmail.com',
//         subject:'request from Expense App',
//         text:`http://4000/resetPassword/link/:${uuidv4()}`,
//         html:'http://4000/resetPassword/link/:${uuidv4()}'
    // }
try{
//    let sendingmail=await sendMail.send(message)
    let user= await User.findAll({where:{email:email}})
   if(user[0].id>0){
    let info={
        id:uuidv4(),
        isActive:true,
        userId:user[0].id
    }
   
    let creatLink= await resetPassword.create(info)

    res.json({
        link:`http://localhost:4000/resetPassword/getRequest/${info.id}`,
        succss:true
    })
}
else{
    res.json({
        link:`entered email id is not correct`,
        success:false
    })

}
    }
catch(err){
    res.json(err)
}
}
let GetRequest=async (req,res)=>{

    let id=req.params.id
    let request=await resetPassword.findAll({where:{id:id}})
    // console.log('...',id,request[0].isActive)

    if(request[0].isActive){
        res.sendFile(path.join(__dirname,'../','view','resetpassword.html'))
        await resetPassword.update({
            id:id,
            isActive:false
        },{where:{id:id}})
    }
    else{
        res.send('link expired')
    }

}

let PostPassword=async (req,res)=>{ 
   let link= req.header('Referer').split('/').at(-1)
   try{
   let request= await resetPassword.findAll({where:{id:link}})
   let userId= request[0].userId
   let user=await User.findAll({where:{id:userId}})
 
    password=req.body.password
   
   bcrypt.hash(password, 10,  async (err,hash)=>{ 

    await User.update({
        name:user[0].name,
        email:user[0].email,
        number:user[0].number,
        password:hash
       },{
        where:{id:user[0].id}})
    res.status(200).json({
        message:'successfully created',
        success:true})
    })

   }
   catch(err){
   console.log(err)
   }
}



module.exports={PostRequest,GetRequest,PostPassword}