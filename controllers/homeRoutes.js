// Importing required modules and models
const router = require('express').Router();
const { User, Blog, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Route for rendering the homepage
router.get('/', async (req, res) => {
  try {
    // Fetching all blog data including associated users and comments
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: { exclude: ['password'] }, // Excluding the password field from the User model
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: { exclude: ['password'] }, // Excluding the password field from the associated User model in the Comment model
            },
          ],
        },
      ],
    });

    // Mapping the Sequelize model instances to plain JavaScript objects
    const mappedBlogs = blogData.map((blog) => blog.get({ plain: true }));

    // Rendering the homepage template with the fetched blog data
    if (mappedBlogs) {
      res.render('homepage', {
        mappedBlogs,
        logged_in: req.session.logged_in,
      });
    } else {
      // Handling the case when no blog posts are found
      res.status(404).send('Blog post not found');
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Route for rendering the dashboard page, requires authentication
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Fetching user data along with associated blogs
    const userData = await User.findByPk(req.session.user_id, {
      attributes: {
        exclude: ['password'], // Excluding the password field from the user model
      },
      include: [
        {
          model: Blog,
        },
      ],
    });

    // Converting user data to a plain JavaScript object
    const user = userData.get({ plain: true });

    // Rendering the dashboard template with user data
    res.render('dashboard', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Route for rendering the login page
router.get('/login', (req, res) => {
  // Redirecting to the profile page if user is already logged in
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  // Rendering the login page
  res.render('login');
});

// Route for rendering the sign-up page
router.get('/signUp', (req, res) => {
  // Redirecting to the signup page if user is already logged in
  if (req.session.logged_in) {
    res.redirect('/signup');
    return;
  }
  // Rendering the sign-up page
  res.render('signUp');
});

// Route for rendering the create blog page, requires authentication
router.get('/blogCreate', withAuth, (req, res) => {
  try {
    // Rendering the create blog page
    res.render('createBlog', {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
});

// Exporting the router module
module.exports = router;
