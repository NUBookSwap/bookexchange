var express     = require('express'),
    app         = express(),
    passport    = require('passport'),
    session     = require('express-session'),
    bodyParser  = require('body-parser'),
    models      = require('./models'),
    exphbs      = require('express-handlebars'),
    moment      = require('moment');

var PORT = process.env.PORT || 8080;

// To use body-parser
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());

// Serve the public folder
app.use(express.static("public"));

// To use passport and express-session as middleware
app.use(session({ 
    secret : 'birds are cute', 
    resave : true, 
    saveUninitialized : true 
})); // session secret

app.use(passport.initialize());

app.use(passport.session()); // persistent login sessions

// Sync Database
models.sequelize.sync().then(function() {
    console.log('Nice database!');
}).catch(function(err){
    console.log(err, "Something went wrong with database update!");
});

// For Handlebars
app.set('views', './public/views');
app.engine('hbs', exphbs({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// TODO: require all our routes here
var authRoute = require('./routes/auth.js')(app, passport);
var htmlRoute = require('./routes/hbsroutes.js')(app);

require('./routes/booksapi')(app);
require('./routes/userapi')(app);

// load passport strategies
require('./config/passport/passport.js')(passport, models.User);

// Connection
app.listen(PORT, function(err){
    
if(process.env.JAWSDB_URL){
    connection = mysql.createConnection(process.env.JAWSDB_URL);
}else{
    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'potato1234',
        database: 'bookexchange_db'
    });
};

    if(err){
        console.log(err);
    }
    else {
        console.log("Server Running");
    };


});


