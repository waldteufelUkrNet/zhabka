var Sequelize = require('sequelize');
var connection = require('./connection.js');
var exports = module.exports = {};

var XmlMerchants = connection.sequelize.define('xml_merchants',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        full_name: {
            type: Sequelize.STRING
        },
        short_name: {
            type: Sequelize.STRING
        },
        edrpou: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        },
        kved: {
            type: Sequelize.STRING
        },
        boss: {
            type: Sequelize.STRING
        }
    }, {
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

exports.XmlMerchants = XmlMerchants;
