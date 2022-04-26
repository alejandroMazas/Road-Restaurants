const router = require("express").Router();

const Comment = require('../models/Comment.model')

router.post('/comment/create', (req, res) => {

    const { comment } = req.body
    const userId = req.session.currentUser._id

    Comment
        .create({ author: userId, comment, date: new Date()})
        .then(newComment => {
            res.render('restaurants/list')
        })
        .catch(err => console.log(err))

})

module.exports = router;