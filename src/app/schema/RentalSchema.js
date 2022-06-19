const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const uniqueValidator = require('mongoose-unique-validator');

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
                complement: {
                    type: String
                },
                street: {
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
RentalSchema.plugin(mongoosePaginate);

RentalSchema.plugin(uniqueValidator, {
    message: 'The {PATH} you have entered is already registered.'
});

const Rental = mongoose.model('Rental', RentalSchema);
module.exports = Rental;
