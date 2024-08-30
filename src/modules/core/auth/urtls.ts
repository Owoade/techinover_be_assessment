import { JWT_TOKEN_PASSPHARSE } from "@env/index";
import { Injectable } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";

@Injectable()
export class AuthenticationUtils {

    constructor(){}

    async sign_token( payload: any ){

        const token = jwt.sign(payload, JWT_TOKEN_PASSPHARSE )

        return token;

    }

    async verify_token( token: string ){

        try{

            const decoded = jwt.verify( token, JWT_TOKEN_PASSPHARSE );

            return decoded;

        }catch(e){

            return false;
            
        }

    }

    hash_password( password: string ){

        const salt = bcrypt.genSaltSync(10);

        const hashed_password = bcrypt.hashSync(password, salt);

        return hashed_password;

    }

    compare_password( password: string, hash: string ){

        return bcrypt.compareSync(password, hash);

    }

}