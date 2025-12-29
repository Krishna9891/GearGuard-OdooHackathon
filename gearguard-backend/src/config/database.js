const { Sequelize } = require('sequelize');
require('dotenv').config();

// Using SQLite - no installation or configuration needed!
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', // Database file will be created automatically
  logging: process.env.NODE_ENV === 'development' ? console.log : false
});

// Test connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  }
};

module.exports = { sequelize, testConnection };
