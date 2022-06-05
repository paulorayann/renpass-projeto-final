const Joi = require('joi');

module.exports = async (req, res, next) => {
    try {
        const auth = Joi.object({
            email: Joi.string().trim().email().required(),

            password: Joi.string().trim().min(6).required()
        });

        const { error } = await auth.validate(req.body, {
            abortEarly: false
        });
        if (error)
            throw {
                message: 'Bad Request',
                details: [{ message: error.message }]
            };
        return next();
    } catch (error) {
        return res.status(400).json(error);
    }
};
