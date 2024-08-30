import * as Joi from "joi";

export const review_product_validator = Joi.object({
    product_id: Joi.number().integer().required(),
    review: Joi.boolean().required()
}).required()