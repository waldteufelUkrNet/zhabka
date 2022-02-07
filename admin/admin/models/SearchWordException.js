var Sequelize = require('sequelize');
var connection = require('./connection.js');
var exports = module.exports = {};

var SearchWordException = connection.sequelize.define('search_words_exceptions',
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

exports.SearchWordException = SearchWordException;
