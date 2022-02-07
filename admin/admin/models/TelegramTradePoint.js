var Sequelize = require('sequelize');
var connection = require('./connection.js');
var exports = module.exports = {};

var TelegramTradePoint = connection.sequelize.define('telegram_trade_point',
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
        address: {
            type: Sequelize.STRING,
            defaultValue: ''
        },
        lon: {
            type: Sequelize.DECIMAL(20,10),
            defaultValue: null
        },
        lat: {
            type: Sequelize.DECIMAL(20,10),
            defaultValue: null
        },
        merchant_id: {
            type: Sequelize.INTEGER,
            defaultValue: null
        },
        phone: {
            type: Sequelize.STRING,
            defaultValue: ''
        },
        facebook: {
            type: Sequelize.STRING,
            defaultValue: ''
        },
        instagram: {
            type: Sequelize.STRING,
            defaultValue: ''
        },
        url: {
            type: Sequelize.STRING,
            defaultValue: ''
        },
        place_id: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        logo: {
            type: Sequelize.STRING,
            defaultValue: ''
        },
        improve_qr: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        }
    }, {
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

exports.TelegramTradePoint = TelegramTradePoint;