const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        userName: String,
        email: String,
        userImage: String,
        bio: String,
        password: String,

        role: {
            type: String,
            enum: ['ADMIN', 'USER', 'VIEWER'],
            default: 'USER'
        },
        comments: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    {
        timestamps: true
    }

)

module.exports = model('User', userSchema)