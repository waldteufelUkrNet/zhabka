var Sequelize = require('sequelize');
var connection = require('./connection.js');
var exports = module.exports = {};

var TSCity = connection.sequelize.define('time_shopping_cities',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        city_id: {
            type: Sequelize.STRING
        },
        city_name: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        lat: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        lon: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        original_region: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        original_region_id: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        original_city: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        original_city_id: {
            type: Sequelize.STRING,
            defaultValue: null
        },

    }, {
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

exports.TSCity = TSCity;
