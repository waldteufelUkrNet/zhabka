var Sequelize = require('sequelize');
var connection = require('./connection.js');
var exports = module.exports = {};

var StaticContent = connection.sequelize.define('static_contents',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        unique_id: {
            type: Sequelize.STRING,
            defaultValue:null
        },
        data: {
            type: Sequelize.STRING,
            defaultValue: null
        }


    }, {
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

exports.StaticContent = StaticContent;
