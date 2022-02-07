var Sequelize = require('sequelize');
var connection = require('./connection.js');
var exports = module.exports = {};

var MerchantMcc = connection.sequelize.define('keyboard_merchant_mcc_enabled',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        merchant_id: {
            type: Sequelize.INTEGER,
            defaultValue:null
        },
        mcc_id: {
            type: Sequelize.INTEGER,
            defaultValue:null
        },
        inn_edrpou: {
            type: Sequelize.STRING,
            defaultValue:null
        },
        view_merchant_id: {
            type: Sequelize.STRING,
            defaultValue:null
        },
        view_merchant_phone: {
            type: Sequelize.STRING,
            defaultValue:null
        }

    }, {
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

exports.MerchantMcc = MerchantMcc;
