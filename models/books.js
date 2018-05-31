// book model
module.exports = function(sequelize, Sequelize) {
    var Books = sequelize.define("Books", {
        //title
        title: {
            type: Sequelize.STRING,
            allowNull: false
            },
        //image
        image: {
            type: Sequelize.IMAGE,
            allowNull: false
        },
        //price
        price: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false
        },
        //pending sale
        pending: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
         //condtion 
         condition: {
             type: Sequelize.STRING,
             allowNull: false
         },
         //commenting
         description: {
             type: Sequelize.STRING
         }
    });

    //Each book belongs to one user
    Books.associate = function(models) {
        // We're saying that a book should belong to a user
        // A Book can't be created without a user due to the foreign key constraint
        Books.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };  
    return Books;
};
    

