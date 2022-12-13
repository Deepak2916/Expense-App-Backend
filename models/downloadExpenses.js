const Sequelize = require('sequelize')
const sequelize=require('../util/database')

const downloadExpenses= sequelize.define('downlodedfiles',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true

    },
    fileUrl:{
        type:Sequelize.TEXT
    }

})


module.exports=downloadExpenses