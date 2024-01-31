const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
  try {
    // create a new user using the User.create() method, which likely comes from some user model
    // (presumably defined elsewhere  in the application).
    // The data for creating the user is obtained from req.body, which is expected to contain the necessary user information

    const userData = await User.create(req.body);

    // Upon successful user creation, the user's session is saved.
    // sets the user_id and logged_in properties in the session
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json({
        smtpjs_secure_token: process.env.SECURE_TOKEN,
        ...userData,
      });
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// find a user in the database based on the provided email using User.findOne(). If no user is found
// responds with a status code of 400(Bad Request) and a JSON message.
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // request matches the hashed password stored in the database using the checkPassword() which is one of the user method (hook)
    // does this =>        newUserData.password = await bcrypt.hash(newUserData.password, 10);
    // return newUserData;
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Upon successful user creation, the user's session is saved.
    // sets the user_id and logged_in properties in the session
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(res);
  }
});

router.get('/logout', (req, res) => {
  try {
    // The session is destroyed using req.session.destroy().

    req.session.destroy(() => {
      // Then, it redirects the user to the home page ('/') using res.redirect('/').
      res.redirect('/');
      res.status(204).end();
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
