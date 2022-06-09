const mongoose = require('mongoose');
const uniqueArrayPlugin = require('mongoose-unique-array');
const mongoosePaginate = require('mongoose-paginate-v2');

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
        color: {
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
                    required: true
                }
            }
        ],
        passengersQtd: {
            type: Number
        }
    },
    { timestamps: false, versionKey: false }
);

CarSchema.plugin(mongoosePaginate);
CarSchema.plugin(uniqueArrayPlugin);

const Car = mongoose.model('Car', CarSchema);
Car.paginate().then({});

module.exports = Car;
