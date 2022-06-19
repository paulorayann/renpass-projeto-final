const Joi = require('joi').extend(require('@joi/date'));
const { cnpjValid } = require('../../utils/regex');

module.exports = async (req, res, next) => {
    try {
        const rental = Joi.object({
            name: Joi.string().trim().min(2),

            cnpj: Joi.string().regex(cnpjValid).trim(),

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
