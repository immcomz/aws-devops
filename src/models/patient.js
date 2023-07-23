const { DataTypes, Model, Sequelize } = require("sequelize");
const config = require("config");
const dbConfig = config.get("db");
const winston = require("winston");

class Patient extends Model {}

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

Patient.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,

    modelName: "Patient",
    tableName: "patients",
  }
);

module.exports = Patient;
