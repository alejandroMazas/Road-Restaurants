const { Schema, model } = require('mongoose');

const commentSchema = new Schema(
    {
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
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