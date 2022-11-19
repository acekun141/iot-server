import Joi from "joi";

export const UpdateDesiredDTO = Joi.object({
    deviceCode: Joi.string().required(),
    desired: Joi.object().required()
});


export const UpdateDeviceDTO = Joi.object({
    deviceCode: Joi.string().required(),
    property: Joi.object().required()
});


export const AddDeviceDTO = Joi.object({
    name: Joi.string().required(),
    code: Joi.string().required(),
})


export const GetDeviceDTO = Joi.object({
    code: Joi.string().required()
})