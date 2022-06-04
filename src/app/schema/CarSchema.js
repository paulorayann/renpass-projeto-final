const mongoose = require('mongoose');
const uniqueArrayPlugin = require('mongoose-unique-array');

const CarSchema = new mongoose.Schema(
    {
        model: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        brand: {
            type: String,
            required: true
        },
        year: {
            type: String,
            required: true
        },
        accessories: [
            {
                description: {
                    type: String,
                    unique: true
                }
            }
        ],
        passengersQtd: {
            type: Number
        }
    },
    { timestamps: false, versionKey: false }
);

CarSchema.plugin(uniqueArrayPlugin);
const Car = mongoose.model('Car', CarSchema);
module.exports = Car;
