var Sequelize = require('sequelize');
var connection = require('./connection.js');
var exports = module.exports = {};

var ActivityType = connection.sequelize.define('activity_types',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        kved: {
            type: Sequelize.STRING,
            defaultValue:null
        },
        name: {
            type: Sequelize.STRING,
            defaultValue:null
        }
    }, {
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

exports.ActivityType = ActivityType;
