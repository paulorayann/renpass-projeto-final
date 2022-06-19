const Joi = require('joi').extend(require('@joi/date'));

module.exports = async (req, res, next) => {
    try {
        const car = Joi.object({
            model: Joi.string().trim(),

            type: Joi.string().trim(),

            brand: Joi.string().trim(),

            color: Joi.string().trim(),

            year: Joi.date().format('YYYY').min('1950-01-01').max('2022-12-31'),

            passengersQtd: Joi.number().integer().min(2).max(5)
        });

        const { error } = await car.validate(req.body, {
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
