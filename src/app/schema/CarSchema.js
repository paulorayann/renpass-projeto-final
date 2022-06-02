const mongoose = require('mongoose')

const CarSchema = new mongoose.Schema ({

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
    accessories: [{
        type: String
    }],
    passengersQtd: {
        type: Number
    }
})

const Car = mongoose.model('Car', CarSchema)
module.exports = Car