import { ApiBodyOptions } from "@nestjs/swagger";

export const create_product_body_config: ApiBodyOptions = {
    schema: {
        type: 'object',
        properties: {
          name: { type: 'string', example: "Indomie" },
          price: { type: 'number', example: 200 }
        },
        required: ['name', 'price'],
    }
}

export const update_product_body_config: ApiBodyOptions = {
    schema: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          name: { type: 'string', example: "Indomie" },
          price: { type: 'number', example: 200 }
        },
        required: ['name', 'price', 'id'],
    }
}
export const review_product_body_config: ApiBodyOptions = {
    schema: {
        type: 'object',
        properties: {
          product_id: { type: 'number', example: 1 },
          review: { type: 'boolean', example: true },
        },
        required: ['name', 'price', 'product_id'],
    }
}