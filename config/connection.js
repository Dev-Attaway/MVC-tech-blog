// Importing the Sequelize library
const Sequelize = require('sequelize');

// Importing the dotenv library to load environment variables from a .env file
require('dotenv').config();

// Declaring a variable to hold the Sequelize instance
let sequelize;

// Checking if the JAWSDB_URL environment variable exists (used in Heroku deployments)
if (process.env.JAWSDB_URL) {
  // If the JAWSDB_URL variable exists, create a Sequelize instance using the provided URL
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  // If the JAWSDB_URL variable doesn't exist, create a Sequelize instance using the local database configuration
  sequelize = new Sequelize(
    process.env.DB_NAME, // Database name
    process.env.DB_USER, // Database username
    process.env.DB_PASSWORD, // Database password
    {
      host: 'localhost', // Database host (localhost)
      dialect: 'mysql', // MySQL dialect
      port: 3306, // MySQL port
    },
  );
}

// Exporting the Sequelize instance to be used in other parts of the application
module.exports = sequelize;
