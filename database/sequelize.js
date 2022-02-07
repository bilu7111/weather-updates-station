const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, '', {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: "mysql",
    operatorsAliases: false,
    pool: {
      max: 2,
      min: 0,
      acquire: 120000, 
      idle: 120000,
      evict: 120000
    },
    dialectOptions: {
        connectTimeout: 60000
      }
});
sequelize.sync();
module.exports = sequelize;

