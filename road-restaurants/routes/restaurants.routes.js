const router = require("express").Router();
const Restaurant = require('../models/Restaurant.model')

router.get('/restaurants/create', (req, res) => {
    res.render('restaurants/create-form')
})



router.post('/restaurants/create', (req, res) => {

    const { restaurantname, image, type, description, rating, quality, service, ambience, opinion } = req.body

    Restaurant
        .create({
            name: restaurantname,
            image,
            type,
            description,
            rating,
            ratingDetails: { qualityPrice: quality, service: service, ambience: ambience, },
            opinion
        })
        .then(newRestaurant => {
            res.redirect('/restaurants')
        })
})

router.get('/restaurants', (req, res) => {
    res.send('funcionaaaa')
})




module.exports = router