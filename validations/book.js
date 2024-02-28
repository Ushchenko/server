import { body } from 'express-validator';

export const bookValidation = [
	body('name').isString(),
  body('authors').isArray(),
  body('genres').isArray(),
]