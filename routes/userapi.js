var db = require("../models");

module.exports = function(app){
    // Our get and post requests to the user api here
    app.get("/api/users", function(req, res) {
        // Here we add an "include" property to our options in our findAll query
        // We set the value to an array of the models we want to include in a left outer join
        // In this case, just db.Books
        db.User.findAll({
          include: [db.Books]
        }).then(function(dbUser) {
          res.json(dbUser);
        });
      });

    app.get("/api/users/:id", function(req, res) {
        // Here we add an "include" property to our options in our findOne query
        // We set the value to an array of the models we want to include in a left outer join
        // In this case, just db.Books
        db.User.findOne({
          where: {
            id: req.params.id
          },
          include: [db.Books]
        }).then(function(dbUser) {
          res.json(dbUser);
        });
      });
    
    app.post("/api/users", function(req, res) {
        db.User.create(req.body).then(function(dbUser) {
          res.json(dbUser);
        });
      });
}