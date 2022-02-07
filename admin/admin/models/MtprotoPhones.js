var Sequelize = require('sequelize');
var connection = require('./connection.js');
var exports = module.exports = {};

var MtprotoPhones = connection.sequelize.define('mtproto_phones',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        phone: {
            type: Sequelize.STRING,
            defaultValue:null
        },
        status: {
            type: Sequelize.BOOLEAN,
            defaultValue:false
        }
    }, {
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

exports.MtprotoPhones = MtprotoPhones;
