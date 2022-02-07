var Sequelize = require('sequelize');
var connection = require('./connection.js');
var exports = module.exports = {};

var KeyboardMerchant = connection.sequelize.define('keyboard_merchant',
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
        inn_edrpou: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        type: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        iban: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        bank: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        user_id: {
            type: Sequelize.INTEGER,
            defaultValue: null
        },
        unique_id: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        trade_point_name: {
            type: Sequelize.STRING,
            defaultValue: null
        }
    }, {
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

exports.KeyboardMerchant = KeyboardMerchant;