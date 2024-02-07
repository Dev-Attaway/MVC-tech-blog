// Importing the express module and creating a router instance
const router = require('express').Router();

// Importing the User model for user-related operations
const { User } = require('../../models');

// Route to handle user registration
router.post('/', async (req, res) => {
  try {
    // Creating a new user with data from the request body
    const userData = await User.create(req.body);

    // Saving user session data
    req.session.save(() => {
      req.session.user_id = userData.id; // Setting the user ID in the session
      req.session.logged_in = true; // Marking the user as logged in

      // Sending a JSON response with user data
      res.status(200).json(userData);
    });
  } catch (err) {
    // Handling errors by sending a 400 (Bad Request) response with the error message
    res.status(400).json(err);
  }
});

// Route to handle user login
router.post('/login', async (req, res) => {
  try {
    // Finding a user by username
    const userData = await User.findOne({
      where: { username: req.body.username },
    });

    // If no user is found with the provided username
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    // Checking if the provided password matches the user's stored password
    const validPassword = await userData.checkPassword(req.body.password);

    // If the password is incorrect
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    // Saving user session data
    req.session.save(() => {
      req.session.user_id = userData.id; // Setting the user ID in the session
      req.session.logged_in = true; // Marking the user as logged in

      // Sending a JSON response to indicate successful login
      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    // Handling errors by sending a 400 (Bad Request) response with the error message
    res.status(400).json(err);
  }
});

// Route to handle user logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    // Destroying the session to log the user out
    req.session.destroy(() => {
      res.status(204).end(); // Sending a 204 (No Content) response
    });
  } else {
    // Logging a message to indicate that the user is not logged in
    console.log('User is not logged in');
    res.status(404).end(); // Sending a 404 (Not Found) response
  }
});

// Exporting the router module
module.exports = router;
