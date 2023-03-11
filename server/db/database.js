require("dotenv").config();
const chalk = require("chalk");
const Sequelize = require("sequelize");
const dbUrl = process.env.DATABASE_URL;

console.log(chalk.yellow("Opening database connection..."));

const db = new Sequelize(dbUrl, {
  logging: false,
});

module.exports = db;
