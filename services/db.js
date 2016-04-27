var Sequelize = require('sequelize');
var fs = require('fs');
var path = require('path');
var config = require('../config');

if (!fs.existsSync(config.database.folder)){
    fs.mkdirSync(config.database.folder);
}

var sequelize = new Sequelize('database', null, null, {
    dialect: 'sqlite',
    pool: {
        max: 50,
        min: 0,
        idle: 10000
    },
    storage: path.join(config.database.folder, config.database.file)
});

fs.readdirSync(path.join(__dirname, '../models')).forEach(function (file) {
    if(file.substr(-3) == '.js') {
        var fileName = path.join(__dirname, '../models', file);
        require(fileName).loadModel(sequelize);
	}
});

module.exports = sequelize;

module.exports.metadata = function() {
    sequelize.query('SELECT * FROM sqlite_master',  { type: sequelize.QueryTypes.SELECT })
    .then(function(tables) {
        for(var i=0; i<tables.length; i++) {
            console.log(tables[i]);
            sequelize.query('pragma table_info(:tableName);',  { replacements: { tableName: tables[i] }, type: sequelize.QueryTypes.SELECT })
            .then(function(table) {
                console.log(table);
            });
        }
    });
};