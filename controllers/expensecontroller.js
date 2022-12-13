const Expense=require('../models/expenseModels')
const User=require('../models/signupModel')
const Razorpay = require('razorpay');
const S3Service=require('../services/S3Service')
const downloadfiles=require('../models/downloadExpenses')
require('dotenv').config()


const addExpense=async (req,res)=>{
    let user=await Expense.findAll()

    let info={
        Amount:req.body.Amount,
        Description:req.body.Description,
        Category:req.body.Category,
        userId:req.user[0].id
    }
    // console.log(info)
    // console.log('.........>',req.user[0].id)
    try{
        
        const userExpense=await Expense.create(info)
        res.status(200).json(userExpense)
    }
    catch(err){
       console.log(err) 
    }   
}
const getAllExpenses=async (req,res)=>{
    try{
        let pageNumber=+req.query.page
        let size=+req.query.size
   
        let total=await Expense.count({where:{userId:req.user[0].id}})
       
        let pages=Math.ceil(total/size)
        let page;
        console.log(pageNumber)
        if(pageNumber>0){
            page=pageNumber
        }
        else{
            page=pages
        }
       
        // console.log('-----------',req.user[0].id)
        // console.log(page,size)
        const userExpense=await Expense.findAll({
            where:{userId:req.user[0].id},
            limit:size,
            offset:(page-1)*size
    })
        res.status(200).json({
           expenses: userExpense,
           pages:pages,
           user:req.user[0]
        })
    }
    catch(err){
        console.log(err)
    }
}

const getOneUserExpenses=async (req,res)=>{
    try{
         let id=req.query.id
        const userExpense=await Expense.findAll({where:{userId:id}})
        res.status(200).json(userExpense)
    }
    catch(err){
        console.log(err)
    }
   
    
}
const deleteExpence=async (req,res)=>{
    try{
        let id=req.query.id
        await Expense.destroy({where:{id:id,userId:req.user[0].id}})
        res.status(200).send('expense deleted')
    }
    catch(err){
        console.log(err)
    }
}


// const editExpence=async (req,res)=>{
//     let info={
//         Amount:req.body.Amount,
//         Description:req.body.Description,
//         Category:req.body.Category 
//     }
//     try{
       
//         let id=req.params.id
//         const userExpense=await expenseModel.update(info,{where:{id:id}})
//         res.status(200).json(userExpense)
//     }
//     catch(err){
//         console.log(err)
//     }
// }



var instance = new Razorpay({ key_id:process.env.RAZOR_KEY_ID, key_secret:process.env.RAZOR_KEY_SECRET})

const orderPremiumAccount = async (req,res)=>{
    const {amount,currency,receipt, notes}  = req.body
 await instance.orders.create({amount,currency,receipt, notes}, function(err, order) {
  if(!err){
    res.json(order)
  }
  else{
    res.json(err)
  }
});
}

const leaderBord=async (req,res)=>{
    let Allusers=await User.findAll()
    let arr=[]
    
    for(let user of Allusers){
        let total=0
        let expenses=await Expense.findAll({where:{userId:user.id}})
        expenses.forEach((expense)=>{
            if(expense.Amount>0)
            total+=expense.Amount
        })
        arr.push([user.name,total,user.id])
    }
    arr.sort((a,b)=>b[1]-a[1])
   
    res.json({
        users:arr})

}

// downloading expenses


const DownloadExpenses=async (req,res)=>{
    let userId=req.body.id
    const expenses=await Expense.findAll({where:{userId:userId}})

    const stringifyexpenses=JSON.stringify(expenses)
    const filename=`Expense/${userId}/${new Date()}.txt`;
    const fileUrl= await S3Service.uploadToS3(stringifyexpenses,filename)
    await downloadfiles.create({
        fileUrl:fileUrl,
        userId:userId
    })
    res.json({fileUrl,success:true})

}

module.exports={addExpense,getAllExpenses,deleteExpence,orderPremiumAccount,leaderBord,getOneUserExpenses,DownloadExpenses}