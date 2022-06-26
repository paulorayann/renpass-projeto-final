const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const mongoosePaginate = require('mongoose-paginate-v2');
const { canDrive } = require('../utils/enums/enums');

const PersonSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    cpf: {
      type: String,
      required: true,
      unique: true
    },
    birthday: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    canDrive: {
      type: String,
      enum: {
        values: [...canDrive],
        message: 'Value must be "yes" or "no" ',
        required: true
      }
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

PersonSchema.pre('save', async function pass(next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

PersonSchema.plugin(mongoosePaginate);

const Person = mongoose.model('Person', PersonSchema);

module.exports = Person;
