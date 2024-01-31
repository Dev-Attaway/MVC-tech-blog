const router = require('express').Router();
const { User, Product } = require('../models');
const withAuth = require('../utils/auth');
const apiUrl = process.env.API_URL || 'https://fakestoreapi.com/products';

// This route is defined as a GET request to '/profile'.
// It utilizes the withAuth middleware, user must be authenticated to access their profile page.
router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      //  used to specify that the password should be excluded from the retrieved user data.
      // This is a security measure to avoid sending sensitive information
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Product,
          attributes: ['product_name'],
        },
      ],
    });

    // Once the user data is fetched, it is converted to a plain JS object using .get({ plain: true }).
    const user = userData.get({ plain: true });

    // The user data and a boolean flag logged_in (set to true) are passed
    // to the rendering engine to render the 'profile' template.
    res.render('profile', {
      user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// This route is defined as a GET request to '/' the root of the page
router.get('/', async (req, res) => {
  try {
    // Fetch data from the API
    const response = await fetch(apiUrl);
    if (response.ok) {
      // Parse the JSON response
      const data = await response.json();

      // Assign data to products array
      const products = data;

      // Render the homepage template with logged_in status and products array
      res.render('homepage', {
        logged_in: req.session.logged_in,
        products,
      });
    } else {
      // HTTP status of the response to the same status received from the API (response.status) and sends a simple error message to the client.

      console.log('Error: ' + response.statusText);
      res.status(response.status).send('Error: ' + response.statusText);
    }
  } catch (err) {
    // Log any caught errors

    console.log(err);

    // Send a 500 status response with the error details

    res.status(500).json(err);
  }
});

// render the login page if the user is not already logged in
router.get('/login', (req, res) => {
  try {
    // If the user is logged in then
    // the route redirects the user to the /profile route using res.redirect('/profile').
    // The return statement is used to exit the function after the redirect to prevent further execution of code.

    if (req.session.logged_in) {
      res.redirect('/profile');
      return;
    }

    // If the user is not logged in (req.session.logged_in is falsey),
    // the route renders the signup page using res.render('login').

    res.render('login');
  } catch (err) {
    res.status(500).json(err);
  }
});

// serves to render the signup page if the user is not already logged in.
router.get('/signup', (req, res) => {
  try {
    // If the user is logged in
    // it redirects the user to the / profile route using res.redirect('/profile').

    if (req.session.logged_in) {
      res.redirect('/profile');
      return;
    }
    // If the user is not logged in (req.session.logged_in is falsey),
    // the route renders the signup page using res.render('signup').
    res.render('signup');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
