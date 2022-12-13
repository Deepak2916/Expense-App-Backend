const signupContoller=require('../controllers/signupController')
const express=require('express')
const router=express.Router()

router.post('/signup',signupContoller.Postusers)
router.get('/login',signupContoller.GetLogin)
router.get('/',signupContoller.Getusers)
router.delete('/delete',signupContoller.DeleteUser)





module.exports=router

