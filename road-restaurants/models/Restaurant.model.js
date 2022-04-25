const { Schema, model } = require("mongoose");

const restaurantSchema = new Schema(
    {
        restaurantName: String,
        restaurantImage: String ,
        restaurantType: {
            type: String,
            enum: ["Casera", "Asador", "Hotel/Hostal", "Cafeteria/Bar", "Gourmet", "Varios"]
        },
        restaurantLocation: {
            type: String,
            enum: ["En carretera", "Desvio cercano", "En pueblo", "Desvio lejos"]
        },
        restaurantDescription: String,
        restaurantRating: {
            type: String,
            enum: ["1", "2", "3", "4", "5"]

        },
        restaurantRatingDetails: [{
            restaurantQualityPrice: {
                type: String,
                enum: ["1", "2", "3", "4", "5"]

            },
            restaurantService: {
                type: String,
                enum: ["1", "2", "3",  "4", "5"]

            },
            restaurantAmbience: {
                type: String,
                enum: ["1", "2", "3", "4", "5"]

            },

        }],
        restaurantComments: { type: String },
        ratingComments: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        
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

const Place = model("Restaurant", restauranStchema);

module.exports = Place;

