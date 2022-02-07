var Sequelize = require('sequelize');
var connection = require('./connection.js');
var exports = module.exports = {};

var TelegramUserHistory = connection.sequelize.define('telegram_user_history',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        trade_point_id: {
            type: Sequelize.INTEGER,
            defaultValue: null
        },
        user_id: {
            type: Sequelize.INTEGER,
            defaultValue: null
        },
        date: {
            type: Sequelize.INTEGER,
            defaultValue: null
        }
    }, {
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

exports.TelegramUserHistory = TelegramUserHistory;