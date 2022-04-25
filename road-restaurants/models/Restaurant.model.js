const { Schema, model } = require("mongoose");

const restaurantSchema = new Schema(
    {
        restaurantName: { type: String },
        restaurantImage: { type: String },
        restaurantType: {
            type: String,
            enum: ["Casera", "Asador", "Hotel/Hostal", "Cafeteria/Bar", "Gourmet", "Varios"]
        },
        restaurantLocation: {
            type: String,
            enum: ["En carretera", "Desvio cercano", "En pueblo", "Desvio lejos"]
        },
        restaurantDescription: { type: String },
        restaurantRating: {
            type: String,
            enum: ["1", "2", "4", "3", "4", "5"]

        },
        restaurantRatingDetails: [{
            restaurantQualityPrice: {
                type: String,
                enum: ["1", "2", "4", "3", "4", "5"]

            },
            restaurantService: {
                type: String,
                enum: ["1", "2", "4", "3", "4", "5"]

            },
            restaurantMaintenace: {
                type: String,
                enum: ["1", "2", "4", "3", "4", "5"]

            },

        }],
        restaurantComments: { type: String },

        location: {
            type: {
                type: String
            },
            coordinates: [Number]
        },
        ratingText: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    {
        timestamps: true,
    }

);

restaurantSchema.index({ location: '2dsphere' })

const Place = model("Restaurant", restauranStchema);

module.exports = Place;

