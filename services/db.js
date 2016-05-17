var Sequelize = require('sequelize');
var fs = require('fs');
var path = require('path');
var config = require('../config');
var log = require('../services/log');

if (!fs.existsSync(config.database.folder)){
    fs.mkdirSync(config.database.folder);
}

var db = new Sequelize(config.database.name, config.database.login, config.database.password, {
    dialect: 'sqlite',
    pool: {
        max: 50,
        min: 0,
        idle: 10000
    },
    storage: path.join(config.database.folder, config.database.file)
});

module.exports = db;

module.exports.loadModels = function() {
    fs.readdirSync(path.join(__dirname, '../models')).forEach(function (file) {
        if(file.substr(-3) == '.js') {
            var fileName = path.join(__dirname, '../models', file);
            require(fileName);
    	}
    });
};

module.exports.metadata = function() {
    db.query('SELECT * FROM sqlite_master',  { type: db.QueryTypes.SELECT })
    .then(function(tables) {
        for(var i=0; i<tables.length; i++) {
            log.d(tables[i]);
            db.query('pragma table_info(:tableName);',  { replacements: { tableName: tables[i] }, type: db.QueryTypes.SELECT })
            .then(function(table) {
                log.d(table);
            });
        }
    });
};

module.exports.baseInserts = function() {
    var MenuItem = require('../models/menu_item');
    var User = require('../models/user');

    User.build({ name: 'Leonardo', login: 'lalkmim', email: 'lalkmim@gmail.com'}).save()
    .then(function() { MenuItem.build({ label: 'Home', link: '/'}).save(); });
};