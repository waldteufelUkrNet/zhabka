var Sequelize = require('sequelize');
var connection = require('./connection.js');
var exports = module.exports = {};

var BotHelp = connection.sequelize.define('bot_help',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        },
        parent: {
            type: Sequelize.INTEGER,
            defaultValue: null
        },
        text: {
            type: Sequelize.TEXT,
            defaultValue: null
        },
        type: {
            type: Sequelize.TEXT,
            defaultValue: 'user'
        }
    }, {
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

exports.BotHelp = BotHelp;
