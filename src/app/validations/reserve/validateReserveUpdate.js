const Joi = require('joi').extend(require('@joi/date'));
const { objectId } = require('../../utils/regex');

module.exports = async (req, res, next) => {
    try {
        const reserve = Joi.object({
            id_user: Joi.string()
                .regex(objectId)
                .message('Please enter a valid Id format (ObjectId)'),
            data_start: Joi.date().format('DD/MM/YYYY'),
            data_end: Joi.date().format('DD/MM/YYYY'),
            id_car: Joi.string()
                .regex(objectId)
                .message('Please enter a valid Id format (ObjectId)'),
            id_rental: Joi.string()
                .regex(objectId)
                .message('Please enter a valid Id format (ObjectId)'),
            final_value: Joi.number().min(1)
        });

        const { error } = await reserve.validate(req.body, {
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
