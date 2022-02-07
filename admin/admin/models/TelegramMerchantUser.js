var Sequelize = require('sequelize');
var connection = require('./connection.js');
var exports = module.exports = {};

var TelegramMerchantUser = connection.sequelize.define('telegram_merchant_users',
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
        chat_id: {
            type: Sequelize.INTEGER,
            defaulValue: null
        },
        phone: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        
        donate: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        telegram_merchant_id: {
            type: Sequelize.INTEGER,
            defaultValue: null
        },
        digital_message_id:{
            type: Sequelize.INTEGER,
            defaultValue: null
        },
        salt: {
            type: Sequelize.STRING,
            defaultValue: ''
        },
        created_at: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        }
    }, {
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

exports.TelegramMerchantUser = TelegramMerchantUser;