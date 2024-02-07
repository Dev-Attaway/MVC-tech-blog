const router = require('express').Router();
const { User, Blog, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: { exclude: ['password'] }, // Exclude the password field from the User model
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: { exclude: ['password'] }, // Exclude the password field from the associated User model in the Comment model
            },
          ],
        },
      ],
    });

    // Convert the Sequelize model instance to a plain JavaScript object
    const mappedBlogs = blogData.map((blog) => blog.get({ plain: true }));

    if (mappedBlogs) {
      res.render('homepage', {
        mappedBlogs,
        logged_in: req.session.logged_in,
      });
    } else {
      // Handle case when blog post is not found
      res.status(404).send('Blog post not found');
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: {
        exclude: ['password'],
      },
      include: [
        {
          model: Blog,
        },
      ],
    });

    const user = userData.get({
      plain: true,
    });

    console.log(user);
    res.render('dashboard', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

router.get('/signUp', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/signup');
    return;
  }
  res.render('signUp');
});

router.get('/blogCreate', withAuth, (req, res) => {
  try {
    res.render('createBlog', {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
