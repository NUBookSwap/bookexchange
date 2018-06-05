var db = require("../models");

module.exports = function (app) {
    // Our get, put, post, and delete requests to the books api here 
    app.get("/api/books", function(req, res) {
        if(req.query['title']){
            console.log("got stuff");
            console.log(req.query);
            console.dir(req.query);
            flag = true;
            db.Books.findAll({
                where: req.query,
                include: [db.User]
            }).then(function(results){
                res.json(results);
            }); 
        }
        else{
            var query = {};
    
            db.Books.findAll({
                where: query,
                include: [db.User]
            }).then(function(results) {
                res.json(results);
            });
        }
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
            res.redirect('/profile/' + req.user.id);
        });
    });

    app.get("/api/books/:id", function(req, res) {
        db.Books.findOne({
            where: {
                id: req.params.id
            },
            include: [db.User]
        }).then(function(results) {
            res.json(results);
        });
    });


app.delete("/api/books/:id", function(req, res) {
    db.Books.destroy({
        where: {
            id: req.params.id
        }
    }).then(function(dbBooks){
        res.json(dbBooks);
    });
});

app.put("/api/books",function(req, res) {
    db.Books.update(
        req.body,
        {
            where: {
                id: req.body.id
            }
        }
    ).then(function(results) {
        res.json(results);     
    });       
});
}
