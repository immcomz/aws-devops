const { DataTypes, Model } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "postgres",
  host: "your_host",
  port: "your_port",
  username: "your_username",
  password: "your_password",
  database: "your_database",
});

class Patient extends Model {}

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
