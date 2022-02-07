var Sequelize = require('sequelize');
var connection = require('./connection.js');
var exports = module.exports = {};

var Region = connection.sequelize.define('regions',
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
        code: {
            type: Sequelize.STRING,
            defaultValue: null
        }


    }, {
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

exports.Region = Region;
