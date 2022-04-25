const router = require("express").Router()

const User = require('./../models/User.model')

const { isLoggedIn, checkRole } = require('./../utils/middlewares/route.guard')


//User profile
router.get('/users/details/:id', (req, res, next) => {

    const { id } = req.params
    User
        .findById(id)
        .then(user => {
            res.render('users/my-profile', { user })
        })
        .catch(err => console.log(err))
})



// router.get('/users/details/:id/edit', (req, res, next) => {

//     res.render('/update-form')
// const { id } = req.params
// const { username, email, bio, password } = req.body

// User
//     .findByIdAndUpdate(id, { username, email, bio, password })
//     .then(updateUser => {
//         res.redirect('/update-form')
//     })
//     .catch(err => console.log(err))

// });

module.exports = router;