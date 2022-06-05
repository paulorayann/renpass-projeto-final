const Joi = require('joi').extend(require('@joi/date'));
const cpfValidation = require('../../utils/cpfValidation');
const ageValidation = require('../../utils/ageValidation');
const { cpfValid } = require('../../utils/regex');

module.exports = async (req, res, next) => {
    try {
        const schema = Joi.object({
            name: Joi.string().trim().required(),

            cpf: Joi.string()
                .trim()
                .regex(cpfValid)
                .message(
                    'The CPF field has an invalid format, please try XXX.XXX.XXX-XX and use numbers only'
                )
                .required(),

            birthday: Joi.date()
                .required()
                .format('DD/MM/YYYY')
                .max('now')
                // eslint-disable-next-line consistent-return
                .custom((value, help) => {
                    if (ageValidation(new Date(value)) === false) {
                        return help.message('User must be at least 18');
                    }
                }),
            email: Joi.string().trim().required().email(),
            password: Joi.string().trim().required().min(6),
            canDrive: Joi.string().trim().valid('yes', 'no').required()
        });

        const { error } = await schema.validate(req.body, {
            abortEarly: true,
            allowUnknown: false
        });

        if (error)
            throw {
                message: 'Bad Request',
                details: [
                    {
                        message: error.message
                    }
                ]
            };
        if (!cpfValidation(req.body.cpf)) {
            throw {
                message: 'Bad Request',
                details: 'Invalid CPF'
            };
        }

        return next();
    } catch (error) {
        return res.status(400).json(error);
    }
};
