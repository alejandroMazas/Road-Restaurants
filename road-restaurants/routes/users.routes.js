const router = require("express").Router()

const User = require('./../models/User.model')

const fileUploader = require("../config/cloudinary.config")

const { isLoggedIn, checkRole } = require('./../utils/middlewares/route.guard')

router.get('/', isLoggedIn, checkRole('ADMIN'), (req, res, next) => {

    User
        .find()
        .then(users => {
            res.render('users/list', { users })
        })
        .catch(err => next(err))
})


//User profile
router.get('/details', isLoggedIn, (req, res, next) => {

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

router.post('/details/:id/edit', fileUploader.single('updatedProfileImage'), (req, res, next) => {

    const { id } = req.params
    const { username, email, bio, password } = req.body
    const { path } = req.file

    User
        .findByIdAndUpdate(id, { username, email, bio, image: path, password })
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
            if (req.session.currentUser._id == id) {
                req.app.locals.isAdmin = false
                req.app.locals.isUser = false
                req.session.destroy(() => res.redirect('/'))

            } else if (req.session.currentUser.role === 'ADMIN') {
                res.redirect('/users')
            } else {
                req.app.locals.isUser = false
                req.session.destroy(() => res.redirect('/'))
            }

        })
        .catch(err => next(err))
});

module.exports = router;