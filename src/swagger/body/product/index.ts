import { ApiBodyOptions } from "@nestjs/swagger";

export const create_product_body_config: ApiBodyOptions = {
    schema: {
        type: 'object',
        properties: {
          name: { type: 'string', example: "Indomie" },
          price: { type: 'number', example: 200 },
          description: { type: 'string', example: "Fast food for all" },
          quantity: { type: 'number', example: 10 }
        },
        required: ['name', 'price', 'description', 'quantity'],
    }
}

export const update_product_body_config: ApiBodyOptions = {
    schema: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          name: { type: 'string', example: "Indomie" },
          price: { type: 'number', example: 200 },
          description: { type: 'string', example: "Fast food for all" },
          quantity: { type: 'number', example: 10 }
        },
        required: ['name', 'price', 'id', 'description', 'quantity'],
    }
}
export const review_product_body_config: ApiBodyOptions = {
    schema: {
        type: 'object',
        properties: {
          product_id: { type: 'number', example: 1 },
          review: { type: 'boolean', example: true },
        },
        required: ['review', 'product_id'],
    }
}