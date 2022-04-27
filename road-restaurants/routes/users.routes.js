const router = require("express").Router()

const User = require('./../models/User.model')

const { isLoggedIn, checkRole } = require('./../utils/middlewares/route.guard')

router.get('/users/details', isLoggedIn, (req, res, next) => {

    const { _id } = req.session.currentUser
    User
        .findById(_id)
        .then(user => {
            res.render('users/my-profile', { user })
        })
        .catch(err => console.log(err))
})

router.get('/users/details/:id/edit', isLoggedIn, (req, res, next) => {
  
    const { id } = req.params

    User
        .findById(id)
        .then(user => {
            res.render('users/update-form', user)
        })
        .catch(err => console.log(err))

});

router.post('/users/details/:id/edit', (req, res, next) => {
    
    const { id } = req.params
    const { username, email, bio, password } = req.body

    User
        .findByIdAndUpdate(id, { username, email, bio, password })
        .then(updateUser => {
            res.redirect('/users/details')
        })
        .catch(err => console.log(err))

});

router.post('/users/details/:id/delete', isLoggedIn, (req, res, next) => {

    const { id } = req.params

    User
        .findByIdAndDelete(id)
        .then(() => {
            res.redirect('/')
        })
        .catch(err => console.log(err))

});

module.exports = router;