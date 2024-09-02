import * as Joi from "joi";

export const pagination_validator = Joi.object({
    page: Joi.number().min(1).max(9999999999).default('1'),
    per_page: Joi.number().min(1).max(9999999999).default('50')
})

export const id_validator = ( id: string ) => Joi.object({
    [id]: Joi.number().min(1).max(9999999999).integer()
})


export const id_validator_string = ( id: string ) => Joi.object({
    [id]: Joi.string().required()
}).required()