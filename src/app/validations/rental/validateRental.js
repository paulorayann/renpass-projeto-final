const Joi = require('joi').extend(require('@joi/date'));
const { cnpjValid } = require('../../utils/regex');
const cnpjValidation = require('../../utils/cnpjValidation');
const { cepValid } = require('../../utils/regex');

module.exports = async (req, res, next) => {
    try {
        const rental = Joi.object({
            name: Joi.string().trim().min(2).required(),

            cnpj: Joi.string()
                .trim()
                .regex(cnpjValid)
                .message(
                    'The CNPJ field has an invalid format, please try XX.XXX.XXX/XXXX-XX and use numbers only'
                )
                .required(),

            activities: Joi.string().trim().min(2).required(),

            address: Joi.array()
                .unique()
                .items(
                    Joi.object({
                        cep: Joi.string()
                            .trim()
                            .regex(cepValid)
                            .message(
                                'The CEP field has an invalid format, please try XXXXX-XXX and use numbers only'
                            )
                            .required(),
                        number: Joi.string().trim().required(),
                        city: Joi.string().min(1),
                        state: Joi.string(),
                        isFilial: Joi.boolean().required()
                    })
                )
                .required()
        });

        const { error } = await rental.validate(req.body, {
            abortEarly: true
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
        if (!cnpjValidation(req.body.cnpj)) {
            throw {
                message: 'Bad Request',
                details: 'Invalid CNPJ'
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
