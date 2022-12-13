const express=require('express')
const fs= require('fs')
// const ht tps=require('https')
const body=require('body-parser')
const cors=require('cors')
const path=require('path')
const helmet=require('helmet')
const morgan=require('morgan')
const compression=require('compression')
const app=express()
const sequelize=require('./util/database')
const Expense=require('./models/expenseModels')
const Premium=require('./models/premiumAccounts')
const User=require('./models/signupModel')
const ResetPassword=require('./models/forgetpassword')
const downloadedfiles=require('./models/downloadExpenses')


app.use(body.json())
 app.use(cors())
 
app.use(express.json())
User.hasOne(Premium)
Expense.belongsTo(User,{constraints:true, onDelete:'CASCADE'})
User.hasMany(Expense)
User.hasMany(ResetPassword)
User.hasMany(downloadedfiles)

const expenseRouter=require('./routers/expenseRoter.js')
const signupRouter=require('./routers/signupRouter')
const premiumRouter=require('./routers/premiumRouter')
const ResetPasswordRouter=require('./routers/resetPassword')
const DownloadFilesRouter=require('./routers/downloadfiles')
app.use('/expense',expenseRouter)
app.use('/user',signupRouter)
app.use('/premium',premiumRouter)
app.use('/resetPassword',ResetPasswordRouter)
app.use('/files',DownloadFilesRouter)

const accessLogStream=fs.createWriteStream(
  path.join(__dirname,'access.log'),
  {flags:'a'}
)
// const privateKey=fs.readFileSync('server.key')
// const certificate=fs.readFileSync('server.cert')
app.use(helmet())
app.use(compression()) 
app.use(morgan('combined',{stream:accessLogStream}))



sequelize.sync()
// sequelize.sync({force:true})
.then((res)=>{
  // https.createServer({key:privateKey,cert:certificate},app).listen(process.env.PORT || 3000)
  app.listen(process.env.PORT || 3000)
   })


