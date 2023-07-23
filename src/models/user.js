const { DataTypes, Model, Sequelize } = require("sequelize");
const Joi = require("joi");

const sequelize = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  port: "5432",
  username: "postgres",
  password: "postgres",
  database: "postgres",
});

class User extends Model {
  async generateAuthToken() {
    const token = jwt.sign(
      {
        id: this.id,
        name: this.name,
        email: this.email,
        isAdmin: this.isAdmin,
      },
      config.get("jwtPrivateKey")
    );
    return token;
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 50],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [5, 255],
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5, 255],
      },
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
  }
);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(255).required(),
    isAdmin: Joi.boolean(),
  });

  return schema.validate(user);
}

module.exports = {
  User,
  validateUser,
};
