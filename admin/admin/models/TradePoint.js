var Sequelize = require('sequelize');
var connection = require('./connection.js');
var exports = module.exports = {};

var TradePoint = connection.sequelize.define('trade_points',
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
        tmp_address: {
            type: Sequelize.STRING,
            defaultValue:null
        },
        city: {
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
        region: {
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
        _merchant_id: {
            type: Sequelize.INTEGER,
            defaultValue: null
        },
        _brand_id: {
            type: Sequelize.INTEGER,
            defaultValue: null
        },
        _place_id: {
            type: Sequelize.INTEGER,
            defaultValue: null
        },
        _city_id: {
            type: Sequelize.INTEGER,
            defaultValue: null
        },
        place_id: {
            type: Sequelize.STRING,
            defaultValue:null
        },
        tmp_graphic: {
            type: Sequelize.STRING,
            defaultValue:null
        },
        source: {
            type: Sequelize.STRING,
            defaultValue:null
        },
        tmp_id: {
            type: Sequelize.INTEGER,
            defaultValue:null
        },
        set_geo: {
            type: Sequelize.INTEGER,
            defaultValue:0
        },
        parsed: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        ya_lat: {
            type: Sequelize.DECIMAL(20,10),
            defaultValue:null
        },
        ya_lon: {
            type: Sequelize.DECIMAL(20,10),
            defaultValue:null
        },
        ya_place_id: {
            type: Sequelize.STRING,
            defaultValue:null
        },
        ya_set_geo: {
            type: Sequelize.INTEGER,
            defaultValue:0
        },
        mj: {
            type: Sequelize.INTEGER,
            defaultValue: null
        },
        gps_array: {
            type: Sequelize.TEXT,
            defaultValue: null
        }
    }, {
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

exports.TradePoint = TradePoint;
