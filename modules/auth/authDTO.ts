import Joi from "joi";

export const LoginDTO = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
});

export const RegisterDTO = Joi.object({
    username: Joi.string().email().required(),
    password: Joi.string().required(),
});