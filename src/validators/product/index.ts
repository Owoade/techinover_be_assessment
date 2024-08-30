import * as Joi from "joi";

export const create_product_validator = Joi.object({
    
    price: Joi.number().required(),

    name: Joi.string().required()
    
}).required()

export const update_product_validator = Joi.object({

    id: Joi.number().integer(),
    
    price: Joi.number(),

    name: Joi.string()

}).required()