const filescontroller=require('../controllers/downloadFiles')


const router=require('express').Router()

router.get('/downloadedfiles/:id',filescontroller.Getfiles)


module.exports=router