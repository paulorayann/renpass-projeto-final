const Joi = require('joi').extend(require('@joi/date'));
const { cnpjValid } = require('../../utils/regex');
const cnpjValidation = require('../../utils/cnpjValidation');
module.exports = async (req, res, next) => {
    try {
        const rental = Joi.object({
            name: Joi.string().trim().required(),

            cnpj: Joi.string()
                .trim()
                .regex(cnpjValid)
                .message(
                    'The CNPJ field has an invalid format, please try XX.XXX.XXX/XXXX-XX and use numbers only'
                )
                .required(),

            activities: Joi.string().trim().required(),

            address: Joi.array()
                .unique()
                .items(
                    Joi.object({
                        cep: Joi.string().trim().required(),
                        number: Joi.string().trim().required(),
                        isFilial: Joi.boolean().required()
                    })
                )
                .required()
        });

        const { error } = await rental.validate(req.body, {
            abortEarly: false,
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
        if (!cnpjValidation(req.body.cnpj)) {
            throw {
                message: 'Bad Request',
                details: 'Invalid CNPJ'
            };
        }

        return next();
    } catch (error) {
        return res.status(400).json(error);
    }
};
