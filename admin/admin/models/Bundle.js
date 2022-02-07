var Sequelize = require('sequelize');
var connection = require('./connection.js');
var exports = module.exports = {};

var Bundle = connection.sequelize.define('bundles',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        processing_code: {
            type: Sequelize.STRING,
            defaultValue:null
        },
        terminal_id: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        merchant_id: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        _merchant_id: {
            type: Sequelize.INTEGER,
            defaultValue: null
        },
        _trade_point_id: {
            type: Sequelize.INTEGER,
            defaultValue: null
        },
        _bank_id: {
            type: Sequelize.INTEGER,
            defaultValue: null
        },
        _processing_id: {
            type: Sequelize.INTEGER,
            defaultValue: null
        }
    }, {
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

exports.Bundle = Bundle;
