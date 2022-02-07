var Sequelize = require('sequelize');
var connection = require('./connection.js');
var exports = module.exports = {};

var KeyboardUser = connection.sequelize.define('keyboard_users',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        phone: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        code: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        password: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        os: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        push_token: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        is_blocked: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    }, {
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

exports.KeyboardUser = KeyboardUser;