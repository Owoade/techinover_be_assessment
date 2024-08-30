import { Inject, Injectable } from "@nestjs/common";
import { InferedSchemaType } from "@utils/schema";
import { ProductModelInterface } from "./type";
import { PRODUCT_MODEL_PROVIDER } from "./model";
import { FilterUser } from "@modules/user/type";

@Injectable()
export class ProductRepository {
    
    constructor(
        @Inject(PRODUCT_MODEL_PROVIDER)
        private ProductModel: InferedSchemaType<ProductModelInterface>
    ){}

    async create_product( payload: ProductModelInterface ){

        const new_product = await this.ProductModel.create( payload );

        return new_product?.toJSON();

    }

    async get_one_product(filter: Partial<ProductModelInterface>) : Promise<ProductModelInterface>
    async get_one_product<T extends keyof ProductModelInterface>(filter: Partial<ProductModelInterface>, attributes: T[]): Promise<Pick<ProductModelInterface, T>>
    async get_one_product<T extends keyof ProductModelInterface>( filter: Partial<ProductModelInterface>, attributes?: (keyof ProductModelInterface)[] ){

        const product = await this.ProductModel.findOne({
            where: filter,
            ...( attributes ? { attributes }: {})
        })

        if( attributes ) return product?.toJSON() as Pick<ProductModelInterface, T>

        return product?.toJSON() as ProductModelInterface;

    }

    async get_products( filter: Partial<ProductModelInterface>, page: number, per_page: number ){

        const products = await this.ProductModel.findAll({
            where: filter,
            limit: per_page,
            offset: per_page * ( page - 1 )
        })

        return products.map( product => product.toJSON() );

    }

    async update_product( payload: Partial<ProductModelInterface>, filter: FilterUser ){

        const updated_product = await this.ProductModel.update( payload, { where: filter, returning: true } );

        return (updated_product?.[1]?.[0])?.toJSON();

    }

    async delete_product( filter: Partial<ProductModelInterface> ){

        await this.ProductModel.destroy({
            where: filter
        })
        
    }

    
}