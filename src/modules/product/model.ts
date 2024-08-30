import db from "@db/index";
import ProductSchema, { PRODUCT_TABLE_NAME } from "@db/schema/product";

const ProductModel = db.define(PRODUCT_TABLE_NAME, ProductSchema, { timestamps: true });

export const PRODUCT_MODEL_PROVIDER = 'PRODUCT_MODEL';

export const UserModelProvider = {
    provide: PRODUCT_MODEL_PROVIDER,
    useValue: ProductModel
}

