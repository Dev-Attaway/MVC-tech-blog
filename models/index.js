// Import models
const User = require('./User.js');
const Product = require('./Product');

// establishes a one-to-many association where a user can have many products.
User.hasMany(Product, {
  // The foreignKey option specifies that the user_id field in the Product model will be linking it to the User model by foreignKey: 'user_id'.

  foreignKey: 'user_id',
});

// establishes the inverse of hasMany, specifying that each product belongs to a single user
Product.belongsTo(User, {
  // The foreignKey option specifies that the user_id field in the Product model will be linking it to the User model by foreignKey: 'user_id'.

  foreignKey: 'user_id',
});

module.exports = { User, Product };
