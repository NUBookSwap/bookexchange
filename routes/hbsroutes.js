var db = require("../models");
/************ */
// Our routes to the different pages should go in this file
/************** */

module.exports = function(app) {
    app.get('/', isLoggedIn, function(req, res) {

        // the root path will just take us to the dashboard.hbs view
        // and also send the user name
        res.render("dashboard",{user: req.user});
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