const Sequelize = require('sequelize')
const sequelize=require('../util/database')

const User= sequelize.define('resetPassword',{
    id:{
        type:Sequelize.STRING,
        allowNull:false,
        primaryKey:true

    },
    isActive:{
        type:Sequelize.BOOLEAN,
    }
})

module.exports=User