// Importing the express module and creating a router instance
const router = require('express').Router();

// Importing other route modules
const blogRoutes = require('./blogRoutes'); // Importing routes related to blogs
const commentRoutes = require('./commentRoutes'); // Importing routes related to comments
const userRoutes = require('./userRoutes'); // Importing routes related to users

// Using the imported route modules for specific path prefixes
router.use('/blogs', blogRoutes); // Mounting blogRoutes for paths like '/blogs'
router.use('/comments', commentRoutes); // Mounting commentRoutes for paths like '/comments'
router.use('/users', userRoutes); // Mounting userRoutes for paths like '/users'

// Exporting the router module
module.exports = router;
