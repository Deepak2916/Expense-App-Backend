const PremiumContoller=require('../controllers/premiumContoller')
const userAuthenticate=require('../middleware/authenticate')
const express=require('express')
const router=express.Router()

router.get('/add',userAuthenticate.authenticate,PremiumContoller.GetPremiumAccount)


module.exports=router