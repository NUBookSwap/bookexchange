var db = require("../models");

module.exports = function (app) {
    // Our get, put, post, and delete requests to the books api here 
    app.get("/api/books", function (req, res) {
        var query = {};
    
        db.Books.findAll({
            where: query,
            include: [db.User]
        }).then(function(dbPost) {
            res.json(dbPost);
        });
    });

    // POST route for saving a new posts
    app.post("/api/books", function(req, res) {
        var UserId = req.user.id;
        var name = req.user.firstname;
        var email = req.user.email;
        var image = req.body.image;
        var title = req.body.title;
        var price = req.body.price;
        var condition = req.body.condition;
        var description = req.body.description;
        var newBook = {
            image: image,
            title: title,
            price: price,
            condition: condition,
            description: description,
            UserId: UserId,
            name: name,
            email: email
        }

        db.Books.create(newBook).then(function(results){
            res.json(results);
        });
    });
}