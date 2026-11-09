const sequlize=require('../config/db');

const deptSchema=sequlize.define('dept',{
    id:{
        type:sequlize.Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:sequlize.Sequelize.STRING,
        allowNull:false
    },
    description:{
        type:sequlize.Sequelize.STRING,
        allowNull:false
    }
});

module.exports=deptSchema;
