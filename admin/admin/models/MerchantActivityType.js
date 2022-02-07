var Sequelize = require('sequelize');
var connection = require('./connection.js');
var exports = module.exports = {};

var MerchantActivityType = connection.sequelize.define('merchant_activity_types',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        _merchant_id: {
            type: Sequelize.INTEGER
        },
        _activity_type_id: {
            type: Sequelize.INTEGER
        }
    }, {
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

exports.MerchantActivityType = MerchantActivityType;
