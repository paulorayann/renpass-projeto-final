const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const { status } = require('../utils/enums/enums');

const FleetSchema = new mongoose.Schema(
  {
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
    status: {
      type: String,
      enum: {
        values: [...status],
        message: 'Value must be "available", "unavailable" or "rented" ',
        required: true
      }
    },
    daily_value: {
      type: Number,
      required: true
    },
    plate: {
      type: String,
      required: true,
      unique: true
    },
    __v: {
      type: Number,
      select: false
    },
    createdAt: {
      type: Date,
      default: Date.now,
      select: false
    },
    updatedAt: {
      type: Date,
      default: Date.now,
      select: false
    }
  },
  { timestamps: true }
);

FleetSchema.plugin(mongoosePaginate);
const Fleet = mongoose.model('Fleet', FleetSchema);
module.exports = Fleet;
