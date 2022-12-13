const premiumUser=require('../models/premiumAccounts')

const PostPremiumAccount=async (req,res)=>{
    await premiumUser.create({userId:req.body.userId})
    res.json({
        success:true,
        message:'you got a premium account'
    })
}
const GetPremiumUser=async (req,res)=>{
   let user= await premiumUser.findAll({where:{userId:req.query.id}})
   if(user.length>0){
    res.json({
        success:true
    })
   }
   else{
    res.json({
        success:false
    })
   }
}


module.exports={PostPremiumAccount,GetPremiumUser}