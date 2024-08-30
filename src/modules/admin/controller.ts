import { ProductService } from "@modules/product/service";
import { UserRepository } from "@modules/user/repo";
import { UserService } from "@modules/user/service";
import { Controller, Get, Post, Req, UseInterceptors } from "@nestjs/common";
import { AdminService } from "./service";
import { RequestPayload } from "@decorators/index";
import { sign_in_validator } from "@validators/user";
import { AdminAuthInterceptor } from "src/interceptors/admin-auth";
import { AdminModelInterface } from "./type";
import { response } from "@utils/response";
import { pagination_validator } from "@validators/utils";
import { ProductRepository } from "@modules/product/repo";

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

        const users = await this.user_repository.get_users( {}, payload.page, payload.per_page );

        return response({
            status: true,
            statusCode: 200,
            data: {
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

        const products = await this.product_repository.get_products( {}, payload.page, payload.per_page );

        return response({
            status: true,
            statusCode: 200,
            data: {
                products
            }
        })
        
    }

}