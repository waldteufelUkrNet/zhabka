var Sequelize = require('sequelize');
var connection = require('./connection.js');
var exports = module.exports = {};

var TelegramPaymentBody = connection.sequelize.define('telegram_merchant_users_payment_body',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        unique_id: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        telegram_merchant_id: {
            type: Sequelize.INTEGER,
            defaultValue: null
        },
        sender_phone: {
            type: Sequelize.INTEGER,
            defaultValue: null
        },
        payment_body: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        reciever_phone: {
            type: Sequelize.STRING,
            defaulValue: null
        },
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        sentAt: {
            type: Sequelize.DATE,
            defaultValue: null
        },
        payedAt: {
            type: Sequelize.DATE,
            defaultValue: null
        },
        payment_status:{
            type: Sequelize.INTEGER,
            defaultValue: 1
        },
        ipay_pid:{
            type: Sequelize.INTEGER,
            defaultValue: null
        },
        source: {
            type: Sequelize.STRING,
            defaultValue: 'telegram'
        },
        summ:{
            type: Sequelize.INTEGER,
            defaultValue: null
        },

        reciever_delivery:{
            type: Sequelize.STRING,
            defaultValue: null
        },
        reciever_delivery_status:{
            type: Sequelize.STRING,
            defaultValue: null
        },
        
        ipay_ident: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        taxgov_check_id: {
            type: Sequelize.INTEGER,
            defaultValue: null
        }
    }, {
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

exports.TelegramPaymentBody = TelegramPaymentBody;