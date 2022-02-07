var Sequelize = require('sequelize');
var connection = require('./connection.js');
var exports = module.exports = {};

var BrandRules = connection.sequelize.define('brand_rules',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        brand_id: {
            type: Sequelize.INTEGER,
            defaultValue: null
        },
        tags: { 
            type: Sequelize.STRING, 
            get: function() {
                return JSON.parse(this.getDataValue('tags'));
            }, 
            set: function(val) {
                return this.setDataValue('tags', JSON.stringify(val));
            }
        },
        tags_flags: {  // absolute: false, like: true
            type: Sequelize.STRING, 
            get: function() {
                return JSON.parse(this.getDataValue('tags_flags'));
            }, 
            set: function(val) {
                return this.setDataValue('tags_flags', JSON.stringify(val));
            }
        }
    }, {
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

exports.BrandRules = BrandRules;
