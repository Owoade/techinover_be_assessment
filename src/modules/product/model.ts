import db from "@db/index";
import { PRODUCT_TABLE_NAME, ProductSchema } from "@db/schema/product";

export const ProductModel = db.define(PRODUCT_TABLE_NAME, ProductSchema, { timestamps: true });

export const PRODUCT_MODEL_PROVIDER = 'PRODUCT_MODEL';

export const ProductModelProvider = {
    provide: PRODUCT_MODEL_PROVIDER,
    useValue: ProductModel
}

