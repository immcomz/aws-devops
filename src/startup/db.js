const winston = require("winston");
const { Sequelize } = require("sequelize");
const config = require("config");

module.exports = function () {
  const dbConfig = config.get("db"); // Assuming you have the database configuration in your config file

  const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
      host: dbConfig.host,
      port: dbConfig.port,
      dialect: "postgres",
    }
  );

  sequelize
    .authenticate()
    .then(() => {
      winston.info(`Connected to PostgreSQL database: ${dbConfig.database}`);
    })
    .catch((error) => {
      winston.error("Failed to connect to the database:", error);
    });
};
