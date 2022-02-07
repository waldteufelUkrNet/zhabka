var Sequelize = require('sequelize');
var connection = require('./connection.js');
var exports = module.exports = {};

var KeyboardPaymentBody = connection.sequelize.define('keyboard_payment_body',
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
        merchant_id: {
            type: Sequelize.INTEGER,
            defaultValue: null
        },
        user_id: {
            type: Sequelize.INTEGER,
            defaultValue: null
        },
        link: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        tmp_link: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        redirect_link: {
            type: Sequelize.STRING,
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
        },
        unique_id: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        removed: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        sent_last_push: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },

        payed_by_phone: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        payed_by_email: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        receipt: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        payed_by_name: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        payed_by_type: {
            type: Sequelize.STRING,
            defaultValue: null
        }
    }, {
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

exports.KeyboardPaymentBody = KeyboardPaymentBody;