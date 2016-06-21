'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = require('../config');
var MenuItem = require('../models/menu_item');
var passport = require('passport');
var log = require('../services/log');

module.exports.controller = function (router) {
    var baseParams = { title: config.site.name };

    router.get('/', function () {
        var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
            var area01Buttons, params, menuItems;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            log.d('router.get /');

                            area01Buttons = [{
                                icon: 'fa-paper-plane',
                                header: 'This Is Important',
                                text: 'Duis neque nisi, dapibus sed mattis et quis, nibh. Sed et dapibus nisl amet mattis, sed a rutrum accumsan sed. Suspendisse eu.'
                            }, {
                                icon: 'fa-pencil',
                                header: 'Also Important',
                                text: 'Duis neque nisi, dapibus sed mattis et quis, nibh. Sed et dapibus nisl amet mattis, sed a rutrum accumsan sed. Suspendisse eu.'
                            }, {
                                icon: 'fa-wrench',
                                header: 'Probably Important',
                                text: 'Duis neque nisi, dapibus sed mattis et quis, nibh. Sed et dapibus nisl amet mattis, sed a rutrum accumsan sed. Suspendisse eu.'
                            }];
                            params = baseParams;

                            params.area01Buttons = area01Buttons;
                            params.menuItems = req.menuItems;
                            params.user = req.user;

                            if (params.menuItems) {
                                _context.next = 15;
                                break;
                            }

                            _context.next = 9;
                            return MenuItem.findAll();

                        case 9:
                            menuItems = _context.sent;


                            req.menuItems = menuItems;
                            params.menuItems = menuItems;

                            res.render('index', params);
                            _context.next = 16;
                            break;

                        case 15:
                            res.render('index', params);

                        case 16:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));
        return function (_x, _x2, _x3) {
            return ref.apply(this, arguments);
        };
    }());

    router.get('/error', function (req, res, next) {
        res.render('error');
    });

    router.get('/login', function () {
        var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res, next) {
            var menuItems, params;
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return MenuItem.findAll();

                        case 2:
                            menuItems = _context2.sent;
                            params = { title: config.site.name, menuItems: menuItems };

                            res.render('login', params);

                        case 5:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, this);
        }));
        return function (_x4, _x5, _x6) {
            return ref.apply(this, arguments);
        };
    }());

    router.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    router.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

    router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/error' }), function (req, res) {
        log.d('res.redirect');
        res.redirect('/');
    });

    router.get('/auth/google', passport.authenticate('google', { scope: 'email' }));

    router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/error' }), function (req, res) {
        log.d('res.redirect');
        res.redirect('/');
    });
};