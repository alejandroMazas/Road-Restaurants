const router = require("express").Router();

const bcryptjs = require('bcryptjs')
const saltRounds = 10

const fileUploader = require("../config/cloudinary.config")

const { isLoggedOut } = require('./../utils/middlewares/route.guard')

const User = require('../models/User.model')

router.get('/register', (req, res) => {
    res.render('auth/sign-up')
})

router.post('/register', fileUploader.single('profileImage'), (req, res, next) => {

    const { username, email, bio, plainPassword } = req.body
    const { path } = req.file

    bcryptjs
        .genSalt(saltRounds)
        .then(salt => bcryptjs.hash(plainPassword, salt))
        .then(hashedPassword => User.create({ username, email, password: hashedPassword, bio, image: path }))
        .then(() => res.redirect('/login'))
        .catch(err => next(err))
})


router.get('/login', (req, res) => {
    res.render('auth/login')
})


router.post('/login', (req, res, next) => {

    const { email, plainPassword } = req.body

    if (email.length === 0 || plainPassword.length === 0) {
        res.render('auth/login', { errorMessage: 'Rellena todos los campos' })
        return
    }

    User
        .findOne({ email })
        .then(user => {
            if (!user) {
                res.render('auth/login', { errorMessage: 'Usuario no reconocido' })
                return
            }

            if (!bcryptjs.compareSync(plainPassword, user.password)) {
                res.render('auth/login', { errorMessage: 'Contraseña no válida' })
                return
            }
            req.session.currentUser = user        // <= THIS means logging in a user
            if (user.role === 'ADMIN') {
                req.app.locals.isAdmin = true
            } else {
                req.app.locals.isAdmin = false
            }

            if (user.role === 'USER') {
                req.app.locals.isUser = true
            } else {
                req.app.locals.isUser = false
            }

            console.log(req.session.currentUser)
            res.redirect(`/users/details`)
        })
        .catch(err => next(err))
})


router.post('/logout', (req, res, next) => {
    req.app.locals.isAdmin = false
    req.app.locals.isUser = false
    req.session.destroy(() => res.redirect('/'))
})


module.exports = router;