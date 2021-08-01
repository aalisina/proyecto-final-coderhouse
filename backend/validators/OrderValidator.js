const { celebrate, Joi, Segments } = require('celebrate');

module.exports = {
  getOneOrder: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
};
