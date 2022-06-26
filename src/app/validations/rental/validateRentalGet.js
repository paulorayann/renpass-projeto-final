const Joi = require('joi').extend(require('@joi/date'));
const { cnpjValid } = require('../../utils/regex');
const { cepValid } = require('../../utils/regex');

module.exports = async (req, res, next) => {
  try {
    const rental = Joi.object({
      page: Joi.string().trim(),
      limit: Joi.string().trim(),
      name: Joi.string().trim().min(2),
      cnpj: Joi.string().regex(cnpjValid).trim(),
      activities: Joi.string().trim(),
      cep: Joi.string().regex(cepValid),
      number: Joi.string().trim(),
      isFilial: Joi.boolean(),
      complement: Joi.string().trim(),
      street: Joi.string().trim(),
      district: Joi.string().trim(),
      city: Joi.string().trim(),
      state: Joi.string().trim()
    });

    const { error } = await rental.validate(req.query, {
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
