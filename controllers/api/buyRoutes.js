const router = require('express').Router();

// Defines the API URL for fetching products. It either uses the value of the API_URL environment variable or defaults to
// 'https://fakestoreapi.com/products' if the environment variable is not set.
const apiUrl = process.env.API_URL || 'https://fakestoreapi.com/products';
const withAuth = require('../../utils/auth');

// { Product }: Destructures the Product model from the models directory.
const { Product } = require('../../models');

router.get('/:id', withAuth, async (req, res) => {
  try {
    fetch(apiUrl).then(function (response) {
      if (response.ok) {
        response.json().then(async function (data) {
          // The find() method iterates over each item in the data array and returns the first item for which the condition
          // (item.id == req.params.id) is true.
          //  This condition checks if the id of the item matches the id specified in the request parameters

          const singleProductData = data.find(
            (item) => item.id == req.params.id
          );

          // ethod is called to create a new product in the database.
          // The attributes of the product include product_name, product_img, product_price, and user_id.
          // These values are obtained from the singleProductData fetched from the API and the user_id stored in the session.
          const purchasedProduct = await Product.create({
            product_name: singleProductData.title,
            product_img: singleProductData.image,
            product_price: singleProductData.price,
            user_id: req.session.user_id,
          });

          // Once the product is successfully created, purchasedProduct.get({ plain: true })
          // is called to retrieve a plain JavaScript object representation of the purchased product.
          const simplifiedPurchasedProduct = purchasedProduct.get({
            plain: true,
          });

          // res.render() method is called to render the purchased view.
          // The object simplifiedPurchasedProduct is spread into the render method to pass its properties to the view,
          // allowing the view template to access and display the purchased product data.
          res.render('purchased', {
            ...simplifiedPurchasedProduct,
          });
        });
      } else {
        res.status(404).json({ message: 'Product not found!' });
      }
    });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

module.exports = router;
