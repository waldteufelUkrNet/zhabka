var Sequelize = require('sequelize');
var connection = require('./connection.js');
var exports = module.exports = {};
//payment_id, request_url,  request_data, response_data, status, merchant_id, action
var KeyboardP2pPaymentLogs = connection.sequelize.define('keyboard_p2p_payment_logs',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        payment_id: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        request_url: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        request_data: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        response_data: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        status: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        merchant_id: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        action: {
            type: Sequelize.STRING,
            defaultValue: null
        }
    }, {
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

exports.KeyboardP2pPaymentLogs = KeyboardP2pPaymentLogs;