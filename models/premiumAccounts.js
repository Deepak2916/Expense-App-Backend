const Sequelize = require('sequelize')
const sequelize=require('../util/database')

const User= sequelize.define('premiumAccounts',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true

    }
})

module.exports=User