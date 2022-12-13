const expensecontroller=require('../controllers/expensecontroller.js')
const userAuthenticate=require('../middleware/authenticate')

const router=require('express').Router()
router.get('/oneUser',expensecontroller.getOneUserExpenses)
router.delete('/delete',userAuthenticate.authenticate,expensecontroller.deleteExpence)
router.post('/',userAuthenticate.authenticate,expensecontroller.addExpense)
router.get('/',userAuthenticate.authenticate, expensecontroller.getAllExpenses)
router.post('/payment',expensecontroller.orderPremiumAccount)
router.get('/leaderbord',expensecontroller.leaderBord)
router.post('/download',expensecontroller.DownloadExpenses)


// router.get('/:id', expensecontroller.getOneExpenxse)
// router.delete('/:id',expensecontroller.deleteExpence)
// router.put('/edit:id',expensecontroller.editExpence)

module.exports=router