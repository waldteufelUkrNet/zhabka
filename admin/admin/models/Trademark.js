var Sequelize = require('sequelize');
var connection = require('./connection.js');
var exports = module.exports = {};

var Trademark = connection.sequelize.define('trademarks',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        
        name: {
            type: Sequelize.STRING
        },
        region_id: {
            type: Sequelize.INTEGER,
            defaulValue: null
        }
    }, {
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

exports.Trademark = Trademark;