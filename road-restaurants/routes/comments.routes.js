const router = require("express").Router();

const Comment = require('../models/Comment.model')
const { isLoggedIn, checkRole } = require("../utils/middlewares/route.guard");

router.post('/comment/:id/create', isLoggedIn, (req, res) => {

    const { comment } = req.body
    const { id } = req.params   // id del restaurante
    const userId = req.session.currentUser._id  // id del autor

    Comment

        .create({ author: userId, restaurant: id, comment, date: new Date() })
        .then(newComment => {
            res.redirect(`/restaurants/details/${id}`)
        })
        .catch(err => console.log(err))

})


router.post('/comment/:restaurantId/delete/:commentId', (req, res) => {

    const { restaurantId, commentId } = req.params

    Comment
        .findByIdAndDelete(commentId)
        .then(() => {
            res.redirect(`/restaurants/details/${restaurantId}`)
        })
        .catch(err => console.log(err))
})



module.exports = router;