import * as Joi from "joi";

export const user_sign_up_validator = Joi.object({

    name: Joi.string().min(6).max(100).required(),

    email: Joi.string().min(6).max(100).email().required(),

    password: Joi.string().min(6).max(100).required()

}).required()

export const sign_in_validator = Joi.object({

    email: Joi.string().min(6).max(100).email().required(),

    password: Joi.string().min(6).max(100).required()

}).required()
