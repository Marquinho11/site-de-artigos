const Sequelize = require('sequelize');

const connect = new Sequelize('wordpressnode','root','Marquinhos12@',{
        host: 'localhost',
        dialect: 'mysql',
        timezone: '-03:00',
       

});

module.exports = connect;