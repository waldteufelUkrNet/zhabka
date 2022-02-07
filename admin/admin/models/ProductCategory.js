var Sequelize = require('sequelize');
var connection = require('./connection.js');
var exports = module.exports = {};

var ProductCategory = connection.sequelize.define('product_categories',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        
        name: {
            type: Sequelize.STRING
        },
        type: {
            type: Sequelize.INTEGER,
            defaultValue: 3
        },
        parent_id: {
            type: Sequelize.INTEGER,
            defaultValue: null
        },
        
        words: {
            field:"words",
            type: Sequelize.STRING,
            
            allowNull: false,
            defaultValue:'[]',
            get() {
                return JSON.parse(this.getDataValue('words'));
            // return this.getDataValue('phones').split(';')
            },
            set(val) {
                this.setDataValue('words',JSON.stringify(val));
            // this.setDataValue('phones',val.join(';'));
            },
        }

    }, {
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });
/*connection.sequelize.sync().then(result=>{
    console.log(result);
})
    .catch(err=> console.log(err));*/
exports.ProductCategory = ProductCategory;
