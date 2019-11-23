
var express = require('express');
var routes = require('./routes');
var path = require('path');

var mongoose = require('mongoose');
var passport = require('passport');

var restify = require('restify')

require('./passport')(passport);

mongoose.connect('mongodb://localhost:27017/passport-example', function (err, res) {
  if (err) throw err;
  console.log('Conectado con éxito a la BD');
});


var app = express();


app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(restify.plugins.queryParser({ mapParams: false }));


app.get('/', routes.index);
app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));
app.get('/auth/twitter/callback', passport.authenticate('twitter',
  { successRedirect: '/', failureRedirect: '/login' }
));
app.get('/auth/facebook/callback', passport.authenticate('facebook',
  { successRedirect: '/', failureRedirect: '/login' }
));
app.get('/auth/google/callback', passport.authenticate('google',
  { successRedirect: '/', failureRedirect: '/login' }
));
app.listen(app.get('port'), function () {
  console.log('Server on PORT: ' + app.get('port'));
});