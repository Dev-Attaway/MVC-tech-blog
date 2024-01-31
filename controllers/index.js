const router = require('express').Router();

// It imports two routes: apiRoutes and homeRoutes using require('./api') and require('./homeRoutes')
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

// The router mounts homeRoutes and apiRoutes
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;
