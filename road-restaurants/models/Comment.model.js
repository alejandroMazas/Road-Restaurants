const { Schema, model } = require('mongoose');

const commentSchema = new Schema(
    {
        author: String,
        comment: String,
        date: date,
        likes: { likes: Number, imagen: string },
        dislikes: { dislikes: Number, imagen: string }
    },
    {
        timestamps: true
    }

)

module.exports = model('Comment', commentSchema)