const express=require('express')

const body=require('body-parser')
const cors=require('cors')
require('dotenv').config()

const mongoose=require('mongoose')
// mongoose.set('strictQuery',true)

const app=express()

app.use(body.json())
app.use(cors())
 


const expenseRouter=require('./routers/expenseRoter.js')
const UserRouter=require('./routers/UserRouter')

app.use('/expense',expenseRouter)
app.use('/user',UserRouter)



mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.488zwfs.mongodb.net/shop?retryWrites=true&w=majority`)
.then(resutlt=>{
  app.listen(4000)
})
.catch(err=>{
  console.log('err:-',err)
})
