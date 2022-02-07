var Sequelize = require('sequelize');
var connection = require('./connection.js');
var exports = module.exports = {};

var CityTranslate = connection.sequelize.define('city_translate',
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
        city_id: {
            type: Sequelize.INTEGER,
            defaultValue: null
        },
        skip: {
            type: Sequelize.BOOLEAN,
            defaultValue: null
        }
    }, {
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

exports.CityTranslate = CityTranslate;