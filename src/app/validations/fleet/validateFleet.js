const Joi = require('joi').extend(require('@joi/date'));
const { objectId } = require('../../utils/regex');

module.exports = async (req, res, next) => {
    try {
        const fleet = Joi.object({
            id_car: Joi.string()
                .regex(objectId)
                .message('Please enter a valid Id format (ObjectId)')
                .required(),
            id_rental: Joi.string()
                .regex(objectId)
                .message('Please enter a valid Id format (ObjectId)'),
            status: Joi.string()
                .valid('available', 'unavailable', 'rented')
                .required(),
            daily_value: Joi.number().min(1).required(),
            plate: Joi.string().min(7).max(7).required()
        });

        const { error } = await fleet.validate(req.body, {
            abortEarly: false
        });

        if (error) throw error;

        return next();
    } catch (error) {
        return res.status(400).json(
            error.details.map((detail) => ({
                description: detail.message,
                name: detail.path.join('.')
            }))
        );
    }
};
