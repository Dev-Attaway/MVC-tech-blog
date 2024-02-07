// the other models(Comment and User) follow a similar construstion
// Importing necessary modules from sequelize for defining models and data types
const { Model, DataTypes } = require('sequelize');

// Importing the sequelize instance from the connection configuration
const sequelize = require('../config/connection');

// Defining the Blog model by extending the Model class provided by sequelize
class Blog extends Model {}

// Initializing the Blog model with its attributes and options
Blog.init(
  {
    // Definition of the id attribute with its data type, constraints, and settings
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Definition of the title attribute with its data type and constraints
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Definition of the description attribute with its data type
    description: {
      type: DataTypes.STRING,
    },
    // Definition of the date_created attribute with its data type, constraints, and default value
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    // Definition of the user_id attribute with its data type and foreign key reference
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user', // Reference to the User model
        key: 'id', // Reference to the id attribute of the User model
      },
    },
  },
  {
    // Setting the sequelize instance for the model
    sequelize,

    // Disabling timestamps for the model to prevent sequelize from managing createdAt and updatedAt fields
    timestamps: false,

    // Setting the table name to be the same as the model name to prevent sequelize from pluralizing the table name
    freezeTableName: true,

    // Using underscored naming convention for the model's attributes
    underscored: true,

    // Setting the model name explicitly
    modelName: 'blog',
  },
);

// Exporting the Blog model for use in other parts of the application
module.exports = Blog;
