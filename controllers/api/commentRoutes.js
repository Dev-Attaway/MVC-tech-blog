// Importing the express module and creating a router instance
const router = require('express').Router();

// Importing the Comment model and authentication middleware
const { Comment } = require('../../models'); // Importing the Comment model
const withAuth = require('../../utils/auth'); // Importing the authentication middleware

// Route to create a new comment
router.post('/', withAuth, async (req, res) => {
  try {
    // Creating a new comment with data from the request body and associating it with the current user
    const newComment = await Comment.create({
      ...req.body, // Using spread syntax to include all properties from the request body
      user_id: req.session.user_id, // Associating the comment with the current user
    });

    // Converting the Sequelize model instance to a plain JavaScript object
    const comment = newComment.get({ plain: true });

    // Sending a JSON response with the newly created comment
    res.json(comment);
  } catch (err) {
    // Handling errors by sending a 500 (Internal Server Error) response with the error message
    res.status(500).json(err);
  }
});

// Exporting the router module
module.exports = router;
