const Sequelize = require("sequelize");
const connect = require("../database/data");
const Category = require('../categories/Category');

const Article = connect.define('categoris',{
    title:{type: Sequelize.STRING, allowNull: false},
    slug: {type: Sequelize.STRING, allowNull: false},
    body:{type: Sequelize.TEXT, allowNull: false}
});

Category.hasMany(Article); //uma categoria tem muitos artigos
Article.belongsTo(Category); //para criar relacionamento entre banco

//Article.sync({force:true}) //remover para ele não tentar criar novamente
module.exports = Article;