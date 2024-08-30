import * as Joi from "joi";

export const user_sign_up_validator = Joi.object({

    name: Joi.string().required(),

    email: Joi.string().email().required(),

    password: Joi.string().min(6).required()

}).required()

export const sign_in_validator = Joi.object({

    email: Joi.string().email().required(),

    password: Joi.string().min(6).required()

}).required()
