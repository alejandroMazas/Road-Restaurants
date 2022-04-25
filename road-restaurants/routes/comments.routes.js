const router = require("express").Router();

const Comment = require('../models/Comment.model')



router.post('/comment/create', (req, res) => {

    const { author, comment, date, likes, dislikes } = req.body

    Comment

        .create({ author, comment, date, likes, dislikes })
        .then(newComment => {
            //res.redirect()
        })
        .catch(err => console.log(err))

})



module.exports = router;