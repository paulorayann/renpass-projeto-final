const Joi = require('joi');
const { objectId } = require('../utils/regex');

module.exports = async (req, res, next) => {
  try {
    const id = Joi.object({
      id: Joi.string().regex(objectId).message('Please enter a valid ID').required()
    });

    const { error } = await id.validate(req.params, { abortEarly: false });

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
