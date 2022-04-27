const router = require("express").Router()

const Restaurant = require('../models/Restaurant.model')
const Comment = require('../models/Comment.model')

const { isLoggedIn, checkRole } = require("../utils/middlewares/route.guard")

router.get('/restaurants/create', isLoggedIn, (req, res, next) => {
    res.render('restaurants/create-form', { user: req.session.currentUser })

})

router.post('/restaurants/create', (req, res, next) => {

    const { restaurantname, image, type, place, description, rating, quality, service, ambience, opinion, longitude, latitude } = req.body

    Restaurant
        .create({
            name: restaurantname,
            image,
            type,
            place,
            description,
            rating,
            ratingDetails: { qualityPrice: quality, service: service, ambience: ambience, },
            opinion,
            location: {
                type: 'Point',
                coordinates: [longitude, latitude]
            }
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

router.get('/restaurants/details/:id', isLoggedIn, (req, res, next) => {

    const { id } = req.params

    const promise1 = Restaurant.findById(id)
    const promise2 = Comment
        .find({ restaurant: id })
        .populate('author')
        .then(response => {
            const comments = response.map(eachComment => {
                // console.log(eachComment)
                return {
                    comment: eachComment,
                    isOwned: eachComment.author._id == req.session.currentUser._id
                }
            })
            return comments
        })


    Promise
        .all([promise1, promise2])
        // .then(response => console.log(response))
        .then(([restaurant, comments]) => {
            // console.log('El restaurante --->', restaurant)
            // console.log('Los comentarios --->', comments)
            res.render('restaurants/details', { restaurant, comments })
        })
        .catch(err => console.log(err))
})

router.get('/restaurants/details/:id/edit', isLoggedIn, (req, res, next) => {

    const { id } = req.params

    Restaurant
        .findById(id)
        .then(restaurant => {
            res.render('restaurants/update-form', restaurant)
        })
        .catch(err => console.log(err))
})

router.post('/restaurants/details/:id/edit', (req, res, next) => {

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

router.post('/restaurants/:id/delete', isLoggedIn, (req, res) => {

    const { id } = req.params

    Restaurant
        .findByIdAndDelete(id)
        .then(() => {
            res.redirect('/restaurants')
        })
        .catch(err => console.log(err))
})

module.exports = router