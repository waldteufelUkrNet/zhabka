var Sequelize = require('sequelize');
var connection = require('./connection.js');
var exports = module.exports = {};

var TelegramClient = connection.sequelize.define('telegram_client',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        phone_number: {
            type: Sequelize.STRING,
            defaultValue:null
        },
        api_id: {
            type: Sequelize.INTEGER,
            defaultValue: null
        },
        status: {
            type: Sequelize.STRING,
            defaultValue: 'idle'
        },
        wait_time: {
            type: Sequelize.DATE,
            defaultValue: null
        },
        activated: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        last_work_time: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        }
    }, {
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

exports.TelegramClient = TelegramClient;
