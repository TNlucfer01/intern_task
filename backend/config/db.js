const { Sequelize } = require('sequelize');

 const sequelize = new Sequelize({                                                                           
      dialect: 'sqlite',                                                                                        
      storage: 'database.sqlite', // Saves to a file, survives restarts!                                        
      logging: false,                                                                                           
    }); 

module.exports = sequelize;
