const router = require('express').Router();
const { Blog, Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: { exclude: ['password'] }, // Exclude the password field
        },
        {
          model: Comment,
        },
      ],
    });

    // Convert the Sequelize model instance to a plain JavaScript object
    const mappedBlog = blogData ? blogData.get({ plain: true }) : null;

    if (mappedBlog) {
      res.render('blogComment', {
        ...mappedBlog,
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

router.post('/', withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const [affectedRows] = await Blog.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: '404 Blog ID not found' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/blogEdit/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: { exclude: ['password'] }, // Exclude the password field
        },
      ],
    });

    // Convert the Sequelize model instance to a plain JavaScript object
    const mappedBlog = blogData ? blogData.get({ plain: true }) : null;
    console.log(mappedBlog);

    if (mappedBlog) {
      res.render('blogEdit', {
        ...mappedBlog,
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

module.exports = router;
