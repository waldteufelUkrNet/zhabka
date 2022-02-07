var Sequelize = require('sequelize');
var connection = require('./connection.js');
var exports = module.exports = {};

var Place = connection.sequelize.define('places',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        address: {
            type: Sequelize.STRING,
            defaultValue:null
        },
        name: {
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
        },

        lat: {
            type: Sequelize.DECIMAL(20,10),
            defaultValue:null
        },
        lon: {
            type: Sequelize.DECIMAL(20,10),
            defaultValue:null
        },
        _city_id: {
            type: Sequelize.INTEGER,
            defaultValue: null
        },
        url: {
            type: Sequelize.STRING,
            defaultValue:null
        },
        facebook: {
            type: Sequelize.STRING,
            defaultValue:null
        },
        instagram: {
            type: Sequelize.STRING,
            defaultValue:null
        },
        tmp_tt_count: {
            type: Sequelize.INTEGER,
            defaultValue:0
        }


    }, {
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

exports.Place = Place;
