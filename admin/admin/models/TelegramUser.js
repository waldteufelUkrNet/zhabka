var Sequelize = require('sequelize');
var connection = require('./connection.js');
var exports = module.exports = {};

var TelegramUser = connection.sequelize.define('telegram_users',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        first_name: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        username: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        chat_id: {
            type: Sequelize.TEXT,
            defaultValue: null
        },
        user_id: {
            type: Sequelize.INTEGER,
            defaultValue: null
        },
        phone: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        source: {
            type: Sequelize.STRING,
            defaultValue: 'telegram'
        },
        step: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        digital_message_id:{
            type: Sequelize.INTEGER,
            defaultValue: null
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

exports.TelegramUser = TelegramUser;