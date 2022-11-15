import Joi from "joi";

export const UpdateDesiredDTO = Joi.object({
    deviceCode: Joi.string().required(),
    desired: Joi.object({
        red: Joi.number().required(),
        green: Joi.number().required(),
        blue: Joi.number().required(),
        pump: Joi.string().valid('on','off'),
        led: Joi.string().valid('on','off')  
    }).required()
});


export const AddDeviceDTO = Joi.object({
    name: Joi.string().required(),
    code: Joi.string().required(),
})