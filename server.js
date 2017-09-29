const {dbUser, dbPass, dbName, dbServer, nodePort, sessionSecret} = require('./config/config')

//Express
var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));

//Passport
var passport = require('passport');
require('./config/passport')(passport); // pass passport for configuration

//Cookie and session
var cookieParser = require('cookie-parser');
var session = require('express-session');
app.use(session({
  secret: sessionSecret
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

//Body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.json()); //for parsing application/json
app.use(bodyParser.urlencoded({
  extended: true
}));

//Massive
const massive = require('massive');
const connectionString = `postgres://${dbUser}:${dbPass}@${dbServer}/${dbName}`
const massiveConnection = massive(connectionString)
.then(db => {
    app.set('db',db);
})

.catch(err => {
    console.log(err)
})


// routes ======================================================================
require('./routes/auth.js')(app, passport); // load our routes and pass in our app and fully configured passport


app.listen( nodePort, () => { console.log(`Server listening on port ${nodePort}.`); } );

