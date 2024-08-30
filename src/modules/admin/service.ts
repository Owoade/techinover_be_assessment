import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { AdminModelInterface } from "./type";
import { AdminRepository } from "./repo";
import { AuthenticationUtils } from "@modules/core/auth/urtls";
import * as crypto from "crypto";

@Injectable()
export class AdminService {

    constructor(
        private admin_repo: AdminRepository,
        private auth_utils: AuthenticationUtils
    ){}

    async sigin_in( payload: Pick<AdminModelInterface, 'email' | 'password'> ){

        const existing_admin = await this.admin_repo.get_one_admin({ email: payload.email }, ['password', 'id']);

        if( !existing_admin ) throw new NotFoundException('Admin not found');

        const PASSWORD_IS_INVALID = !this.auth_utils.compare_password( payload.password, existing_admin.password );

        if( PASSWORD_IS_INVALID ) throw new UnauthorizedException('Password is Invalid');

        const token = this.auth_utils.sign_token({ 
            id: existing_admin.id,
            session_id: crypto.randomUUID()
        });

        return token;
        
    }
}