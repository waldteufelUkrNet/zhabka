var Sequelize = require('sequelize');
var connection = require('./connection.js');
var exports = module.exports = {};

var KeyboardVersion = connection.sequelize.define('keyboard_versions',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        os: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        version: {
            type: Sequelize.STRING,
            defaultValue: null
        }
    }, {
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

exports.KeyboardVersion = KeyboardVersion;