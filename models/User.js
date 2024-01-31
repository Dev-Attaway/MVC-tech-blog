const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    // An auto-incrementing integer, the primary key.
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // A string representing the name of the user.
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // A string representing the email of the user.
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    // A string representing the password of the user.
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    /* 
   hook is executed before creating a new user in the database. It takes the newUserData object, which contains the user's data
   It hashes the user's password using bcrypt.hash() function.
   The salt round used for hashing is 10
   */

    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10
        );
        return updatedUserData;
      },
    },

    // sequelize: Specifies the Sequelize instance to use.
    // timestamps: Indicates whether to include timestamp fields in the table.
    // In this case, it's set to false, meaning no createdAt and updatedAt fields will be added.

    // freezeTableName: Prevents Sequelize from pluralizing the table name.
    // underscored: Converts camel-cased attribute names to snake case for the table column names.
    // modelName: Sets the model name to 'product'.
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;
