const { Sequelize } = require('sequelize')


const dbConfig = {
  HOST: "usuarios-db-clusterip-srv",
  USER: "usuarios",
  PASSWORD: "usuarios",
  DB: "usuarios",
  dialect: "postgres",
  port: 5432,
  pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
  }
}


const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: dbConfig.port || 5432,

  pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
  }
});

// console.log(sequelize)

module.exports = sequelize