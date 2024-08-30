import { Injectable, NotFoundException } from "@nestjs/common";
import { ProductRepository } from "./repo";
import { ProductModelInterface } from "./type";
import slugify from "slugify";
import * as crypto from "crypto";

@Injectable()
export class ProductService {
    
    constructor(
        private product_repo: ProductRepository
    ){}

    async create_product( _payload: Pick<ProductModelInterface, 'UserId' | 'price' | 'UserId' | 'name'> ){

        const payload = { ..._payload } as ProductModelInterface;

        let slug = slugify(payload.name.replace(/\b[Ee]lections?\b/g, ""), {
            strict: true,
            lower: true,
            replacement: '-',
            trim: true
        })

        payload.slug = slug;

        const existing_product = await this.product_repo.get_one_product({ slug }, ['id']);

        if( existing_product )
            payload.slug += crypto.randomInt(10,20)

        payload.is_approved = false;

        const new_product = await this.product_repo.create_product( payload );

        return new_product;

    }

    async approve_product( product_id: ProductModelInterface['id'], review: ProductModelInterface['is_approved'] ){

        const existing_product = await this.product_repo.get_one_product({ id: product_id }, ['id']);

        if( !existing_product ) throw new NotFoundException('Product not found');

        const updated_product = await this.product_repo.update_product({ is_approved: review }, { id: product_id });

        return updated_product;
        
    }

}