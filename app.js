var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var router = require('./routes');
require('dotenv').config()

var app = express();

var port = process.env.PORT || 443;

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// route for our apps
app.use(router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).json({
    status: 0,
    status_code: 404,
    message: 'Route not found'
  });
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // response the error page
  res.status(err.status || 500).json({
    status: 0,
    status_code: err.status || 500,
    message: err.message
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

module.exports = app;
