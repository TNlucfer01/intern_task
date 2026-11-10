const sequelize = require("../config/db");

const userSchema = sequelize.define("users", {
  id: {
    type: sequelize.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    
  },
  name: {
    type: sequelize.Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: sequelize.Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: sequelize.Sequelize.STRING,
    allowNull: false,
  },
  role: {
    type: sequelize.Sequelize.STRING,
    allowNull: false,
    defaultValue: "EMPLOYEE",
  },
  title: {
    type: sequelize.Sequelize.STRING,
    allowNull: true,
  },
  assigned_department: {
    type: sequelize.Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: "depts",
      key: "id",
    },
  },
  createdAt: { 
    type: sequelize.Sequelize.DATE,
    allowNull: false,
    defaultValue: sequelize.Sequelize.NOW,
  },
  updatedAt: {
    type: sequelize.Sequelize.DATE,
    allowNull: false,
    defaultValue: sequelize.Sequelize.NOW,
  },
});


module.exports = userSchema;
