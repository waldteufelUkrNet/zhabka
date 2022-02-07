var Sequelize = require('sequelize');
var connection = require('./connection.js');
var exports = module.exports = {};

var TaxgovRequest = connection.sequelize.define('taxgov_requests',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        token: {
            type: Sequelize.STRING
        },
        date: {
            type: Sequelize.DATE
        },
        check: {
            type: Sequelize.STRING
        }
    }, {
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

exports.TaxgovRequest = TaxgovRequest;
