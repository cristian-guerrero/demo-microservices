const { Sequelize } = require('sequelize')



const dbConfig = {
  HOST: "prestamos-db-clusterip-srv",
  USER: "prestamos",
  PASSWORD: "prestamos",
  DB: "prestamos",
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

module .exports = sequelize