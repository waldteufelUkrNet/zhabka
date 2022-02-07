var Sequelize = require('sequelize');
var connection = require('./connection.js');
var exports = module.exports = {};

var MccCode = connection.sequelize.define('mcc_codes',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        category: {
            type: Sequelize.STRING,
            defaultValue:null
        },
        unique_id: {
            type: Sequelize.STRING,
            defaultValue:null
        },
        name: {
            type: Sequelize.STRING,
            defaultValue:null
        },
        description: {
            type: Sequelize.STRING,
            defaultValue:null
        }


    }, {
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

exports.MccCode = MccCode;
