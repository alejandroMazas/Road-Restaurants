const router = require('express').Router()
const Restaurant = require('../models/Restaurant.model')


router.get('/json', (req, res) => {

    Restaurant
        .find()
        .then(restaurants => res.json(restaurants))
        .catch(err => console.log(err))
})

router.get('/:id/json', (req, res) => {

    const { id } = req.params

    Restaurant
        .findById(id)
        .then(restaurant => res.json(restaurant))
        .catch(err => console.log(err))
})


module.exports = router