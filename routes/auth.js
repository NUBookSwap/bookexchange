// ******** This file is for authentication, no need to modify

var authController = require('../controllers/authcontroller.js');
// since we need passport, we can either import it, or pass it from server.js. we do the latter

module.exports = function(app, passport) {
    app.get('/signup', authController.signup);

    app.get('/signin', authController.signin);

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/browse',
        failureRedirect: '/signup'
    }));

    app.get('/logout',authController.logout);

    app.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/browse',
 
        failureRedirect: '/signup'
    }));
    
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next(); 
        res.redirect('/signin');
    }
}