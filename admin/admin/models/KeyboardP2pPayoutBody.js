var Sequelize = require('sequelize');
var connection = require('./connection.js');
var exports = module.exports = {};

var KeyboardP2pPayoutBody = connection.sequelize.define('keyboard_p2p_payout_body',
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
        user_id: {
            type: Sequelize.INTEGER,
            defaultValue: null
        },
        sender_phone: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        link: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        receipt: {
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
        merchant_virtual_card: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        card_text: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        card_id: {
            type: Sequelize.INTEGER,
            defaultValue: null
        },
        recieved_by_phone: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        recieved_by_email: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        recieved_by_name: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        recieved_by_system: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        sent_by_type: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        recieved_by_type: {
            type: Sequelize.STRING,
            defaultValue: null
        },

        a2c_status:{
            type: Sequelize.INTEGER,
            defaultValue: null
        },
        a2c_result:{
            type: Sequelize.TEXT,
            defaultValue: null
        },
        c2a_status:{
            type: Sequelize.INTEGER,
            defaultValue: null
        },
        c2a_result:{
            type: Sequelize.TEXT,
            defaultValue: null
        },
        payment_body: {
            type: Sequelize.STRING,
            defaultValue: null
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

        ipay_ident: {
            type: Sequelize.STRING,
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
        blocked: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        sent_last_push: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    }, {
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

exports.KeyboardP2pPayoutBody = KeyboardP2pPayoutBody;