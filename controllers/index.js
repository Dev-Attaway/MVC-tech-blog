// Importing the express module and creating a router instance
const router = require('express').Router();

// Importing the API routes and home routes modules
const apiRoutes = require('./api'); // This module contains API routes
const homeRoutes = require('./homeRoutes'); // This module contains routes for the homepage and other frontend routes

// Using the homeRoutes for the root path '/' and apiRoutes for the '/api' path
router.use('/', homeRoutes); // Mounting homeRoutes for paths like '/'
router.use('/api', apiRoutes); // Mounting apiRoutes for paths like '/api'

// Exporting the router module
module.exports = router;
