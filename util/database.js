const Sequelize=require('sequelize')
require('dotenv').config()

const sequelize=new Sequelize(process.env.DB_TABLE_NAME,process.env.DB_USER,process.env.DB_PASSWORD,{
    dialect:'mysql',
   
})

module.exports=sequelize