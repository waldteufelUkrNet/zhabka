var Sequelize = require('sequelize');
var connection = require('./connection.js');
var exports = module.exports = {};

var Bank = connection.sequelize.define('banks',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            defaultValue:null
        },
        full_name: {
            type: Sequelize.STRING,
            defaultValue:null
        },
        edrpou: {
            type: Sequelize.STRING,
            defaultValue:null
        },
        mfo: {
            type: Sequelize.STRING,
            defaultValue:null
        },
        unique_id: {
            type: Sequelize.STRING,
            defaultValue: null
        }


    }, {
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

exports.Bank = Bank;
