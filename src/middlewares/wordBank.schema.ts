import { Joi } from 'celebrate';

export const addWordsSchema = {
    body: Joi.object({
        words: Joi.array().items(Joi.string()).optional(),
    }),
};