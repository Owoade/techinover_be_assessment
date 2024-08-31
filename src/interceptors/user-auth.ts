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

@Injectable()
export class UserAuthInterceptor implements NestInterceptor {
    constructor(
       private user_repo: UserRepository,
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

        const payload = await this.auth_utils.verify_token( token ) as any;

        if( !payload ) throw new BadRequestException("Invalid token");

        if( !payload.session_id ) throw new BadRequestException('Invalid session');

        const [ cached_user, cached_session ] = await Promise.all([

            redis_client.get(`USER-${payload.id}`),

            redis_client.get(`USER-SESSION-${payload.session_id}`)

        ])

        if( !cached_session ) throw new BadRequestException('Session invalid or expired');

        let user;

        if( cached_user ) user = JSON.parse( cached_user );

        else user = await this.user_repo.get_one_user( { id: payload.id } );

        if(!user) throw new ForbiddenException("This operation is beyond the scope of your privilege");

        if( user.is_banned ) throw new ForbiddenException('Sorry, your account has been disabled');

        await redis_client.set(`USER-${payload.id}`, JSON.stringify(user))

        response.locals.user = user;
        
        return next.handle();
        
    }
}