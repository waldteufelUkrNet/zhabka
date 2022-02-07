var Sequelize = require('sequelize');
var connection = require('./connection.js');
var exports = module.exports = {};

var TelegramTransaction = connection.sequelize.define('telegram_transactions',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        ident: {
            type: Sequelize.STRING,
            defaultValue: ''
        },
        telegram_merchant_id: {
            type: Sequelize.INTEGER,
            defaultValue: ''
        },
        amount: {
            type: Sequelize.INTEGER,
            defaulValue: null
        },
        sms_amount: {
          type: Sequelize.INTEGER,
          defaulValue: null
        },
        date: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    }, {
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

exports.TelegramTransaction = TelegramTransaction;