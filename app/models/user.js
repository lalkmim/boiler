var Sequelize = require('sequelize');
var db = require('../app').get('db');

var User = db.define('User', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING,
    login: { 
        type: Sequelize.STRING,
        unique: true
    },
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    facebookId: {
        type: Sequelize.STRING,
        field: 'facebook_id'
    },
    googleId: {
        type: Sequelize.STRING,
        field: 'google_id'
    }
}, {
    tableName: 'user'
});

User.sync();

module.exports = User;