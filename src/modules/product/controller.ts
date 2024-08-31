import { Controller, Get, Injectable } from "@nestjs/common";
import { ProductRepository } from "./repo";
import { RequestPayload } from "@decorators/index";
import { pagination_validator } from "@validators/utils";
import { response } from "@utils/response";

@Controller('product')
export class ProductController {

    constructor(
        private product_repo: ProductRepository
    ){}

    @Get('/')
    async get_products(

        @RequestPayload({
            validator: pagination_validator,
            type: 'query'
        })
        payload: { page: string | number, per_page: string | number }

    ){

        payload.page = parseInt(payload.page as string);

        payload.per_page = parseInt(payload.per_page as string);

        const {products, count} = await this.product_repo.get_products_with_merchant_details({ is_approved: true }, payload.page, payload.per_page );

        return response({
            status: true,
            statusCode: 200,
            data: {
                count,
                products
            }
        })
    }
}