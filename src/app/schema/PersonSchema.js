const mongoose = require('mongoose')

const PersonSchema = new mongoose.Schema ({
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
        required: true
    },
    password: {
        type: String,
        required: true
    },
    canDrive: {
        type: String,
        enum: {
            values: ["yes", "no"],
            message: `Value must be "yes" or "no" `,
        required: true
        }
    }
},
{timestamps: false, versionKey: false}
) 

const Person = mongoose.model('Person', PersonSchema)
module.exports = Person