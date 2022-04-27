const router = require('express').Router()
const Restaurant = require('../models/Restaurant.model')


router.get('/api/json', (req, res) => {

    Restaurant
        .find()
        .then(restaurants => res.json(restaurants))
        .catch(err => console.log(err))
})


module.exports = router