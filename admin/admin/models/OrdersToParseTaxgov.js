var Sequelize = require('sequelize');
var connection = require('./connection.js');
var exports = module.exports = {};

var OrdersToParseTaxgov = connection.sequelize.define('orders_to_parse_taxgov',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        check_id: {
            type: Sequelize.STRING,
            defaultValue:null
        },
        timestampp: {
            type: Sequelize.INTEGER,
            defaultValue:null
        },
        requested_count: {
            type: Sequelize.INTEGER,
            defaultValue: null
        },
        telegram_message_id: {
            type: Sequelize.INTEGER,
            defaultValue: null
        },
        telegram_chat_id: {
            type: Sequelize.INTEGER,
            defaultValue: null
        }
    }, {
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

exports.OrdersToParseTaxgov = OrdersToParseTaxgov;
