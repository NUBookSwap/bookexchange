var express     = require('express'),
    app         = express(),
    passport    = require('passport'),
    session     = require('express-session'),
    bodyParser  = require('body-parser'),
    models      = require('./models'),
    exphbs      = require('express-handlebars');

var PORT = process.env.PORT || 8080;

// To use body-parser
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());

// To use passport and express-session as middleware
app.use(session({ 
    secret : 'birds are cute', 
    resave : true, 
    saveUninitialized : true 
})); // session secret

app.use(passport.initialize());

app.use(passport.session()); // persistent login sessions

// Sync Database
models.sequelize.sync({force: true}).then(function() {
    console.log('Nice database!');
}).catch(function(err){
    console.log(err, "Something went wrong with database update!");
});

// For Handlebars
app.set('views', './views');
app.engine('hbs', exphbs({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// TODO: require all our routes here
var authRoute = require('./routes/auth.js')(app, passport);
var htmlRoute = require('./routes/hbsroutes.js')(app);

// load passport strategies
require('./config/passport/passport.js')(passport, models.User);

// Connection
app.listen(PORT, function(err){
    if(err){
        console.log(err);
    }
    else {
        console.log("Server Running");
    }
});