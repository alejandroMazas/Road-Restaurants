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
        traveler: {
            type: String,
            enum: ["Profesional", "Viajero asiduo", "Escapadas", "Por placer", "Enfermo de la carretera", "Dominguero", "Sedentario"]
        },
        foodie: {
            type: String,
            enum: ["Bon vivant", "Gourmet", "Vegetarian", "Vegan", "Meat lover", "Foodie", "Realfooder"]
        },
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