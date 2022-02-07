var Sequelize = require('sequelize');
var connection = require('./connection.js');
var exports = module.exports = {};

var FiscalNumber = connection.sequelize.define('fiscal_numbers',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        number: {
            type: Sequelize.STRING,
            defaultValue:null
        },
        _trade_point_id: {
            type: Sequelize.INTEGER,
            defaultValue: null
        },
        activityType: {
            type: Sequelize.STRING,
            defaultValue: null
        }


    }, {
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

exports.FiscalNumber = FiscalNumber;
