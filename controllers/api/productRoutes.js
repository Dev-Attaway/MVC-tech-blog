const router = require('express').Router();

// Defines the API URL for fetching products. It either uses the value of the API_URL environment variable or defaults to
// 'https://fakestoreapi.com/products' if the environment variable is not set.
const apiUrl = process.env.API_URL || 'https://fakestoreapi.com/products';
const withAuth = require('../../utils/auth');

router.get('/:id', withAuth, async (req, res) => {
  try {
    fetch(apiUrl).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          // The find() method iterates over each item in the data array and returns the first item for which the condition
          // (item.id == req.params.id) is true.
          //  This condition checks if the id of the item matches the id specified in the request parameters

          const singleProduct = data.find((item) => item.id == req.params.id);
          res.render('product', {
            isSingleProduct: true,
            singleProduct,
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
