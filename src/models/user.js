import Sequelize from 'sequelize';
import app from '../app';

const db = app.get('db');

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
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        field: 'is_admin',
        defaultValue: false
    }
}, {
    tableName: 'user'
});

User.sync();

export default User;