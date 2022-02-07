var Sequelize = require('sequelize');
var connection = require('./connection.js');
var exports = module.exports = {};

var SearchWord = connection.sequelize.define('search_words',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        },
        category_id: {
            type: Sequelize.INTEGER
        }
    }, {
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

exports.SearchWord = SearchWord;
