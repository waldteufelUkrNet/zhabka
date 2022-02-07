var Sequelize = require('sequelize');
var connection = require('./connection.js');
var exports = module.exports = {};


var ProductRegion = connection.sequelize.define('product_regions',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        
        name: {
            type: Sequelize.STRING
        }
    }, {
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

exports.ProductRegion = ProductRegion;
