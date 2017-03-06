const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mysql = require('promise-mysql');
const nodemailer = require('nodemailer');
const config = require('./config.json')





var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mysql.createConnection({
    host: 'localhost',
    port: '8889',
    user: config.dbUser,
    password: config.dbPass,
    database: config.db
})
	.then(connection => global.db = connection)
	.catch(err => console.log("DB auth problem: ${err}"))

global.transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.mail,
        pass: config.mailPass
    }
});

app.use('/*', require('./middleware/token'))

//app.use('/', index);
app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/users'));
app.use('/courses', require('./routes/courses'));
app.use('/reg', require('./routes/reg'));
app.use('/skills', require('./routes/skills'));



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
  console.log(err)
  //res.render('error');
});

module.exports = app;