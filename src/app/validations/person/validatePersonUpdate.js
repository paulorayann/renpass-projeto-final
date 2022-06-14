const Joi = require('joi').extend(require('@joi/date'));
const ageValidation = require('../../utils/ageValidation');
const { cpfValid } = require('../../utils/regex');

module.exports = async (req, res, next) => {
    try {
        const person = Joi.object({
            name: Joi.string().trim(),

            cpf: Joi.string()
                .trim()
                .min(11)
                .max(14)
                .regex(cpfValid)
                .message(
                    'The CPF field has an invalid format, please try XXX.XXX.XXX-XX and use numbers only'
                ),

            birthday: Joi.date()

                .format('DD/MM/YYYY')
                .max('now')
                .custom((value, help) => {
                    if (ageValidation(value) === false) {
                        return help.message('User must be at least 18');
                    }
                }),
            email: Joi.string().trim().email(),
            password: Joi.string().trim().min(6),
            canDrive: Joi.string().trim().valid('yes', 'no')
        });

        const { error } = await person.validate(req.body, {
            abortEarly: true,
            allowUnknown: false
        });

        if (error)
            throw {
                message: 'Bad Request',
                details: [{ message: error.message }]
            };

        return next();
    } catch (error) {
        return res.status(400).json({
            description: error.details[0].message,
            message: error.message
        });
    }
};
