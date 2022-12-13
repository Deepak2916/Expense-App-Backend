const resetPasswordControllers=require('../controllers/resetPassword')
const path=require('path')
const express=require('express')
const router=express.Router()

router.post('/postRequest',resetPasswordControllers.PostRequest)
router.get('/getRequest/:id',resetPasswordControllers.GetRequest)
router.post('/success',resetPasswordControllers.PostPassword)

module.exports=router