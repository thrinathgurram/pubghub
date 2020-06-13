

var createError = require('http-errors');
var cookieSession = require('cookie-session');
var express = require('express');
var path = require('path');
var cors = require("cors");
var flash = require('express-flash');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Add Routes
var indexRouter = require('./routes/index');
var tournament = require('./routes/tournament');
var login = require('./routes/login');
var signup = require('./routes/signup');
var admin_login = require('./routes/admin-login');
var admin_dashboard = require('./routes/admin-dashboard');
var add_tournament = require('./routes/add-tournament');
var tournament_detail = require('./routes/tournament-detail');
var poolprice = require('./routes/poolprice');
var account = require('./routes/account');


var app = express();

// cors middleware

app.use(cors())


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieSession({
  name: 'session',
  keys: ['kaushal'],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

app.use(flash());

// Use Routes
app.use('/', indexRouter);
app.use('/tournament', tournament);
app.use('/login', login);
app.use('/signup', signup);
app.use('/admin-login', admin_login);
app.use('/admin-dashboard', admin_dashboard);
app.use('/add-tournament', add_tournament);
app.use('/tournament-detail', tournament_detail);
app.use('/poolprice', poolprice);
app.use('/account', account);

// Access Control
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
