var db = require("../models");
/************ */
// Our routes to the different pages should go in this file
/************** */

module.exports = function(app) {
 // the root path will just take us to the dashboard.hbs view/send user name
    app.get('/', isLoggedIn, function(req, res) {
        res.render("dashboard",{user: req.user});
    });
 //this path will take us to the profile.hbs view/send user name
    app.get('/profile/:userid', isLoggedIn, function(req, res){
        res.render("profile", {user:req.user});
    });
// this path will take us to the add.hbs view/send user name
    app.get('/add', isLoggedIn, function(req, res){
        res.render("add", {user:req.user});
    });
//this path will take us to the browse.hbs view/send user name
    app.get('/browse', isLoggedIn, function(req, res){
        res.render("browse", {user:req.user});
    });
    
    app.get("/search/:query/:id", isLoggedIn, function(req, res){
        res.render("show", {user: req.user});
    });
//this path will take us to the search.hbs view/send user name
    app.get('/search/:searchterm', isLoggedIn, function(req, res){
        res.render("search", {user:req.user});
    });
//this path will take us to the edit.hbs view/send user name
    app.get('/edit/:bookid', isLoggedIn, function(req, res){
        res.render("edit", {user:req.user});
    });
//this path will take us to the show.hbs view/send user name
    app.get('/browse/:bookid', isLoggedIn, function(req, res){
        res.render("show", {user:req.user});
    });
//this path will take us to the show.hbs view/send user name
    app.get('/search/:searchterm/:bookid', isLoggedIn, function(req, res){
        res.render("show", {user:req.user});
    });

// This is a middleware. 
// This checks to make sure the user is logged in
// before allowing them to continue to the page 

    // **** This should be put in every get request in this file
    function isLoggedIn(req, res, next) {
        if(req.isAuthenticated()){
            return next();
        }
        // if the user is not logged in, redirect them to signup
        res.redirect('/signup');
    }
};