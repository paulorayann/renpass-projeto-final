const Joi = require('joi');
const { objectId } = require('../../utils/regex');

module.exports = async (req, res, next) => {
  try {
    const reserveIDs = Joi.object({
      rentalId: Joi.string().regex(objectId).message('Please enter a valid Rental Id').required(),

      id: Joi.string().regex(objectId).message('Please enter a valid Reserve Id')
    });

    const { error } = await reserveIDs.validate(req.params, { abortEarly: false });

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
