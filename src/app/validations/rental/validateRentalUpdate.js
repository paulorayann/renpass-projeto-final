const Joi = require('joi').extend(require('@joi/date'));
const { cnpjValid } = require('../../utils/regex');
const cnpjValidation = require('../../utils/cnpjValidation');

module.exports = async (req, res, next) => {
    try {
        const rental = Joi.object({
            name: Joi.string().trim().min(2),

            cnpj: Joi.string()
                .regex(cnpjValid)
                .message(
                    'The CNPJ field has an invalid format, please try XX.XXX.XXX/XXXX-XX and use numbers only'
                )
                .trim()
                .custom((cnpj, help) => {
                    if (!cnpjValidation(cnpj)) {
                        return help.message('Please enter a valid CNPJ');
                    }
                }),

            activities: Joi.string().trim(),

            address: Joi.array().items(
                Joi.object({
                    number: Joi.string().min(1).trim(),
                    isFilial: Joi.boolean()
                })
            )
        });

        const { error } = await rental.validate(req.body, {
            abortEarly: false
        });

        if (error) throw error;

        return next();
    } catch (error) {
        return res.status(400).json({
            errors: error.details.map((detail) => ({
                name: detail.path.join('.'),
                description: detail.message
            }))
        });
    }
};
