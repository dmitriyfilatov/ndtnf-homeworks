import * as Joi from 'joi';

export const BooksCreateDto = Joi.object().keys({
  title: Joi.string().required(),
  description: Joi.string().required(),
  authors: Joi.array().items(Joi.string()),
  favourite: Joi.string().required(),
  fileCover: Joi.string().required(),
  fileName: Joi.string().required(),
  fileBook: Joi.string().required(),
});
