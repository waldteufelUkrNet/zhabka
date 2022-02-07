var Sequelize = require('sequelize');
var connection = require('./connection.js');
var exports = module.exports = {};

var ReservedPhrases = connection.sequelize.define('reserved_phrases',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        }
    }, {
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

exports.ReservedPhrases = ReservedPhrases;
