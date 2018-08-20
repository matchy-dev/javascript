var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var getDataRouter = require('./routes/get_data');
var saveDataRouter = require('./routes/save_data');
var getUrlRouter = require('./routes/get_url');
var getSetDataRouter = require('./routes/get_set_data');
var getKeyValRouter = require('./routes/get_key_val');
var saveSendDataRouter = require('./routes/save_send_data');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/get_data', getDataRouter);
app.use('/save_data', saveDataRouter);
app.use('/get_url', getUrlRouter);
app.use('/get_set_data', getSetDataRouter);
app.use('/get_key_val', getKeyValRouter);
app.use('/save_send_data', saveSendDataRouter);

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
