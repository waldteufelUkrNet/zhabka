var Sequelize = require('sequelize');
var connection = require('./connection.js');
var exports = module.exports = {};

var Merchant = connection.sequelize.define('merchants',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        edrpou: {
            type: Sequelize.STRING,
            defaultValue:null
        },
        inn: {
            type: Sequelize.STRING,
            defaultValue:null
        },
        fullName: {
            type: Sequelize.STRING,
            defaultValue:null
        },
        shortName: {
            type: Sequelize.STRING,
            defaultValue:null
        },
        legalAddress: {
            type: Sequelize.STRING,
            defaultValue:null
        },
        activityType: {
            type: Sequelize.STRING,
            defaultValue:null
        },
        director: {
            type: Sequelize.STRING,
            defaultValue:null
        },
        ndsNumber: {
            type: Sequelize.STRING,
            defaultValue:null
        },
        registerDate: {
            type: Sequelize.STRING,
            defaultValue:null
        },
        url: {
            type: Sequelize.STRING,
            defaultValue:null
        },
        _brand_id: {
            type: Sequelize.INTEGER,
            defaultValue: null
        },
        _dopomoga_brand_id: {
            type: Sequelize.INTEGER,
            defaultValue: null
        },
        source: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        nameFromDopomoga: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        _activity_type_id: {
            type: Sequelize.INTEGER,
            defaultValue: null
        },
        type: {
            type: Sequelize.STRING,
            defaultValue:"TOV"
        },
        parsed: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        }
    }, {
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

exports.Merchant = Merchant;
