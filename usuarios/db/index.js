const { Sequelize } = require('sequelize')


const dbConfig = {
  HOST: "localhost",
  USER: "",
  PASSWORD: "S1st3m4s1.",
  DB: "local_WihomTestingDB",
  //DB: "local_WihomProductionDB",
  dialect: "postgres",
  port: 6432,
  pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
  }
}


exports.sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
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