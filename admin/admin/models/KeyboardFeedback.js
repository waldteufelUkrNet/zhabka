var Sequelize = require('sequelize');
var connection = require('./connection.js');
var exports = module.exports = {};

var KeyboardFeedback = connection.sequelize.define('keyboard_feedback',
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
        text: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        response: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        removed: {
            type: Sequelize.TINYINT,
            defaultValue: 0
        },
        created_at:{
            type: Sequelize.STRING,
            defaultValue: null
        }
    }, {
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

exports.KeyboardFeedback = KeyboardFeedback;