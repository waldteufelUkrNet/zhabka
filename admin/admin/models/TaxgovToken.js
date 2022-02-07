var Sequelize = require('sequelize');
var connection = require('./connection.js');
var exports = module.exports = {};

var TaxgovToken = connection.sequelize.define('taxgov_tokens',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        token: {
            type: Sequelize.STRING
        },
        expiration: {
            type: Sequelize.DATE
        },
        available: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }
    }, {
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

exports.TaxgovToken = TaxgovToken;
