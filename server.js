// Application bootstrap

var express = require('express');
var app = express();
var port = process.env.PORT || 8001;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var configDB = require('./config/database.js');

// Connect to our database
mongoose.connect(configDB.url);

require('./config/passport.js')(passport);

// Set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies, needed for auth
app.use(bodyParser()); // get informations from html forms

app.set('view engine', 'ejs'); // ejs as our template engine

// Required by passport
app.use(session({ secret: 'yuzhou' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for displaying error messages

require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// Launch app
app.listen(port);
console.log('Server is running on port ' + port);
