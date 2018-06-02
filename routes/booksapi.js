var db = require("../models");

module.exports = function (app) {
    // Our get, put, post, and delete requests to the books api here 
    app.get("/api/books", function (req, res) {
        var query= {};

        db.Books.findAll({
            where: query,
            include: [ db.User]    
        }).then(function (results) {
            res.json(results);
        });
    });

    // POST route for saving a new posts
    app.post("/api/books", function(req, res) {
        db.Books.create(req.body).then(function(results){
            res.json(results);
        });
    });
}