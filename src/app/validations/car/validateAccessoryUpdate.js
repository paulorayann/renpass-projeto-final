const Joi = require('joi').extend(require('@joi/date'));
const { objectId } = require('../../utils/regex');

module.exports = async (req, res, next) => {
  try {
    const car = Joi.object({
      id: Joi.string().regex(objectId).message('Please enter a valid Id format (ObjectId)').required(),
      accessoryId: Joi.string().regex(objectId).message('Please enter a valid Id format (ObjectId)').required(),
      accessories: Joi.array()
        .min(1)
        .items(
          Joi.object({
            description: Joi.string().trim()
          })
        )
    });
    const request = {
      id: req.params.id,
      accessoryId: req.params.accessoryId,
      accessories: req.body.accessories
    };

    const { error } = await car.validate(request, {
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
