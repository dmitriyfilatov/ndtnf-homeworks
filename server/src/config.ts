import * as Joi from '@hapi/joi';

const validationSchema = Joi.object({
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRATION_TIME: Joi.number().required(),
});

export default validationSchema;