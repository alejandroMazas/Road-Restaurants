const router = require("express").Router();


router.use('/', require('./auth.routes.js'))

router.use('/', require('./users.routes.js'))

router.use('/', require('./comments.routes.js'))

router.use('/', require('./restaurants.routes.js'))

router.use('/', require('./api.routes.js'))

module.exports = router;