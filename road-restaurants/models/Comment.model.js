const { Schema, model } = require('mongoose');

const commentSchema = new Schema(
    {
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        restaurant: {
            type: Schema.Types.ObjectId,
            ref: 'Restaurant'
        },
        comment: { type: String, maxlength: 150, require: true },
        date: Date,
        likes: Number,
        dislikes: Number
    },
    {
        timestamps: true
    }

)

module.exports = model('Comment', commentSchema)