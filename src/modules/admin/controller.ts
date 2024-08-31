import { ProductService } from "@modules/product/service";
import { UserRepository } from "@modules/user/repo";
import { UserService } from "@modules/user/service";
import { Controller, Get, Patch, Post, Req, UseInterceptors } from "@nestjs/common";
import { AdminService } from "./service";
import { RequestPayload } from "@decorators/index";
import { sign_in_validator } from "@validators/user";
import { AdminAuthInterceptor } from "src/interceptors/admin-auth";
import { AdminModelInterface } from "./type";
import { response } from "@utils/response";
import { id_validator, pagination_validator } from "@validators/utils";
import { ProductRepository } from "@modules/product/repo";
import { review_product_validator } from "@validators/admin";

@Controller('admin')
@UseInterceptors(AdminAuthInterceptor)
export class AdminController {

    constructor(
        private user_service: UserService,
        private product_service: ProductService,
        private product_repository: ProductRepository,
        private user_repository: UserRepository,
        private admin_service: AdminService
    ){}

    @Post('/whitelist/auth/sign-in')
    async sign_in(

        @RequestPayload({
            validator: sign_in_validator
        })
        payload: Pick<AdminModelInterface, 'email' | 'password'>

    ){

        const token = await this.admin_service.sigin_in( payload );

        return response({
            status: true,
            statusCode: 200,
            data: {
                token
            }
        })

    }

    @Get('/users')
    async get_users(

        @RequestPayload({
            validator: pagination_validator,
            type: "query"
        })
        payload: { page: string | number, per_page: string | number }

    ){

        payload.page = parseInt(payload.page as string);

        payload.per_page = parseInt(payload.per_page as string);

        const {users,count} = await this.user_repository.get_users( {}, payload.page, payload.per_page );

        return response({
            status: true,
            statusCode: 200,
            data: {
                count,
                users
            }
        })

    }

    @Get('/products')
    async get_products(

        @RequestPayload({
            validator: pagination_validator,
            type: "query"
        })
        payload: { page: string | number, per_page: string | number }

    ){

        payload.page = parseInt(payload.page as string);

        payload.per_page = parseInt(payload.per_page as string);

        const { count, products } = await this.product_repository.get_products( {}, payload.page, payload.per_page );

        return response({
            status: true,
            statusCode: 200,
            data: {
                count,
                products
            }
        })

    }

    @Patch('/user')
    async toggle_user_priviledge(

        @RequestPayload({
            validator: id_validator('user_id'),
            type: "query"
        })
        payload: { user_id: string }

    ){

        const updated_user = await this.user_service.toggle_user_privilege( parseInt(payload.user_id) );

        return response({
            status: true,
            statusCode: 200,
            data: {
                updated_user
            }
        })

    }

    @Patch('/product')
    async review_product(

        @RequestPayload({
            validator: review_product_validator
        })
        payload: { product_id: number, review: boolean }

    ){

        const updated_user = await this.product_service.review_product( payload.product_id, payload.review );

        return response({
            status: true,
            statusCode: 200,
            data: {
                updated_user
            }
        })

    }



}