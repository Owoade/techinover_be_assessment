import { Inject, Injectable } from "@nestjs/common";
import { InferedSchemaType } from "@utils/schema";
import { AdminModelInterface } from "./type";
import { ADMIN_MODEL_PROVIDER } from "./model";

@Injectable()
export class AdminRepository {
    
    constructor(
        @Inject(ADMIN_MODEL_PROVIDER)
        private AdminModel: InferedSchemaType<AdminModelInterface>
    ){}

    async get_one_admin(filter: Partial<AdminModelInterface>) : Promise<AdminModelInterface>
    async get_one_admin<T extends keyof AdminModelInterface>(filter: Partial<AdminModelInterface>, attributes: T[]): Promise<Pick<AdminModelInterface, T>>
    async get_one_admin<T extends keyof AdminModelInterface>( filter: Partial<AdminModelInterface>, attributes?: (keyof AdminModelInterface)[] ){

        const admin = await this.AdminModel.findOne({
            where: filter,
            ...( attributes ? { attributes }: {})
        })

        if( attributes ) return admin?.toJSON() as Pick<AdminModelInterface, T>

        return admin?.toJSON() as AdminModelInterface;

    }
    
}