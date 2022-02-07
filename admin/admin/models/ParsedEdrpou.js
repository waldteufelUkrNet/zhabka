var Sequelize = require('sequelize');
var connection = require('./connection.js');
var exports = module.exports = {};

var ParsedEdrpou = connection.sequelize.define('parsed_edrpou_to_deleted',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        edrpou: {
            type: Sequelize.STRING,
            defaultValue: null
        }
    }, {
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

exports.ParsedEdrpou = ParsedEdrpou;