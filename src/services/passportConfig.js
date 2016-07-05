import { Strategy as FacebookStrategy } from 'passport-facebook';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import { Strategy as LocalStrategy } from 'passport-local';
import config from '../config';
import log from '../services/log';

var host = config.site.host.dev;
if(process.env.MODE == 'dev_c9') {
	host = config.site.host.c9;
}

export default function(passport) {
	var User = require('../models/user').default;
	
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(async function(userId, done) {
		let user = await User.findById(userId);
		user = (user ? user.get () : user);
		done(null, user);
	});
	
	passport.use(new LocalStrategy(
		function(email, password, done) {
			process.nextTick(async function () {
				var whereClause = {
					where: {
						$or: [
							{ email: email },
							{ login: email }
						]
					}
				};
				
				try {
					let user = await User.findOne(whereClause);
					if (!user) {
						return done(null, false, {
							message: 'User not found with provided credentials.'
						});
					}
					
					if (user.password != password) {
						return done(null, false, {
							message: 'User not found with provided credentials.'
						});
					}
					
					return done(null, user);
				} catch(err) {
					log.e(err);
					return done(err);
				}
			});
		}
	));
	
	passport.use(new GoogleStrategy({
		clientID: config.passport.google.clientID,
		clientSecret: config.passport.google.clientSecret,
		callbackURL: host + config.passport.google.callbackURL,
		enableProof: true
	},
	async function(accessToken, refreshToken, profile, done) {
		var dados = profile._json;
		log.d('profile json', dados);
		
		var whereClause = { 
			where : { 
				$or: [
					{ googleId : dados.id },
					{ email: dados.emails[0].value }
				]
			}
		};
		
		log.d('whereClause', whereClause);
		
		let user = await User.findOne(whereClause);
		try {
			if(user) {
				user.googleId = dados.id;
				
				log.d('user data values', user.get());
				
				await user.save();
				return done(null, user.get());
			} else {
				user = User.build({
					name: dados.displayName,
					email: dados.emails[0].value,
					googleId: dados.id
				});
				
				await user.save();
				
				log.d('User.findOne >> save', user);
				return done(null, user);
			}
		} catch(err) {
			log.e('user.findOne:', whereClause, err);
			return done(err);
		}
	}));

	passport.use(new FacebookStrategy({
		clientID: config.passport.facebook.clientID,
		clientSecret: config.passport.facebook.clientSecret,
		callbackURL: host + config.passport.facebook.callbackURL,
		enableProof: true
	}, async function(accessToken, refreshToken, profile, done) {
		var dados = profile._json;
		log.d('profile json', dados);
		
		var whereClause = { 
			where : { 
				$or: [
					{ facebookId : dados.id },
					{ email: dados.email }
				]
			}
		};
		
		log.d('whereClause', whereClause);
		let user = null;
		
		try {
			user = await User.findOne(whereClause);
			log.d('User.findOne', { user: (user ? user.get() : null) });
		} catch(e) {
			log.e('error', e);
		}
		
		try {
			if(user) {
				user.facebookId = dados.id;
				log.d('user data values', user.get());
				
				await user.save();
				return done(null, user.get());
			} else {
				user = User.build({
					name: dados.name,
					email: dados.email,
					facebookId: dados.id
				});
				
				let saved = await user.save();
				
				log.d('User.findOne >> save', saved);
				return done(null, saved);
			}
		} catch(err) {
			log.e('user.findOne:', whereClause, err);
			return done(err);
		}
	}));
};