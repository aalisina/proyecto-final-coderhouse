const { celebrate, Joi, Segments } = require('celebrate');

module.exports = {
  getUserCart: celebrate({
  }),
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      user_id: Joi.string().required(),
      products: Joi.array().items({
        _id: Joi.string().required(),
        quantity: Joi.number().required(),
      }),
      address: Joi.object().keys({
        street: Joi.string().required(),
        height: Joi.string().required(),
        postal_code: Joi.number().required(),
        floor: Joi.string(),
        department: Joi.string(),
      }),
    }),
  }),
  update: celebrate({
    [Segments.BODY]: Joi.object().keys({
      user_id: Joi.string(),
      products: Joi.array().items({
        _id: Joi.string(),
        quantity: Joi.number(),
      }),
      address: Joi.object().keys({
        street: Joi.string(),
        height: Joi.string(),
        postal_code: Joi.number(),
        floor: Joi.string(),
        department: Joi.string(),
      }),
    }),
  }),
};
