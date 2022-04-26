const router = require("express").Router();
const Restaurant = require('../models/Restaurant.model')

router.get('/restaurants/create', (req, res) => {
    res.render('restaurants/create-form')
})



router.post('/restaurants/create', (req, res) => {

    const { restaurantname, image, type, place, description, rating, quality, service, ambience, opinion } = req.body

    Restaurant
        .create({
            name: restaurantname,
            image,
            type,
            place,
            description,
            rating,
            ratingDetails: { qualityPrice: quality, service: service, ambience: ambience, },
            opinion
        })
        .then(newRestaurant => {
            res.redirect('/restaurants')
        })
        .catch(err => console.log(err))
})

router.get('/restaurants', (req, res) => {

    Restaurant
        .find()
        .then(restaurants => {
            res.render('restaurants/list', { restaurants })
        })
        .catch(err => console.log(err))
})

router.get('/restaurants/details/:id', (req, res) => {

    const { id } = req.params

    Restaurant
        .findById(id)
        .then(restaurant => {
            res.render('restaurants/details', restaurant)
        })
        .catch(err => console.log(err))
})

router.get('/restaurants/details/:id/edit', (req, res) => {

    const { id } = req.params

    Restaurant
        .findById(id)
        .then(restaurant => {
            res.render('restaurants/update-form', restaurant)
        })
        .catch(err => console.log(err))
})

router.post('/restaurants/details/:id/edit', (req, res) => {

    const { id } = req.params

    const { restaurantname, image, type, place, description, rating, quality, service, ambience, opinion } = req.body

    Restaurant
        .findByIdAndUpdate(id, {
            name: restaurantname,
            image,
            type,
            place,
            description,
            rating,
            ratingDetails: { qualityPrice: quality, service: service, ambience: ambience, },
            opinion
        }, { new: true })
        .then(restaurant => {
            res.redirect(`/restaurants/details/${restaurant.id}`)
        })
        .catch(err => console.log(err))
})

router.post('/restaurants/:id/delete', (req, res) => {

    const { id } = req.params

    Restaurant
        .findByIdAndDelete(id)
        .then(() => {
            res.redirect('/restaurants')
        })
        .catch(err => console.log(err))
})


module.exports = router