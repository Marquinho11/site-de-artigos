const Sequelize = require("sequelize");
const connect = require("../database/data");

const User = connect.define('users',{
    email:{type: Sequelize.STRING, allowNull: false},
    senha: {type: Sequelize.STRING, allowNull: false}
});

//User.sync({force:true});

module.exports = User;