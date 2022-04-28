const req = require("express/lib/request");
const { Schema, model } = require("mongoose");

const restaurantSchema = new Schema(
    {
        name: {
            type: String, required: [true, 'El nombre del restaurante es obligatorio'],
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        image: String,
        type: {
            type: String,
            enum: ["casera", "asador", "hotel/hostal", "cafeteria/bar", "gourmet", "varios"]
        },
        place: {
            type: String,
            enum: ["en carretera", "desvio cercano", "en pueblo", "en autopista"]
        },
        description: String,
        rating: {
            type: Number,
            enum: [1, 2, 3, 4, 5],
            required: [true, 'Añade una puntuación general'],
        },
        area: {
            type: String,
        },
        province: {
            type: String,
        },
        ratingDetails: {
            qualityPrice: {
                type: Number,
                enum: [1, 2, 3, 4, 5]

            },
            service: {
                type: Number,
                enum: [1, 2, 3, 4, 5]

            },
            ambience: {
                type: Number,
                enum: [1, 2, 3, 4, 5]
            },
        },
        opinion: String,
        location: {
            type: {
                type: String
            },
            coordinates: [Number]
        },

    },
    {
        timestamps: true,
    }

);

restaurantSchema.index({ location: '2dsphere' })

const Place = model("Restaurant", restaurantSchema);
Place.syncIndexes()
module.exports = Place;

