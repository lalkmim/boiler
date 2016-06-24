import Sequelize from 'sequelize';
import app from '../app';

const db = app.get('db');

var MenuItem = db.define('MenuItem', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    label: {
        type: Sequelize.STRING,
        allowNull: false
    },
    link: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    tableName: 'menu_item'
});

MenuItem.hasMany(MenuItem, {as: 'SubItems', foreignKey: 'parent_id' });

MenuItem.sync();

export default MenuItem;