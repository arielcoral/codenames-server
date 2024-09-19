import { Joi } from 'celebrate';

export const createUserSchema = {
    body: Joi.object({
        userName: Joi.string().required(),
        chatRoom: Joi.string().required(),
        isOnline: Joi.boolean().required(),
        createdAt: Joi.date().required()
    }),
};
export const noBodySchema = {
    body: Joi.object().keys({})
};
export const setUserPropertiesSchema  = {
    body: Joi.object({
        userName: Joi.string().required(),
        role: Joi.string().required(),
        team: Joi.string().required()
    }),
};
export const setIsOnlineSchema  = {
    body: Joi.object({ // the properties are optional because sometimes empty requests are sent
        userName: Joi.string().optional(),
        isOnline: Joi.boolean().optional()
    }),
};
