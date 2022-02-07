var Sequelize = require('sequelize');
var connection = require('./connection.js');
var exports = module.exports = {};

var BotStatistics = connection.sequelize.define('bot_statistics',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        platform: {
            type: Sequelize.ENUM,
            values: ['telegram', 'viber']
        },
        user_type: {
            type: Sequelize.ENUM,
            values: ['client', 'merchant']
        },
        user_id: {
            type: Sequelize.INTEGER
        },
        action_type: {
            type: Sequelize.ENUM,
            values: ['tips', 'feedback']
        },
        check_id: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        created_at: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        }
    }, {
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

exports.BotStatistics = BotStatistics;
