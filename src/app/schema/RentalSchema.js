const mongoose = require('mongoose');

const RentalSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        cnpj: {
            type: String,
            required: true,
            unique: true
        },
        activities: {
            type: String,
            required: true
        },
        address: [
            {
                cep: {
                    type: String,
                    required: true
                },
                number: {
                    type: String,
                    required: true
                },
                isFilial: {
                    type: Boolean,
                    required: true
                },
                street: {
                    type: String
                },
                complement: {
                    type: String
                },
                district: {
                    type: String
                },
                city: {
                    type: String
                },
                state: {
                    type: String
                },
                _id: false
            }
        ]
    },
    { timestamps: false, versionKey: false }
);

const Rental = mongoose.model('Rental', RentalSchema);
module.exports = Rental;
