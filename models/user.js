module.exports = function(sequelize, Sequelize) {
    var User = sequelize.define('User', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        firstname: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        lastname: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true
            }
        },

        password: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    //Each user has a lot of books
    User.associate = function(models) {
        // Associating Author with Posts
        // When a book is deleted, also delete any associated Posts
        User.hasMany(models.Books, {
          onDelete: "cascade"
        });
      };

    return User;
}