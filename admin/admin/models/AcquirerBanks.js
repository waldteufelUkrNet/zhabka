var Sequelize = require('sequelize');
var connection = require('./connection.js');
var exports = module.exports = {};

var AcquirerBank = connection.sequelize.define('acquirer_banks',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            defaultValue:null
        },
        url: {
            type: Sequelize.STRING,
            defaultValue:null
        },
        logo: {
            type: Sequelize.STRING,
            defaultValue:null
        },
        logo_square: {
            type: Sequelize.STRING,
            defaultValue:null
        }


    }, {
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

exports.AcquirerBank = AcquirerBank;
