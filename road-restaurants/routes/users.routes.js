// const router = require("express").Router()

// const User = require('./../models/User.model')

// const { isLoggedIn, checkRole } = require('./../utils/middlewares/route.guard')

// router.get('/users/create', (req, res) => {
//     res.render('users/new-user')

// })

// router.post('/users/create', (req, res) => {

//     const { userName, email, UserImage, bio, password } = req.body

//     User
//         .create({ userName, email, UserImage, bio, password })
//         .then(newUsername => {
//             res.redirect('/my-profile')
//         })
//         .catch(err => {
//             res.render('users/new-user')

//         })
// })

// module.exports = router;