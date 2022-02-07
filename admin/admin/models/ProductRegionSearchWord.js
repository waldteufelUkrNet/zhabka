var Sequelize = require('sequelize');
var connection = require('./connection.js');
var exports = module.exports = {};

var ProductRegionSearchWord = connection.sequelize.define('product_regions_search_words',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        },
        product_region_id: {
            type: Sequelize.INTEGER
        }
    }, {
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

exports.ProductRegionSearchWord = ProductRegionSearchWord;
