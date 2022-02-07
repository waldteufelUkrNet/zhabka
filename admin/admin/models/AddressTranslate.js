var Sequelize = require('sequelize');
var connection = require('./connection.js');
var exports = module.exports = {};

var AddressTranslate = connection.sequelize.define('address_translate',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        input_name: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        output_name: {
            type: Sequelize.STRING,
            defaultValue: ''
        },
        place_id: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        lat: {
            type: Sequelize.DECIMAL(20,10),
            defaultValue:null
        },
        lon: {
            type: Sequelize.DECIMAL(20,10),
            defaultValue:null
        },
        city_id: {
            type: Sequelize.INTEGER,
            defaultValue: null
        }
    }, {
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

exports.AddressTranslate = AddressTranslate;