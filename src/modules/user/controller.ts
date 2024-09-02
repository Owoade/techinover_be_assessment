import { Controller, Delete, Get, Patch, Post, UseInterceptors } from "@nestjs/common";
import { UserService } from "./service";
import { ApiQueryPage, ApiQueryPerPage, RequestPayload, SessionId, User } from "@decorators/index";
import { sign_in_validator, user_sign_up_validator } from "@validators/user";
import { UserAuthInterceptor } from "src/interceptors/user-auth";
import { response } from "@utils/response";
import { create_product_validator, update_product_validator } from "@validators/product";
import { ProductService } from "@modules/product/service";
import { UserModelInterface } from "./type";
import { id_validator, pagination_validator } from "@validators/utils";
import { ProductRepository } from "@modules/product/repo";
import { ProductModelInterface } from "@modules/product/type";
import { redis_client } from "@cache/index";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiResponse } from "@nestjs/swagger";
import { sign_in_body_config, sign_up_body_config } from "src/swagger/body/auth";
import { create_product_body_config, update_product_body_config } from "src/swagger/body/product";
import { logout_response_schema, sign_in_response_schema, sign_up_response_schema } from "src/swagger/response/auth";
import { error_response_schema } from "src/swagger/error";
import { create_product_response_schema, delete_product_response_schema, get_merchant_products_schema, update_product_response_schema } from "src/swagger/response/product";

@Controller('user')
@UseInterceptors(UserAuthInterceptor)
export class UserController {

    constructor(
        private service: UserService,
        private product_service: ProductService,
        private product_repository: ProductRepository
    ){}

    @Post('/whitelist/auth/sign-up')
    @ApiOperation({
        summary: 'Create user',
        description: 'This endpoint creates a user',
    })
    @ApiBody(sign_up_body_config)
    @ApiResponse({ status: 200, schema: sign_up_response_schema })
    @ApiResponse({ status: "4XX", schema: error_response_schema })
    async sign_up(

        @RequestPayload({
            validator: user_sign_up_validator
        })
        payload: Parameters<typeof this.service.sign_up>[0]

    ){

        const { token, user } = await this.service.sign_up( payload );

        return response({
            status: true,
            data: {
               user,
               token 
            },
            statusCode: 200
        })

    }

    @Post('/whitelist/auth/sign-in')
    @ApiOperation({
        summary: 'User login',
    })
    @ApiBody(sign_in_body_config)
    @ApiResponse({ status: 200, schema: sign_in_response_schema })
    @ApiResponse({ status: "4XX", schema: error_response_schema })
    async sign_in(

        @RequestPayload({
            validator: sign_in_validator
        })
        payload: Parameters<typeof this.service.sign_in>[0]

    ){

        const { token, user } = await this.service.sign_in( payload );

        return response({
            status: true,
            data: {
                user,
                token
            },
            statusCode: 200
        })
    }

    @Post('/product')
    @ApiOperation({
        summary: 'Create product',
        description: "This endpoint creates a user's product",
    })
    @ApiBearerAuth()
    @ApiBody(create_product_body_config)
    @ApiResponse({ status: 200, schema: create_product_response_schema })
    @ApiResponse({ status: "4XX", schema: error_response_schema })
    async create_product(

        @RequestPayload({
            validator: create_product_validator
        })
        payload: Parameters<typeof this.product_service.create_product>[0],

        @User()
        user: UserModelInterface

    ){

        payload.UserId = user.id;

        const new_product = await this.product_service.create_product( payload );

        return response({
            status: true,
            statusCode: 200,
            data: {
                new_product
            }
        })

    }

    @Get('/products')
    @ApiOperation({
        summary: "Get products",
        description: "This endpoint gets a user's products",
    })
    @ApiBearerAuth()
    @ApiQueryPage()
    @ApiQueryPerPage()
    @ApiResponse({ status: 200, schema: get_merchant_products_schema })
    @ApiResponse({ status: "4XX", schema: error_response_schema })
    async get_products(

        @RequestPayload({
            validator: pagination_validator,
            type: "query"
        })
        payload: { page: string | number, per_page: string | number },

        @User()
        user: UserModelInterface

    ){

        payload.page = parseInt(payload.page as string) as number;

        payload.per_page = parseInt(payload.per_page as string) as number;

        const {products, count} = await this.product_repository.get_products({
            UserId: user.id
        }, payload.page, payload.per_page );

        return response({
            status: true,
            statusCode: 200,
            data: {
                count,
                products
            }
        })

    }

    @Patch('/product')
    @ApiOperation({
        summary: 'Update product',
        description: "This endpoint updates a user's product",
    })
    @ApiBearerAuth()
    @ApiBody(update_product_body_config)
    @ApiResponse({ status: 200, schema: update_product_response_schema })
    @ApiResponse({ status: "4XX", schema: error_response_schema })
    async update_product(

        @RequestPayload({
            validator: update_product_validator
        })
        payload: Partial<ProductModelInterface> & { id: number },

        @User()
        user: UserModelInterface

    ){

        const filter = {
            id: payload.id,
            UserId: user.id
        }

        delete payload.id;

        const updated_product = await this.product_service.update_product( payload, filter);

        return response({
            status: true,
            statusCode: 200,
            data: {
                updated_product
            }
        })
    
    }

    @Delete('/product')
    @ApiOperation({
        summary: 'Delete product',
        description: "This endpoint deletes a user's product",
    })
    @ApiBearerAuth()
    @ApiQuery({ name: 'product_id', required: true, type: Number, description: "Product's id" })
    @ApiResponse({ status: 200, schema: delete_product_response_schema })
    @ApiResponse({ status: "4XX", schema: error_response_schema })
    async delete_product(

        @RequestPayload({
            validator: id_validator('product_id'),
            type: "query"
        })
        payload: { product_id: string },

        @User()
        user: UserModelInterface

    ){

        await this.product_repository.delete_product({ id: parseInt(payload.product_id), UserId: user.id })

        return response({
            status: true,
            message: "Product deletion initiated",
            statusCode: 200,
            data: {}
        })

    }

    @Get('/logout')
    @ApiOperation({
        description: "This endpoint ends a user's session",
    })
    @ApiBearerAuth()
    @ApiResponse({ status: 200, schema: logout_response_schema })
    @ApiResponse({ status: "4XX", schema: error_response_schema })
    async logout(

        @SessionId()
        session_id: string

    ){

        await redis_client.del(`USER-SESSION-${session_id}`);

        return response({
            status: true,
            statusCode: 200,
            data: {},
            message: "You have successfully logged out"
        })

    }


}