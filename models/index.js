// Importing the User model
const User = require('./User');

// Importing the Blog model
const Blog = require('./Blog');

// Importing the Comment model
const Comment = require('./Comment');

// Defining associations between models using Sequelize's association methods

// A user can have many blogs (one-to-many relationship)
User.hasMany(Blog, {
  foreignKey: 'user_id', // Defines the foreign key in the Blog model
  onDelete: 'CASCADE', // Specifies that if a user is deleted, all associated blogs should be deleted as well
});

// Each blog belongs to a user (one-to-one relationship)
Blog.belongsTo(User, {
  foreignKey: 'user_id', // Defines the foreign key in the Blog model
});

// A blog can have many comments (one-to-many relationship)
Blog.hasMany(Comment, {
  foreignKey: 'blog_id', // Defines the foreign key in the Comment model
  onDelete: 'CASCADE', // Specifies that if a Blog is deleted, all associated Comment should be deleted as well
});

// Each comment belongs to a user (one-to-one relationship)
Comment.belongsTo(User, {
  foreignKey: 'user_id', // Defines the foreign key in the Comment model
});

// Exporting the User, Blog, and Comment models along with their associations
module.exports = { User, Blog, Comment };
