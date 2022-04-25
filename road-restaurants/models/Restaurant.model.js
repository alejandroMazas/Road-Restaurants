const { Schema, model } = require("mongoose");

const restaurantSchema = new Schema(
    {
        name: String,
        image: String,
        type: {
            type: String,
            enum: ["Casera", "Asador", "Hotel/Hostal", "Cafeteria/Bar", "Gourmet", "Varios"]
        },
        place: {
            type: String,
            enum: ["En carretera", "Desvio cercano", "En pueblo", "Desvio lejos"]
        },
        description: String,
        rating: {
            type: Number,
            enum: [1, 2, 3, 4, 5]
        },
        ratingDetails: [{
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
        }],
        opinion: String,
        location: {
            type: {
                type: String
            },
            coordinates: [Number]
        },
        ratingComments: [{
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }]
    },
    {
        timestamps: true,
    }

);

restaurantSchema.index({ location: '2dsphere' })

const Place = model("Restaurant", restaurantSchema);

module.exports = Place;

