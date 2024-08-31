import { Controller, Delete, Get, Patch, Post, UseInterceptors } from "@nestjs/common";
import { UserService } from "./service";
import { RequestPayload, SessionId, User } from "@decorators/index";
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

@Controller('user')
@UseInterceptors(UserAuthInterceptor)
export class UserController {

    constructor(
        private service: UserService,
        private product_service: ProductService,
        private product_repository: ProductRepository
    ){}

    @Post('/whitelist/auth/sign-up')
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