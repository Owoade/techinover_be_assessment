import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    BadRequestException,
    ForbiddenException,
  } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request, Response } from 'express';
import { redis_client } from '@cache/index';
import { AuthenticationUtils } from '@modules/core/auth/urtls';
import { UserRepository } from '@modules/user/repo';
import { AdminRepository } from '@modules/admin/repo';

@Injectable()
export class AdminAuthInterceptor implements NestInterceptor {
    constructor(
       private admin_repo: AdminRepository,
       private auth_utils: AuthenticationUtils
       
    ){}
    async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {

        const response = context.switchToHttp().getResponse<Response>();

        const request = context.switchToHttp().getRequest<Request>();

        if( request.url.includes("whitelist") ) return next.handle(); 

        const auth_header = request.headers.authorization;

        if( !auth_header ) throw new BadRequestException("Authorization header not set");

        if( !auth_header.startsWith("Bearer") ) throw new BadRequestException("Authorization header value must start with `Bearer`");

        const [ type, token ] = auth_header.split(' ');

        const payload = this.auth_utils.verify_token( token ) as any;

        if( !payload ) throw new BadRequestException("Invalid token");

        if( !payload.session_id ) throw new BadRequestException('Invalid session');

        const [ cached_admin, cached_session ] = await Promise.all([

            redis_client.get(`ADMIN-${payload.id}`),

            redis_client.get(`ADMIN-SESSION-${payload.session_id}`)

        ])

        if( !cached_session ) throw new BadRequestException('Session invalid or expired');

        let admin;

        if( cached_admin ) admin = JSON.parse( cached_admin );

        else admin = await this.admin_repo.get_one_admin( { id: payload.id } );

        if(!admin) throw new ForbiddenException("This operation is beyond the scope of your privilege");

        await redis_client.set(`ADMIN-${payload.id}`, JSON.stringify(admin))

        response.locals.admin = admin;

        response.locals.session = payload.session_id;
        
        return next.handle();
        
    }
}