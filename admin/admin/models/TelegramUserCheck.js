var Sequelize = require('sequelize');
var connection = require('./connection.js');
var exports = module.exports = {};
const moment = require('moment');

var TelegramUserCheck = connection.sequelize.define('telegram_user_check',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        datetime: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
            get: function () {
                let time = this.getDataValue('datetime');

                if (time) {
                    return moment(time).format("YYYY-MM-DD HH:mm:ss");
                } else {
                    return time;
                }
            }
        },
        link: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        phone: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        merchant_phone: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        is_fiscal: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        },
        is_bill: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    }, {
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

exports.TelegramUserCheck = TelegramUserCheck;