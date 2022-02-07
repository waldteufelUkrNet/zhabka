var Sequelize = require('sequelize');
var connection = require('./connection.js');
var exports = module.exports = {};

var TelegramMerchant = connection.sequelize.define('telegram_merchants',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            defaultValue: ''
        },
        first_name: {
            type: Sequelize.STRING,
            defaultValue: ''
        },
        username: {
            type: Sequelize.STRING,
            defaultValue: ''
        },
        chat_id: {
            type: Sequelize.INTEGER,
            defaulValue: null
        },
        phone: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        short_name: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        full_name: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        legal_address: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        inn: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        edrpou: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        extract_photo: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        director: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        activity_type: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        mailing_address: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        donate: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        donate_request: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        facebook: {
            type: Sequelize.STRING,
            defaultValue: ''
        },
        instagram: {
            type: Sequelize.STRING,
            defaultValue: ''
        },
        url: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        logo: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        original_merchant_id: {
            type: Sequelize.INTEGER,
            defaulValue: null
        },
        lon: {
            type: Sequelize.DECIMAL(20,10),
            defaultValue: null
        },
        lat: {
            type: Sequelize.DECIMAL(20,10),
            defaultValue: null
        },
        virtual_points: {
            type: Sequelize.INTEGER,
            defaulValue: 0
        },
        place_id: {
            type: Sequelize.STRING,
            defaultValue: null
        },


        cashless_name: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        cashless_type: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        cashless_inn_edrpou: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        cashless_iban: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        created_at: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        }
    }, {
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

exports.TelegramMerchant = TelegramMerchant;