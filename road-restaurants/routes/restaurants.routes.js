const router = require("express").Router();
const Restaurant = require('../models/Restaurant.model')
const Comment = require('../models/Comment.model')

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

    const promise1 = Restaurant.findById(id)
    const promise2 = Comment.find({ restaurant: id }).populate('author')

    Promise
        .all([promise1, promise2])
        .then(([restaurant, comments]) => {
            // console.log('El restaurante --->', restaurant)
            // console.log('Los comentarios --->', comments)
            res.render('restaurants/details', { restaurant, comments })
        })
        .catch(err => console.log(err))


    //     Restaurant
    //         .findById(id)
    //         .then(restaurant => {
    //             res.render('restaurants/details', restaurant)
    //         })
    //         .catch(err => console.log(err))
})




module.exports = router