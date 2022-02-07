var Sequelize = require('sequelize');
var connection = require('./connection.js');
var exports = module.exports = {};

var TrademarkSearchWord = connection.sequelize.define('trademark_search_words',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        },
        trademark_id: {
            type: Sequelize.INTEGER
        }
    }, {
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

exports.TrademarkSearchWord = TrademarkSearchWord;
