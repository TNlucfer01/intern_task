const sequilize = require('../config/db');

const taskSchema=sequilize.define('task',{
    id:{
        type:sequilize.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title:{
        type:sequilize.Sequelize.STRING,
        allowNull: false
    },
    description:{
        type:sequilize.Sequelize.STRING,
        allowNull: true
    },
    assignedTo:{
        type:sequilize.Sequelize.INTEGER,
        allowNull: false,
        references:{
            model:'users',
            key:'id'
        }
    },
    completedAt:{
        type:sequilize.Sequelize.DATE,
        allowNull: true
    },
    timeTaken:{
        type:sequilize.Sequelize.INTEGER,
        allowNull: true
    },
    deadline:{
        type:sequilize.Sequelize.DATE,
        allowNull: true
    }  
    ,createdAt:{
        type:sequilize.Sequelize.DATE,
        allowNull: false,
        defaultValue: sequilize.Sequelize.NOW
    },
    createdBy:{
        type:sequilize.Sequelize.INTEGER,
        allowNull: false,
        references:{
            model:'users',
            key:'id'
        }
    }
    ,associatedProject:{
        type:sequilize.Sequelize.INTEGER,
        allowNull: false,
        references:{
            model:'projects',
            key:'id'
        }},
        assignedby:{
            type:sequilize.Sequelize.INTEGER,
            allowNull: false,
            references:{
                model:'users',
                key:'id'
            }
    }
});
module.exports=taskSchema;