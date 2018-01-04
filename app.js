var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

var index = require('./routes/index');
var users = require('./routes/users');
var data = require('./routes/data');
var feedback = require('./routes/feedback');
var dm = require('./routes/dm');
var app = express();

const SECRIT = 'LIMOER';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var allowCrossDomain = function(req, res, next) {
  console.log('run cross!');
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.set('Access-Control-Allow-Credentials','true');
  next();
};

app.use(allowCrossDomain);


app.use(function(req, res, next) {
  const { headers, path } = req;
  // 验证带有token的普通请求
  if(headers.authorization) {
    // 普通情况下验证token
    const token = headers.authorization.split(' ')[1];
    req.token = token;
    jwt.verify(token, SECRIT, function(err, decoded) {
      if(err) {
        res.status(401).json({global: {error: 'INVALID TOKEN'}})
      }else {
        req.decoded = decoded;
        next();
      }
    })
  }else{
    // 这是三个两个公有API，不需要带上token
    if(path === '/feedback/add_star' || path === '/feedback/add_feedback' || path==='/users/auth') {
      next();
    }
    if(path === '/users/comfirm_token') {
      next();
    }
    // 当请求为OPTIONS时不会带上token，直接让其经过
    if(req.method === 'OPTIONS') {
      next();
    }
  }
})

app.use('/', index);
app.use('/users', users);
app.use('/data', data);
app.use('/feedback', feedback);
app.use('/dm', dm);

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
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
