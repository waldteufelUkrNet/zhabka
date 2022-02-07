var Sequelize = require('sequelize');
var connection = require('./connection.js');
var exports = module.exports = {};

var TSTp = connection.sequelize.define('time_shopping_tp',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        lat: {
            type: Sequelize.STRING
        },
        lon: {
            type: Sequelize.STRING
        },
        logo: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.STRING
        },
        graphic: {
            type: Sequelize.STRING
        },
        look_more: {
            type: Sequelize.STRING
        },
        _city_id: {
            type: Sequelize.INTEGER,
            defaultValue: null
        },
        status: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        }

    }, {
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

exports.TSTp = TSTp;
