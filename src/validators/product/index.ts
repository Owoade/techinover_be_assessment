import * as Joi from "joi";

export const create_product_validator = Joi.object({
    
    price: Joi.number().min(0.1).max(9999999999).required(),

    name: Joi.string().min(6).max(100).required(),

    description: Joi.string().min(3).max(100).required(),

    quantity: Joi.number().integer().min(1).max(9999999).required()
    
}).required()

export const update_product_validator = Joi.object({

    id: Joi.number().integer().required(),

    price: Joi.number().min(0.1).max(9999999999).required(),

    name: Joi.string().min(6).max(100).required(),

    description: Joi.string().min(3).max(100).required(),

    quantity: Joi.number().integer().min(1).max(9999999).required()

}).required()