const PremiumContoller=require('../controllers/premiumContoller')
const express=require('express')
const router=express.Router()

router.post('/add',PremiumContoller.PostPremiumAccount)
router.get('/get',PremiumContoller.GetPremiumUser)

module.exports=router