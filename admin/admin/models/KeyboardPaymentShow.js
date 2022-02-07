var Sequelize = require('sequelize');
var connection = require('./connection.js');
var exports = module.exports = {};

var KeyboardPaymentShow = connection.sequelize.define('keyboard_payment_show',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        payment_type: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        payment_id: {
            type: Sequelize.INTEGER,
            defaultValue: false
        },
        ip: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        agent: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        os: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: null
        }
    }, {
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

exports.KeyboardPaymentShow = KeyboardPaymentShow;