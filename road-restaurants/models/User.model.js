const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            trim: true,
            required: [true, 'El nombre de usuario es obligatorio'],
            minlength: [3, 'El nombre de usuario es demasiado corto']
        },
        email: {
            type: String,
            required: [true, 'El email es obligatorio.'],
            unique: true,
            lowercase: true,
            trim: true
        },
        image: String,
        bio: String,
        password: {
            type: String,
            required: [true, 'La contraseña es obligatoria.']
        },
        role: {
            type: String,
            enum: ['ADMIN', 'USER', 'VIEWER'],
            default: 'USER'
        }
    },
    {
        timestamps: true
    }
)

module.exports = model('User', userSchema)