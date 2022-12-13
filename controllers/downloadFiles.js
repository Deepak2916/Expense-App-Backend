const downloadModel=require('../models/downloadExpenses')


const Getfiles=async (req,res)=>{

    try{
    let id=req.params.id
   let files= await downloadModel.findAll({where:{userId:id}})
   res.status(200).json({
    success:true,
    files:files
   })
}
catch(err){
    res.json(err)
}
}

module.exports={Getfiles}