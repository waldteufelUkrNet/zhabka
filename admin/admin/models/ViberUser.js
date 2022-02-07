var Sequelize = require('sequelize');
var connection = require('./connection.js');
var exports = module.exports = {};

var ViberUser = connection.sequelize.define('viber_users',
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
        avatar: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        chat_id: {
            type: Sequelize.INTEGER,
            defaultValue: null
        },
        phone: {
            type: Sequelize.STRING,
            defaultValue: null
        }
    }, {
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

exports.ViberUser = ViberUser;