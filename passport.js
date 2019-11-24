const User = require('./models/User')
const passport = require('passport');

//strategies
const TwitterStrategy = require('passport-twitter').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;


module.exports = function (passport) {

	passport.serializeUser(function (user, done) {
		done(null, user);
	});

	passport.deserializeUser(function (obj, done) {
		done(null, obj);
	});

	passport.use(new TwitterStrategy({
		consumerKey: process.env.TW_KEY,
		consumerSecret: process.env.TW_SRC,
		callbackURL: '/auth/twitter/callback'
	}, function (accessToken, refreshToken, profile, done) {
		User.findOne({ provider_id: profile.id }, function (err, user) {
			if (err) throw (err);
			if (!err && user != null) return done(null, user);
			const user = new User({
				provider_id: profile.id,
				provider: profile.provider,
				name: profile.displayName,
				photo: profile.photos[0].value
			});
			user.save(function (err) {
				if (err) throw err;
				done(null, user);
			});
		});
	}));

	passport.use(new FacebookStrategy({
		clientID: process.env.FB_KEY,
		clientSecret: process.env.FB_SRC,
		callbackURL: '/auth/facebook/callback',
		profileFields: ['id', 'displayName', /*'provider',*/ 'photos']
	}, function (accessToken, refreshToken, profile, done) {
		User.findOne({ provider_id: profile.id }, function (err, user) {
			if (err) throw (err);
			if (!err && user != null) return done(null, user);
			const user = new User({
				provider_id: profile.id,
				provider: profile.provider,
				name: profile.displayName,
				photo: profile.photos[0].value
			});
			user.save(function (err) {
				if (err) throw err;
				done(null, user);
			});
		});
	}));

};

passport.use(new GoogleStrategy({
	clientID: process.env.GL_KEY,
	clientSecret: process.env.GL_SRC,
	callbackURL: "/auth/google/callback",
	passReqToCallback: true
},
	function (request, accessToken, refreshToken, profile, done) {
		User.findOne({ provider_id: profile.id }, function (err, user) {
			if (err) throw (err);
			if (!err && user != null) return done(null, user);
		});
		const user = new User({
			provider_id: profile.id,
			provider: profile.provider,
			name: profile.displayName,
			photo: profile.photos[0].value
		});
		user.save(function (err) {
			if (err) throw err;
			done(null, user);
		});
	}
));