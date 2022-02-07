var Sequelize = require('sequelize');
var connection = require('./connection.js');
var exports = module.exports = {};

var BotSupport = connection.sequelize.define('bot_support',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        phone: {
            type: Sequelize.STRING
        },
        url: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        type: {
            type: Sequelize.STRING,
            defaultValue: 'telegram'
        },
        role: {
            type: Sequelize.STRING,
            defaultValue: 'client'
        }
    }, {
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

exports.BotSupport = BotSupport;
