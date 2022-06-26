const Joi = require('joi').extend(require('@joi/date'));

module.exports = async (req, res, next) => {
  try {
    const car = Joi.object({
      page: Joi.string().trim(),
      limit: Joi.string().trim(),
      model: Joi.string().trim(),
      type: Joi.string().trim(),
      brand: Joi.string().trim(),
      color: Joi.string().trim(),
      year: Joi.date().format('YYYY').min('1950-01-01').max('2022-12-31'),
      passengersQtd: Joi.number().integer().min(2).max(5),
      accessories: Joi.array()
        .min(1)
        .items(
          Joi.object({
            description: Joi.string().trim()
          })
        )
    });

    const { error } = await car.validate(req.query, {
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
