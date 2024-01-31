const router = require('express').Router();
const userRoutes = require('./userRoutes');
const productRoutes = require('./productRoutes');
const buyRoutes = require('./buyRoutes');

router.use('/users', userRoutes);
router.use('/product', productRoutes);
router.use('/buy', buyRoutes);

module.exports = router;
