import { Inject, Injectable } from "@nestjs/common";
import { InferedSchemaType } from "@utils/schema";
import { FilterUser, UserModelInterface } from "./type";
import { USER_MODEL_PROVIDER } from "./model";

@Injectable()
export class UserRepository {

    constructor(
        @Inject(USER_MODEL_PROVIDER)
        private UserModel: InferedSchemaType<UserModelInterface>
    ){}

    async create_user( payload: UserModelInterface ){

        const new_user = await this.UserModel.create( payload );

        return new_user?.toJSON();

    }

    async get_one_user(filter: Partial<UserModelInterface>) : Promise<UserModelInterface>
    async get_one_user<T extends keyof UserModelInterface>(filter: Partial<UserModelInterface>, attributes: T[]): Promise<Pick<UserModelInterface, T>>
    async get_one_user<T extends keyof UserModelInterface>( filter: Partial<UserModelInterface>, attributes?: (keyof UserModelInterface)[] ){

        const user = await this.UserModel.findOne({
            where: filter,
            ...( attributes ? { attributes }: {})
        })

        if( attributes ) return user?.toJSON() as Pick<UserModelInterface, T>

        return user?.toJSON() as UserModelInterface;

    }

    async get_users( filter: FilterUser, page: number, per_page: number ){

        const users = await this.UserModel.findAll({
            where: filter,
            limit: per_page,
            attributes: {
                exclude: ['password']
            },
            offset: per_page * (page - 1 )
        })

        return users.map( user => user.toJSON() );

    }

    async update_user( update: Partial<UserModelInterface>, filter: FilterUser ){

        const updated_user = await this.UserModel.update(update, { where: filter, returning: true });

        return (updated_user?.[1]?.[0])?.toJSON();

    }

   
}