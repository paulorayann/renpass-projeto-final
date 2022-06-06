const Joi = require('joi').extend(require('@joi/date'));
module.exports = async (req, res, next) => {
    try {
        const car = Joi.object({
            model: Joi.string().trim(),

            type: Joi.string().trim(),

            brand: Joi.string().trim(),

            year: Joi.date().format('YYYY').min('1950-01-01').max('2022-12-31'),
            accessories: Joi.array()
                .min(1)
                .unique()
                .items(
                    Joi.object({
                        description: Joi.string().trim()
                    })
                ),
            passengersQtd: Joi.number().integer().min(2)
        });

        const { error } = await car.validate(req.body, {
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

        return next();
    } catch (error) {
        return res.status(400).json(error);
    }
};