var Sequelize = require('sequelize');
var connection = require('./connection.js');
var exports = module.exports = {};

var PlaceWorkTime = connection.sequelize.define('place_work_time',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        day: {
            type: Sequelize.STRING,
            defaultValue:null
        },
        from: {
            type: Sequelize.STRING,
            defaultValue:null
        },
        lunch: {
            type: Sequelize.STRING,
            defaultValue:null
        },
        to: {
            type: Sequelize.STRING,
            defaultValue:null
        },
        _place_id: {
            type: Sequelize.INTEGER,
            defaultValue:null
        }
    }, {
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

exports.PlaceWorkTime = PlaceWorkTime;
