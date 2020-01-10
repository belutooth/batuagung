var express = require('express');
var path = require('path');
var favicon = require('serve-favicon')
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');

var pt = require('./routes/pt');
var app = express();

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/batuagung', { useUnifiedTopology:true, useNewUrlParser:true, promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':true}));
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/pts', express.static(path.join(__dirname, 'dist')));
app.use('/pt', pt);
app.set('view engine', 'html');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  console.error(err);
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
