var Sequelize = require('sequelize');
var connection = require('./connection.js');
var exports = module.exports = {};

var LegalEntity = connection.sequelize.define('legal_entities',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        edrpou: {
            type: Sequelize.STRING
        },
        nn: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        full_name: {
            type: Sequelize.STRING
        },
        short_name: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        address: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        kved: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        boss: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        status: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        prro_status: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        source: {
            type: Sequelize.STRING,
            defaultValue: null
        }

    }, {
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

exports.LegalEntity = LegalEntity;
