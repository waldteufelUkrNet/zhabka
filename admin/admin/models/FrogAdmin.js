var Sequelize = require('sequelize');
var connection = require('./connection.js');
var exports = module.exports = {};

var FrogAdmin = connection.sequelize.define('frog_admins',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: Sequelize.STRING,
            defaultValue:null
        },
        password: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        role: {
            type: Sequelize.STRING,
            defaultValue: null
        }
    }, {
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

exports.FrogAdmin = FrogAdmin;
