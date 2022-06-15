const Joi = require('joi').extend(require('@joi/date'));
const { cnpjValid } = require('../../utils/regex');
const cnpjValidation = require('../../utils/cnpjValidation');
const { cepValid } = require('../../utils/regex');
module.exports = async (req, res, next) => {
    try {
        const rental = Joi.object({
            name: Joi.string().trim().min(2).required(),

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

        if (error)
            throw {
                message: 'Bad Request',
                details: [
                    {
                        message: error.message,
                        description: error.description
                    }
                ]
            };
        if (!cnpjValidation(req.body.cnpj)) {
            throw {
                message: 'Bad Request',
                details: [
                    {
                        message: error.message,
                        description: error.description
                    }
                ]
            };
        }

        return next();
    } catch (error) {
        return res.status(400).json({
            description: error.details[0].message,
            message: error.message
        });
    }
};
