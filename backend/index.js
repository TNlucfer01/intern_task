require('dotenv').config();

const app = require('./app');
const sequelize = require('./config/db');
require('./model/dept.model');

async function startServer() {
  try {
    await sequelize.sync();
    app.listen(3001, () => {
      console.log('Server is running on port 3001');
    });
  } catch (error) {
    console.error('Failed to initialize the database:', error);
    process.exitCode = 1;
  }
}

startServer();