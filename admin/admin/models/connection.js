var config = require("./config");
//var initdb = require("./init");
var db = config.database;
var Sequelize = require('sequelize');
const cluster = require('cluster');
var exports = module.exports = {};

var sequelize = new Sequelize(db.database, db.user, db.password, {
	logging: false,
    host: db.host,
    dialect: 'mysql',

    // logging: false,
    // dialect: 'postgres',
    pool: {
        max: 500,
        min: 0,
        idle: 200000,
        acquire: 200000
    },

    define: {
        timestamps: false // true by default
    }
});

if (cluster.isMaster) {
   // initdb.initDB();
}

exports.sequelize = sequelize;