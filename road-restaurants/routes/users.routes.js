const router = require("express").Router()

const User = require('./../models/User.model')

const { isLoggedIn, checkRole } = require('./../utils/middlewares/route.guard')


//User profile
router.get('/users/details', (req, res, next) => {

    const { _id } = req.session.currentUser
    User
        .findById(_id)
        .then(user => {
            res.render('users/my-profile', { user })
        })
        .catch(err => console.log(err))
})


module.exports = router;