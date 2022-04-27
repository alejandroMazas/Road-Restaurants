const router = require("express").Router();
const Restaurant = require('../models/Restaurant.model')
const Comment = require('../models/Comment.model');
const { isLoggedIn, checkRole } = require("../utils/middlewares/route.guard");

router.get('/create', isLoggedIn, (req, res, next) => {
    res.render('restaurants/create-form')



})

router.post('/create', (req, res, next) => {


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
            res.redirect('/')
        })
        .catch(err => next(err))
})

router.get('/', (req, res) => {

    // const isAdmin = req.session.currentUser.role === 'ADMIN'

    Restaurant
        .find()
        .then(restaurants => {
            res.render('restaurants/list', { restaurants })
        })
        .catch(err => next(err)) })

router.get('/details/:id', isLoggedIn, (req, res, next) => {

    // const isAdmin = req.session.currentUser.role === 'ADMIN'
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
        .catch(err => next(err))

})

router.get('/details/:id/edit', isLoggedIn, (req, res, next) => {

    // const isAdmin = req.session.currentUser.role === 'ADMIN'
    const { id } = req.params

    Restaurant
        .findById(id)
        .then(restaurant => {
            res.render('restaurants/update-form', restaurant)
        })
        .catch(err => next(err)) })

router.post('/details/:id/edit', (req, res, next) => {

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
        .catch(err => next(err)) })

router.post('/:id/delete', isLoggedIn, (req, res) => {

    const { id } = req.params

    Restaurant
        .findByIdAndDelete(id)
        .then(() => {
            res.redirect('/restaurants')
        })
        .catch(err => next(err)) })

module.exports = router