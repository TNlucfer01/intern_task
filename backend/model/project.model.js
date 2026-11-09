const sequilize = require("../config/db");

const projectSchema = sequilize.define("project", {
  id: {
    type: sequilize.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: sequilize.Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: sequilize.Sequelize.STRING,
    allowNull: false,
  },
  createdAt: {
    type: sequilize.Sequelize.DATE,
    allowNull: false,
    defaultValue: sequilize.Sequelize.NOW,
  },
  createdBy: {
    type: sequilize.Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  completedAt: {
    type: sequilize.Sequelize.DATE,
    allowNull: true,
  },
  status: {
    type: sequilize.Sequelize.STRING,
    allowNull: false,
  },
  deadline: {
    type: sequilize.Sequelize.DATE,
    allowNull: true,
  },
  updatedAt: {
    type: sequilize.Sequelize.DATE,
    allowNull: false,
    defaultValue: sequilize.Sequelize.NOW,
  },
});

module.exports = projectSchema;
