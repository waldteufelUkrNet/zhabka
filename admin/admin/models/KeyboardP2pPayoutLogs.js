var Sequelize = require('sequelize');
var connection = require('./connection.js');
var exports = module.exports = {};

var KeyboardP2pPayoutLogs = connection.sequelize.define('keyboard_p2p_payout_logs',
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
        },
        created_at: {
            type: Sequelize.DATE
        }
    }, {
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

exports.KeyboardP2pPayoutLogs = KeyboardP2pPayoutLogs;