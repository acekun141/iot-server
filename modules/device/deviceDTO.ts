import Joi from "joi";

export const UpdateColorDTO = Joi.object({
    device: Joi.string().required(),
    color: Joi.object({
        red: Joi.number().required(),
        green: Joi.number().required(),
        blue: Joi.number().required(),
    }).required()
});