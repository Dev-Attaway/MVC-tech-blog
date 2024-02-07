const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3002;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

// Session configuration object
const sess = {
  // Secret used to sign the session ID cookie
  secret: 'Super secret secret',
  // Configuration for the session cookie
  cookie: {
    // Maximum age of the session cookie in milliseconds (24 hours in this case)
    maxAge: 24 * 60 * 60 * 1000,

    // HTTP only flag to prevent client-side access to the cookie
    httpOnly: true,

    // Indicates whether the cookie should only be sent over HTTPS
    secure: false,

    // Sets the SameSite attribute of the cookie to 'strict'
    sameSite: 'strict',
  },

  // Indicates whether to save the session if it's not modified
  resave: false,
  // Indicates whether to save uninitialized sessions
  saveUninitialized: true,
  // Configuration for the session store using Sequelize
  store: new SequelizeStore({
    // Database connection instance
    db: sequelize,
  }),
};

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
