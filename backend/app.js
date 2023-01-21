var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// for uploading images
var multer = require('multer');
var upload = multer({ dest: "public/images/" });


// include moongoose and connect to mongoDB
var mongoose = require('mongoose');
var mongoDB = "mongodb://127.0.0.1/vaja4";
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// include routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/userRoutes');
var photosRouter = require('./routes/photoRoutes');
var commentsRouter = require('./routes/commentRoutes');

var app = express();

// include CORS
var cors = require('cors');
var allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];
app.use(cors({
  credentials: true,
  origin: function(origin, callback) {
    // allow requests with no origin (mobile apps, curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      var msg = "The CORS policy does not allow access from the specified Origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// connect-mongo allows us to store our session in the database
var session = require('express-session');
var MongoStore = require('connect-mongo');
app.use(session({
  secret : 'work hard',
  resave : true,
  saveUninitialized : false,
  store : MongoStore.create({mongoUrl: mongoDB})
}));
// saving session variables to local so we can access them in any view component
app.use(function (req, res, next) {
  res.locals.session = req.session;
  next();
});


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/photos', photosRouter);
app.use('/comments', commentsRouter);

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
