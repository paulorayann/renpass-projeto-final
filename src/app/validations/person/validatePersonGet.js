const Joi = require('joi').extend(require('@joi/date'));
const { cpfValid } = require('../../utils/regex');
const { canDrive } = require('../../utils/enums/enums');

module.exports = async (req, res, next) => {
  try {
    const person = Joi.object({
      page: Joi.string().trim(),
      limit: Joi.string().trim(),
      name: Joi.string().trim(),
      cpf: Joi.string()
        .trim()
        .min(14)
        .max(14)
        .regex(cpfValid)
        .message('The CPF field has an invalid format, please try XXX.XXX.XXX-XX and use numbers only'),
      birthday: Joi.date().format('DD/MM/YYYY').max('now'),
      email: Joi.string().trim().email(),
      canDrive: Joi.string()
        .trim()
        .valid(...canDrive)
    });

    const { error } = await person.validate(req.query, {
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
