require('dotenv').config();

const chalk             = require('chalk'),
      createError       = require('http-errors'),
      express           = require('express'),
      http              = require('http'),
      path              = require('path'),
      cookieParser      = require('cookie-parser'),
      logger            = require('morgan'),

      indexRouter       = require('./routes/index'),
      usersRouter       = require('./routes/users'),
      sendinbluesRouter = require('./routes/sendinblue'),

      port              = process.env.PORT,
      host              = process.env.APP_DOMAIN,

      app               = express(),
      server            = new http.Server(app);

server.listen(port, host, function(err, result) {
  if (err) {
    throw new Error();
  } else {
    console.log( chalk.black.bgGreen(`server start listen http://${host}:${port}` ));
    console.log( chalk.black.bgGreen(`rout for sendinblue testing is http://${host}:${port}/sendinblue` ));
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/sendinblue', sendinbluesRouter);
app.use('/users', usersRouter);
app.use('/', indexRouter);

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