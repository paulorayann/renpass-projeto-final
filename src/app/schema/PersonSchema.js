const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const mongoosePaginate = require('mongoose-paginate-v2');

const PersonSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        cpf: {
            type: String,
            required: true
        },
        birthday: {
            type: Date,
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
            required: true
        },
        canDrive: {
            type: String,
            enum: {
                values: ['yes', 'no'],
                message: 'Value must be "yes" or "no" ',
                required: true
            }
        }
    },
    { timestamps: false, versionKey: false }
);

PersonSchema.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});
PersonSchema.plugin(mongoosePaginate);

const Person = mongoose.model('Person', PersonSchema);
Person.paginate().then({});

module.exports = Person;
