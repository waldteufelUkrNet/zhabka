var Sequelize = require('sequelize');
var connection = require('./connection.js');
var exports = module.exports = {};

var BaseTerminals = connection.sequelize.define('terminals',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        ica: {
            type: Sequelize.STRING,
            defaultValue: ''
        },
        ica_name: {
            type: Sequelize.STRING,
            defaultValue: ''
        },
        merchant_category_name: {
            type: Sequelize.STRING,
            defaultValue: ''
        },
        mcc: {
            type: Sequelize.STRING,
            defaultValue: ''
        },
        merchant_class_name: {
            type: Sequelize.STRING,
            defaultValue: ''
        },
        merchant_group_name: {
            type: Sequelize.STRING,
            defaultValue: ''
        },
        terminal_id: {
            type: Sequelize.STRING,
            defaultValue: ''
        },
        merchant_id: {
            type: Sequelize.STRING,
            defaultValue: ''
        },
        city: {
            type: Sequelize.STRING,
            defaultValue: ''
        },
        name: {
            type: Sequelize.STRING,
            defaultValue: ''
        },
        address: {
            type: Sequelize.STRING,
            defaultValue: ''
        },
        ru_address: {
            type: Sequelize.STRING,
            defaultValue: ''
        },
        ru_google_place: {
            type: Sequelize.STRING,
            defaultValue: ''
        },
        ru_city: {
            type: Sequelize.STRING,
            defaultValue: ''
        },
        city_id: {
            type: Sequelize.INTEGER,
            defaultValue: null
        },
        place_id: {
            type: Sequelize.STRING,
            defaultValue: ''
        },
        found: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        lat: {
            type: Sequelize.DECIMAL(20,10),
            defaultValue:null
        },
        lon: {
            type: Sequelize.DECIMAL(20,10),
            defaultValue:null
        },
        skip: {
            type: Sequelize.BOOLEAN,
            defaultValue: 0
        },
        edrpou: {
            type: Sequelize.STRING,
            defaultValue:null
        },
        edrpou1: {
            type: Sequelize.STRING,
            defaultValue:null
        },
        edrpou2: {
            type: Sequelize.STRING,
            defaultValue:null
        },
        brand_id: {
            type: Sequelize.INTEGER,
            defaultValue:null
        },
        _merchant_id: {
            type: Sequelize.INTEGER,
            defaultValue:null
        },
        for_export: {
            type: Sequelize.BOOLEAN,
            defaultValue: 0
        },




        google_iteration_address: {
            type: Sequelize.STRING,
            defaultValue:null
        },
        google_iteration_place_id: {
            type: Sequelize.STRING,
            defaultValue:null
        },
        google_iteration_lat: {
            type: Sequelize.DECIMAL(20,10),
            defaultValue:null
        },
        google_iteration_lon: {
            type: Sequelize.DECIMAL(20,10),
            defaultValue:null
        },
        google_iteration_id: {
            type: Sequelize.INTEGER,
            defaultValue:null
        },
        google_iteration_count: {
            type: Sequelize.INTEGER,
            defaultValue:null
        },
        monkeyjob_skip: {
            type: Sequelize.BOOLEAN,
            defaultValue:false
        },
        monkeyjob_flag: {
            type: Sequelize.BOOLEAN,
            defaultValue:false
        },
        monkeyjob_yandex_place_id: {
            type: Sequelize.TEXT,
            defaultValue:null
        },
        monkeyjob_google_place_id: {
            type: Sequelize.TEXT,
            defaultValue:null
        },

        skip_text: {
            type: Sequelize.TEXT,
            defaultValue:null
        },

        coach_user_id: {
            type: Sequelize.INTEGER,
            defaultValue:null
        },
        coach_updated_at: {
            type: Sequelize.INTEGER,
            defaultValue:null
        },
        coach_skipped_brand: {
            type: Sequelize.BOOLEAN,
            defaultValue:false
        },
        bound_to: {
            type: Sequelize.INTEGER,
            defaultValue:null
        },
    }, {
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

exports.BaseTerminals = BaseTerminals;