var Sequelize = require('sequelize');
var connection = require('./connection.js');
var exports = module.exports = {};

var TelegramDonatsMerchant = connection.sequelize.define('telegram_donats_merchants',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        
        name: {
            type: Sequelize.STRING,
            defaultValue: ''
        },
        first_name: {
            type: Sequelize.STRING,
            defaultValue: ''
        },
        username: {
            type: Sequelize.STRING,
            defaultValue: ''
        },
        user_id: {
            type: Sequelize.INTEGER,
            defaulValue: null
        },
        chat_id: {
            type: Sequelize.INTEGER,
            defaulValue: null
        },
        phone: {
            type: Sequelize.STRING,
            defaultValue: null
        }
    }, {
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

exports.TelegramDonatsMerchant = TelegramDonatsMerchant;