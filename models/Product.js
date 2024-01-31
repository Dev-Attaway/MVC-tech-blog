const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Product extends Model {}

Product.init(
  {
    // An auto-incrementing integer, the primary key.
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // An integer representing the price of the product
    product_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // A string representing the name of the product.
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // A string representing the name of the description.
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // A string representing the name of the product_img.
    product_img: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // integer  representing the foreign key that links this product to a user from the User Model
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
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
    modelName: 'product',
  }
);

module.exports = Product;
