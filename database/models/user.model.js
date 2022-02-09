const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const User = sequelize.define("system_user",{
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
      },
    apiKey: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
    }, { updatedAt: false, createdAt: true, initialAutoIncrement: false });

module.exports = User;