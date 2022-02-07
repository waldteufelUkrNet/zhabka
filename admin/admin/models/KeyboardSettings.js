var Sequelize = require('sequelize');
var connection = require('./connection.js');
var exports = module.exports = {};

var KeyboardSettings = connection.sequelize.define('keyboard_settings',
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
        value: {
            type: Sequelize.TEXT,
            defaultValue: null
        }
    }, {
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8mb4_general_ci'
    });

exports.KeyboardSettings = KeyboardSettings;