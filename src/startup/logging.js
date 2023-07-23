const winston = require("winston");
require("express-async-errors");
const { Sequelize } = require("sequelize");

module.exports = function () {
  winston.createLogger({
    transports: [
      new winston.transports.Console(), // Output logs to console
      new winston.transports.Console({ colorize: true, prettyPrint: true }),
      new winston.transports.File({ filename: "uncaughtExceptions.log" }),
      new winston.transports.File({ filename: "logfile.log" }),
    ],
  });

  process.on("unhandledRejection", (ex) => {
    throw ex;
  });

  const sequelize = new Sequelize({
    dialect: "postgres", // Specify the database dialect (e.g., 'mysql', 'postgres', 'sqlite')
    host: "localhost", // Database host
    port: 5432, // Database port
    username: "postgres", // Database username
    password: "postgres", // Database password
    database: "postgres", // Database name

    benchmark: true, // Enable benchmarking of SQL queries
    define: {
      timestamps: true, // Include timestamp columns (createdAt, updatedAt) in the models
      underscored: false, // Use underscored naming convention for columns (e.g., created_at, updated_at)
      freezeTableName: false, // Do not pluralize table names
    },
    pool: {
      max: 10, // Maximum number of connection instances in the pool
      min: 0, // Minimum number of connection instances in the pool
      acquire: 30000, // Maximum time (in milliseconds) that a connection can be idle before being released
      idle: 10000, // Maximum time (in milliseconds) that a connection can be idle before being closed
    },
    logging: (msg) => {
      logger.info(`[Sequelize]: ${msg}`); // Log Sequelize messages with database info
    },
  });
};
