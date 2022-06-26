const Joi = require('joi').extend(require('@joi/date'));
const { objectId } = require('../../utils/regex');
const { status } = require('../../utils/enums/enums');

module.exports = async (req, res, next) => {
  try {
    const fleet = Joi.object({
      page: Joi.string().trim(),
      limit: Joi.string().trim(),
      id: Joi.string().regex(objectId).message('Please enter a valid Id format (ObjectId)'),
      id_car: Joi.string().regex(objectId).message('Please enter a valid Car Id format (ObjectId)'),
      id_rental: Joi.string().regex(objectId).message('Please enter a valid Rental Id format (ObjectId)'),
      status: Joi.string().valid(...status),
      daily_value: Joi.number(),
      plate: Joi.string().min(7).max(7)
    });

    const { error } = await fleet.validate(req.query, {
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
