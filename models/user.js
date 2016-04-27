var Sequelize = require('sequelize');

module.exports.loadModel = function(sequelize) {
    sequelize.define('User', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: Sequelize.STRING,
        login: Sequelize.STRING,
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: Sequelize.STRING
    })
    .sync();
};