const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const WeatherUpdate = sequelize.define("weather_update",{
      id: {
          type: DataTypes.STRING,
          allowNull: false,
          primaryKey: true
        },
      main: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      icon: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, { updatedAt: false, createdAt: true, initialAutoIncrement: false });

module.exports = WeatherUpdate;