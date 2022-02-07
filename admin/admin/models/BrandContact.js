var Sequelize = require('sequelize');
var connection = require('./connection.js');
var exports = module.exports = {};

var BrandContact = connection.sequelize.define('brand_contacts',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        phone: {
            type: Sequelize.STRING,
            defaultValue:null
        },
        type: {
            type: Sequelize.STRING,
            defaultValue:null
        },
        title: {
            type: Sequelize.STRING,
            defaultValue:null
        },
        lat: {
            type: Sequelize.DECIMAL(20,10),
            defaultValue:null
        },
        lon: {
            type: Sequelize.DECIMAL(20,10),
            defaultValue:null
        },
        brand_id: {
            type: Sequelize.INTEGER,
            defaultValue: null
        }


    }, {
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

exports.BrandContact = BrandContact;
