var Sequelize = require('sequelize');
var connection = require('./connection.js');
var exports = module.exports = {};

var AuditLogs = connection.sequelize.define('audit_logs',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
	check_id : {
            type: Sequelize.STRING,
            defaultValue:null
        },

        merchant_phone : {
            type: Sequelize.STRING,
            defaultValue:null
        },
	buyer_phone : {
            type: Sequelize.STRING,
            defaultValue:null
        },
        created_at: {
            type: Sequelize.INTEGER,
            defaultValue: null
        },


        merchant_message_type : {
            type: Sequelize.STRING,
            defaultValue:null
        },
	merchant_message_status : {
            type: Sequelize.STRING,
            defaultValue:null
        },
        merchant_message_time: {
            type: Sequelize.INTEGER,
            defaultValue: null
        },


        buyer_message_type : {
            type: Sequelize.STRING,
            defaultValue:null
        },
	buyer_message_status : {
            type: Sequelize.STRING,
            defaultValue:null
        },
        buyer_message_time: {
            type: Sequelize.INTEGER,
            defaultValue: null
        },


        fiscalization_timestamp: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        }





    }, {
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

exports.AuditLogs = AuditLogs ;