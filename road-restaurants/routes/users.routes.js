const router = require("express").Router()

const User = require('./../models/User.model')

const { isLoggedIn, checkRole } = require('./../utils/middlewares/route.guard')

router.get('/', isLoggedIn, checkRole('ADMIN'), (req, res, next) => {

    // const isAdmin = req.session.currentUser.role === 'ADMIN'

    User
        .find()
        .then(users => {
            res.render('users/list', { users })
        })
        .catch(err => next(err))
})


//User profile
router.get('/details', isLoggedIn, (req, res, next) => {

    // const isAdmin = req.session.currentUser.role === 'ADMIN'

    const { _id } = req.session.currentUser
    User
        .findById(_id)
        .then(user => {
            res.render('users/my-profile', { user })
        })
        .catch(err => next(err))
})

router.get('/details/:id/edit', isLoggedIn, (req, res, next) => {

    const { id } = req.params

    User
        .findById(id)
        .then(user => {
            res.render('users/update-form', user)
        })
        .catch(err => next(err))
});

router.post('/details/:id/edit', (req, res, next) => {
    const { id } = req.params
    const { username, email, bio, password } = req.body

    User
        .findByIdAndUpdate(id, { username, email, bio, password })
        .then(updateUser => {
            res.redirect('/users/details')
        })
        .catch(err => next(err))
});

router.post('/details/:id/delete', isLoggedIn, (req, res, next) => {

    const { id } = req.params

    User
        .findByIdAndDelete(id)
        .then(() => {
            res.redirect('/')
        })
        .catch(err => next(err))
});

module.exports = router;