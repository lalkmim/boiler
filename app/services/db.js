'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Sequelize = require('sequelize');
var fs = require('fs');
var path = require('path');
var config = require('../config');
var log = require('../services/log');

if (!fs.existsSync(config.database.folder)) {
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

module.exports.loadModels = function () {
    fs.readdirSync(path.join(__dirname, '../models')).forEach(function (file) {
        if (file.substr(-3) == '.js') {
            var fileName = path.join(__dirname, '../models', file);
            require(fileName);
        }
    });
};

module.exports.metadata = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
    var tables, i, table;
    return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.next = 2;
                    return db.query('SELECT * FROM sqlite_master', { type: db.QueryTypes.SELECT });

                case 2:
                    tables = _context.sent;
                    i = 0;

                case 4:
                    if (!(i < tables.length)) {
                        _context.next = 13;
                        break;
                    }

                    log.d(tables[i]);
                    _context.next = 8;
                    return db.query('pragma table_info(:tableName);', { replacements: { tableName: tables[i] }, type: db.QueryTypes.SELECT });

                case 8:
                    table = _context.sent;

                    log.d(table);

                case 10:
                    i++;
                    _context.next = 4;
                    break;

                case 13:
                case 'end':
                    return _context.stop();
            }
        }
    }, _callee, this);
}));

module.exports.baseInserts = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
    var MenuItem, User, user, menuItem;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    MenuItem = require('../models/menu_item');
                    User = require('../models/user');
                    user = User.build({ name: 'Leonardo', login: 'lalkmim', email: 'lalkmim@gmail.com' });
                    _context2.next = 5;
                    return user.save();

                case 5:
                    menuItem = MenuItem.build({ label: 'Home', link: '/' });
                    _context2.next = 8;
                    return menuItem.save();

                case 8:
                case 'end':
                    return _context2.stop();
            }
        }
    }, _callee2, this);
}));