import Sequelize from 'sequelize';
import fs from 'fs';
import path from 'path';
import config from '../config';
import log from '../services/log';
/*
import MenuItem from '../models/menu_item';
import User from '../models/user';
*/
if (!fs.existsSync(config.database.folder)){
    fs.mkdirSync(config.database.folder);
}

const db = new Sequelize(config.database.name, config.database.login, config.database.password, {
    dialect: 'sqlite',
    pool: {
        max: 50,
        min: 0,
        idle: 10000
    },
    storage: path.join(config.database.folder, config.database.file)
});

export default db;

export function loadModels() {
    fs.readdirSync(path.join(__dirname, '../models')).forEach(function (file) {
        if(file.substr(-3) == '.js') {
            var fileName = path.join(__dirname, '../models', file);
            require(fileName);
    	}
    });
}