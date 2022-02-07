var Sequelize = require('sequelize');
var connection = require('./connection.js');
var exports = module.exports = {};

var TmpBaseMcCheck = connection.sequelize.define('tmp_base_mc_check',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tid: {
            type: Sequelize.STRING
        },
        mid: {
            type: Sequelize.STRING
        },
        transaction_id: {
            type: Sequelize.STRING
        },
        mc_id: {
            type: Sequelize.STRING,
            defaultValue: null
        }

    }, {
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

exports.TmpBaseMcCheck = TmpBaseMcCheck;
