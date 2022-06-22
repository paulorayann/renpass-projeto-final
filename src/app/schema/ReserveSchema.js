const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const ReserveSchema = new mongoose.Schema(
    {
        id_user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Person',
            required: true
        },
        data_start: {
            type: String,
            required: true
        },
        data_end: {
            type: String,
            required: true
        },
        id_car: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Car',
            required: true
        },
        id_rental: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Rental',
            required: true
        },
        final_value: {
            type: Number
        }
    },
    { timestamps: false, versionKey: false }
);

ReserveSchema.plugin(mongoosePaginate);
const Reserve = mongoose.model('Reserve', ReserveSchema);
module.exports = Reserve;
