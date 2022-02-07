var Sequelize = require('sequelize');
var connection = require('./connection.js');
var exports = module.exports = {};

var Brand = connection.sequelize.define('brands',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        facebook: {
            type: Sequelize.STRING,
            defaultValue:null
        },
        instagram: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        logo: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        logo_square: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        medium_logo_square: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        small_logo_square: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        logo_rectangular: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        medium_logo_rectangular: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        small_logo_rectangular: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        about: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        about_en: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        about_translit: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        name: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        name_en: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        name_translit: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        photo: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        url: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        source: {
            type: Sequelize.STRING,
            defaultValue: null
        },




        coach_user_id: {
            type: Sequelize.INTEGER,
            defaultValue:null
        },
        created_at: {
            type: Sequelize.INTEGER,
            defaultValue:null
        }

    }, {
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

exports.Brand = Brand;
