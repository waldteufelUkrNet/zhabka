var Sequelize = require('sequelize');
var connection = require('./connection.js');
var exports = module.exports = {};

var Mcc = connection.sequelize.define('keyboard_mcc_lib',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        number: {
            type: Sequelize.STRING,
            defaultValue:null
        },
        description: {
            type: Sequelize.STRING,
            defaultValue:null
        },
        payment_purpose: {
            type: Sequelize.STRING,
            defaultValue:null
        },
        coefficient: {
            type: Sequelize.DECIMAL(10,2),
            defaultValue:null
        },
        type: {
            type: Sequelize.STRING,
            defaultValue:null
        },
        minimal_summ: {
            type: Sequelize.INTEGER,
            defaultValue: null
        },
        maximum_summ: {
            type: Sequelize.INTEGER,
            defaultValue: null
        },
        dayly_limit: {
            type: Sequelize.INTEGER,
            defaultValue: null
        },
        monthly_limit: {
            type: Sequelize.INTEGER,
            defaultValue: null
        },

        ipay_merchant_id: {
            type: Sequelize.STRING,
            defaultValue:null
        },
        ipay_merchant_name: {
            type: Sequelize.STRING,
            defaultValue:null
        },
        ipay_system_key: {
            type: Sequelize.STRING,
            defaultValue:null
        },
        ipay_merchant_key: {
            type: Sequelize.STRING,
            defaultValue:null
        }


    }, {
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

exports.Mcc = Mcc;
