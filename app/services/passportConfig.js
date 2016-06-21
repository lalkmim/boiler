'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var LocalStrategy = require('passport-local').Strategy;
var fbgraph = require('fbgraph');
var config = require('../config');
var log = require('../services/log');

var host = config.site.host.dev;
if (process.env.MODE == 'dev_c9') {
	host = config.site.host.c9;
}

module.exports = function (passport) {
	var User = require('../models/user');

	passport.serializeUser(function (user, done) {
		log.d('passport.serializeUser >> user.id', user.id);
		done(null, user.id);
	});

	passport.deserializeUser(function () {
		var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(userId, done) {
			var user;
			return _regenerator2.default.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							log.d('passport.deserializeUser >> id', userId);
							_context.next = 3;
							return User.findById(userId);

						case 3:
							user = _context.sent;

							done(null, user);

						case 5:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, this);
		}));
		return function (_x, _x2) {
			return ref.apply(this, arguments);
		};
	}());

	passport.use(new LocalStrategy(function (email, password, done) {
		// asynchronous verification, for effect...
		process.nextTick((0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
			var whereClause, user;
			return _regenerator2.default.wrap(function _callee2$(_context2) {
				while (1) {
					switch (_context2.prev = _context2.next) {
						case 0:
							// Find the user by username.  If there is no user with the given
							// username, or the password is not correct, set the user to `false` to
							// indicate failure and set a flash message.  Otherwise, return the
							// authenticated `user`.
							whereClause = {
								where: {
									$or: [{ email: email }, { login: email }]
								}
							};
							_context2.prev = 1;
							_context2.next = 4;
							return User.findOne(whereClause);

						case 4:
							user = _context2.sent;

							if (user) {
								_context2.next = 7;
								break;
							}

							return _context2.abrupt('return', done(null, false, {
								message: 'User not found with provided credentials.'
							}));

						case 7:
							if (!(user.password != password)) {
								_context2.next = 9;
								break;
							}

							return _context2.abrupt('return', done(null, false, {
								message: 'User not found with provided credentials.'
							}));

						case 9:
							return _context2.abrupt('return', done(null, user));

						case 12:
							_context2.prev = 12;
							_context2.t0 = _context2['catch'](1);

							log.e(_context2.t0);
							return _context2.abrupt('return', done(_context2.t0));

						case 16:
						case 'end':
							return _context2.stop();
					}
				}
			}, _callee2, this, [[1, 12]]);
		})));
	}));

	passport.use(new GoogleStrategy({
		clientID: config.passport.google.clientID,
		clientSecret: config.passport.google.clientSecret,
		callbackURL: host + config.passport.google.callbackURL
	}, function () {
		var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(accessToken, refreshToken, profile, done) {
			var dados, whereClause, user;
			return _regenerator2.default.wrap(function _callee3$(_context3) {
				while (1) {
					switch (_context3.prev = _context3.next) {
						case 0:
							dados = profile._json;

							log.d('profile json', dados);

							whereClause = {
								where: {
									$or: [{ googleId: dados.id }, { email: dados.emails[0].value }]
								}
							};


							log.d('whereClause', whereClause);

							_context3.next = 6;
							return User.findOne(whereClause);

						case 6:
							user = _context3.sent;
							_context3.prev = 7;

							if (!user) {
								_context3.next = 16;
								break;
							}

							user.googleId = dados.id;

							log.d('user data values', user.get());

							_context3.next = 13;
							return user.save();

						case 13:
							return _context3.abrupt('return', done(null, user.get()));

						case 16:
							user = User.build({
								name: dados.displayName,
								email: dados.emails[0].value,
								googleId: dados.id
							});

							_context3.next = 19;
							return user.save();

						case 19:

							log.d('User.findOne >> save', user);
							return _context3.abrupt('return', done(null, user));

						case 21:
							_context3.next = 27;
							break;

						case 23:
							_context3.prev = 23;
							_context3.t0 = _context3['catch'](7);

							log.e('user.findOne:', whereClause, _context3.t0);
							return _context3.abrupt('return', done(_context3.t0));

						case 27:
						case 'end':
							return _context3.stop();
					}
				}
			}, _callee3, this, [[7, 23]]);
		}));
		return function (_x3, _x4, _x5, _x6) {
			return ref.apply(this, arguments);
		};
	}()));

	passport.use(new FacebookStrategy({
		clientID: config.passport.facebook.clientID,
		clientSecret: config.passport.facebook.clientSecret,
		callbackURL: host + config.passport.facebook.callbackURL
	}, function () {
		var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(accessToken, refreshToken, profile, done) {
			var dados, whereClause, user;
			return _regenerator2.default.wrap(function _callee4$(_context4) {
				while (1) {
					switch (_context4.prev = _context4.next) {
						case 0:
							dados = profile._json;

							log.d('profile json', dados);

							/*
       var email = '';
       
       email = (function* () {
       	fbgraph.get('/me', { access_token: accessToken, fields: 'email' }, function*(err, res) {
       		if(err) {
       			log.e(err);
       			done(err);
       		}
       		log.d('fbgraph.me', res);
       		yield res.email;
       	});
       })().next().data;
       
       log.d('email', email);
       */

							whereClause = {
								where: {
									$or: [{ facebookId: dados.id }, { email: dados.email }]
								}
							};


							log.d('whereClause', whereClause);

							_context4.next = 6;
							return User.findOne(whereClause);

						case 6:
							user = _context4.sent;
							_context4.prev = 7;

							if (!user) {
								_context4.next = 16;
								break;
							}

							user.facebookId = dados.id;
							log.d('user data values', user.get());

							_context4.next = 13;
							return user.save();

						case 13:
							return _context4.abrupt('return', done(null, user.get()));

						case 16:
							user = User.build({
								name: dados.name,
								email: dados.email,
								facebookId: dados.id
							});

							_context4.next = 19;
							return user.save();

						case 19:

							log.d('User.findOne >> save', user);
							return _context4.abrupt('return', done(null, user));

						case 21:
							_context4.next = 27;
							break;

						case 23:
							_context4.prev = 23;
							_context4.t0 = _context4['catch'](7);

							log.e('user.findOne:', whereClause, _context4.t0);
							return _context4.abrupt('return', done(_context4.t0));

						case 27:
						case 'end':
							return _context4.stop();
					}
				}
			}, _callee4, this, [[7, 23]]);
		}));
		return function (_x7, _x8, _x9, _x10) {
			return ref.apply(this, arguments);
		};
	}()));
};