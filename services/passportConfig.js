//var User = require('../models/user');
var FacebookStrategy = require('passport-facebook').Strategy;
var LocalStrategy = require('passport-local').Strategy;
//var fbgraph = require('fbgraph');

var host = 'http://pnpa0.asuscomm.com:9031';
if(process.env.MODE == 'dev_c9') {
	host = 'http://boiler-lalkmim.c9users.io';
}

console.log('host', host);
console.log('MODE', process.env.MODE);

module.exports = function(passport) {
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function (err, user) {
			if(err) console.log(err);
			done(err, user);
		});
	});
	
	passport.use(new LocalStrategy(
		function(email, password, done) {
			// asynchronous verification, for effect...
			process.nextTick(function () {
				// Find the user by username.  If there is no user with the given
				// username, or the password is not correct, set the user to `false` to
				// indicate failure and set a flash message.  Otherwise, return the
				// authenticated `user`.
				User.find({ 'local.email': email }, function(err, user) {
					if (err) {
						return done(err);
					}
					
					if (!user) {
						return done(null, false, {
							message: 'Unknown user ' + email
						});
					}
					
					if (user.password != password) {
						return done(null, false, {
							message: 'Invalid password'
						});
					}
					
					return done(null, user);
				});
			});
		}
	));

	passport.use(new FacebookStrategy({
		clientID: 1507411012827539,
		clientSecret: 'bd1f55c384ba7f9940f2f9bdaf9a7d44',
		callbackURL: host + '/auth/facebook/callback'
	}, function(accessToken, refreshToken, profile, done) {
		console.log('profile:', profile);
		var dados = profile._json;
		console.log(dados);
		
		var params = { 'facebook.id' : dados.id };
		
		User.findOne(params, function(err, user) {
			if (err) {
				console.log('user.findOne:', params, err);
				return done(err);
			}
			
			console.log('user:', user);
			
			if(!user) {
				user = new User();
				user.local.email = dados.email;
				user.facebook.id = dados.id;
				user.facebook.email = dados.email;
				user.facebook.name = dados.name;
				user.trips = [];
				user.friends = [];

				/*
				user.save(function(err, savedUser, affected) {
					if(err) {
						console.log('user.save:', err);
						return done(err);
					}
				});
				*/
			}
			
			done(null, user);
		});
	}));
};