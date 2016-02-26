var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var routes = require('./routes/index');
var users = require('./routes/users');
var ajouterCandidat = require('./routes/ajouterCandidat');
var ajouterCv = require('./routes/ajouterCv');
var cv = require('./routes/cv');
var rechercheOffres = require('./routes/rechercherOffres');
var ajouterRecruteur = require('./routes/ajouterRecruteur')
var login = require('./routes/login');
var logout = require('./routes/logout');
var ajouterOffre = require('./routes/ajouterOffre');
var offre = require('./routes/offres');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: '2C44-4D44-WppQ38S',
  resave: true,
  saveUninitialized: true
}));

// Authentication and Authorization Middleware
var auth = function(req, res, next) {
  if (req.session && req.session.user === "amy" && req.session.admin)
    return next();
  else
    return res.sendStatus(401);
};

app.use('/', routes);
app.use('/users', users);
app.use('/ajouterCandidat', ajouterCandidat);
app.use('/ajouterCv', ajouterCv);
app.use('/cv', cv);
app.use('/login',login);
app.use('/logout',logout);
app.use('/rechercheOffres', rechercheOffres);
app.use('/ajouterRecruteur', ajouterRecruteur);
app.use('/ajouterOffre', ajouterOffre);
app.use('/offre', offre);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;