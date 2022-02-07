var Sequelize = require('sequelize');
var connection = require('./connection.js');
var exports = module.exports = {};

var PlacePhoto = connection.sequelize.define('place_phones',
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
        title: {
            type: Sequelize.STRING,
            defaultValue:null
        },
        _place_id: {
            type: Sequelize.INTEGER,
            defaultValue: null
        }


    }, {
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

exports.PlacePhoto = PlacePhoto;
