var Sequelize = require('sequelize');
var connection = require('./connection.js');
var exports = module.exports = {};

var City = connection.sequelize.define('cities',
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
        region_id: {
            type: Sequelize.INTEGER,
            defaultValue: null
        },
        place_id: {
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
        }


    }, {
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

exports.City = City;
