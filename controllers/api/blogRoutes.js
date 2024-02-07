// Importing the express module and creating a router instance
const router = require('express').Router();

// Importing the necessary models and middleware
const { Blog, Comment, User } = require('../../models'); // Importing models
const withAuth = require('../../utils/auth'); // Importing authentication middleware

// Route to get a specific blog post by its ID
router.get('/:id', async (req, res) => {
  try {
    // Finding the blog post by its primary key (ID) and including associated user and comments
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: { exclude: ['password'] }, // Exclude the password field from the User model
        },
        {
          model: Comment,
        },
      ],
    });

    // Converting the Sequelize model instance to a plain JavaScript object
    const mappedBlog = blogData ? blogData.get({ plain: true }) : null;

    // Rendering the blogComment template with the retrieved blog data
    if (mappedBlog) {
      res.render('blogComment', {
        ...mappedBlog,
        logged_in: req.session.logged_in,
      });
    } else {
      // Handling the case when the blog post is not found
      res.status(404).send('Blog post not found');
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Route to create a new blog post
router.post('/', withAuth, async (req, res) => {
  try {
    // Creating a new blog post with data from the request body
    const newBlog = await Blog.create({
      title: req.body.title,
      description: req.body.content,
      user_id: req.session.user_id, // Associating the blog post with the current user
    });

    // Sending a JSON response with the newly created blog post
    res.status(200).json(newBlog);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// Route to update an existing blog post by its ID
router.put('/:id', withAuth, async (req, res) => {
  try {
    // Updating the blog post with data from the request body
    const [affectedRows] = await Blog.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    // Sending an appropriate response based on the number of affected rows
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

// Route to delete a blog post by its ID
router.delete('/:id', withAuth, async (req, res) => {
  try {
    // Deleting the blog post associated with the specified ID and the current user
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    // Handling the case when the blog post is not found
    if (!blogData) {
      res.status(404).json({ message: '404 Blog ID not found' });
      return;
    }

    // Sending a JSON response with the deleted blog data
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to render the blogEdit page for editing a specific blog post
router.get('/blogEdit/:id', withAuth, async (req, res) => {
  try {
    // Finding the blog post by its ID and including associated user data
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: { exclude: ['password'] }, // Exclude the password field from the User model
        },
      ],
    });

    // Converting the Sequelize model instance to a plain JavaScript object
    const mappedBlog = blogData ? blogData.get({ plain: true }) : null;

    // Rendering the blogEdit template with the retrieved blog data
    if (mappedBlog) {
      res.render('blogEdit', {
        ...mappedBlog,
        logged_in: req.session.logged_in,
      });
    } else {
      // Handling the case when the blog post is not found
      res.status(404).send('Blog post not found');
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Exporting the router module
module.exports = router;
