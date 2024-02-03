<<<<<<< HEAD
const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');
=======
// Import models
const User = require('./User.js');
const Product = require('./Product');

// establishes a one-to-many association where a user can have many Products.
User.hasMany(Product, {
  // The foreignKey option specifies that the user_id field in the Product model will be linking it to the User model by foreignKey: 'user_id'.
>>>>>>> 9a53ed70d64bcef68c2cff53f47635f81debb21e

User.hasMany(Blog, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

<<<<<<< HEAD
Blog.belongsTo(User, {
  foreignKey: 'user_id'
=======
// establishes the inverse of hasMany, specifying that each Product belongs to a single user
Product.belongsTo(User, {
  // The foreignKey option specifies that the user_id field in the Product model will be linking it to the User model by foreignKey: 'user_id'.

  foreignKey: 'user_id',
>>>>>>> 9a53ed70d64bcef68c2cff53f47635f81debb21e
});

Blog.hasMany(Comment,{
  foreignKey: 'blog_id'
})

Comment.belongsTo(User, {
    foreignKey: 'user_id',
})

module.exports = { User, Blog, Comment };