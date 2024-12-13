const Sequelize = require("sequelize");
const connect = require("../database/data");

const Category = connect.define('categorias',{
    title:{type: Sequelize.STRING, allowNull: false},
    slug: {type: Sequelize.STRING, allowNull: false}
});

//Category.sync({force:true});

module.exports = Category;