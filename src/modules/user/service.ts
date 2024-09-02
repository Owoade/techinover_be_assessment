import { BadRequestException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { UserRepository } from "./repo";
import { AuthenticationUtils } from "@modules/core/auth/utils";
import { UserModelInterface } from "./type";
import * as crypto from "crypto";
import { redis_client } from "@cache/index";

@Injectable()
export class UserService {

    constructor(

        private user_repo: UserRepository,

        private auth_utils: AuthenticationUtils

    ){}

    async sign_up( _payload: Pick<UserModelInterface, 'email' | 'name' | 'password'> ){

        const payload = {..._payload} as UserModelInterface;

        payload.email = payload.email.toLowerCase();

        const existing_user = await this.user_repo.get_one_user({ email: payload.email }, ['email']);

        if( existing_user ) throw new BadRequestException('Email exists');

        payload.is_banned = false;

        payload.password = this.auth_utils.hash_password( payload.password );

        const new_user = await this.user_repo.create_user( payload );

        const session_id = crypto.randomUUID();

        await redis_client.setex(`USER-SESSION-${session_id}`, 7200, new_user.id)

        delete new_user.password;

        const token = this.auth_utils.sign_token({
            id: new_user.id,
            session_id
        })

        return {
            user: new_user,
            token
        }

    }

    async sign_in( payload: Pick<UserModelInterface, 'email' | 'password'> ){

        payload.email = payload.email.toLowerCase();

        const existing_user = await this.user_repo.get_one_user({ email: payload.email }, ['email', 'password', 'id', 'name', 'is_banned']);

        if( !existing_user ) throw new NotFoundException('User not found');

        const PASSWORD_IS_INVALID = !this.auth_utils.compare_password(payload.password, existing_user.password);

        if(PASSWORD_IS_INVALID) throw new UnauthorizedException('Invalid password');

        if( existing_user.is_banned ) throw new ForbiddenException('This account has been banned');

        delete existing_user.password;

        const session_id = crypto.randomUUID();

        await redis_client.setex(`USER-SESSION-${session_id}`, 7200, existing_user.id)

        const token = this.auth_utils.sign_token({ id: existing_user.id, session_id });

        return {
            user: existing_user,
            token
        }

    }

    async toggle_user_privilege( user_id: number ){

        const existing_user = await this.user_repo.get_one_user({ id: user_id }, ['is_banned']);

        if(!existing_user) throw new NotFoundException('User not found');

        const [ updated_user ] = await Promise.all([

            this.user_repo.update_user({ is_banned: !existing_user.is_banned }, { id: user_id }),

            redis_client.del(`USER-${user_id}`) // removes user from cache

        ]) 

        delete updated_user.password;

        return updated_user;

    }

}

