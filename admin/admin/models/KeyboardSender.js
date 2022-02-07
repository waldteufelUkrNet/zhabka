var Sequelize = require('sequelize');
var connection = require('./connection.js');
var exports = module.exports = {};

var KeyboardSender= connection.sequelize.define('keyboard_sender',
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
        user_id: {
            type: Sequelize.INTEGER,
            defaultValue: false
        },
        payment_id: {
            type: Sequelize.INTEGER,
            defaultValue: false
        },
        ip: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        name: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        phone: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        email: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        device: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        os_version: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        messanger: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        payment_text: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        device_udid: {
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

exports.KeyboardSender = KeyboardSender;