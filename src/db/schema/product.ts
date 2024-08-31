import schema_type from "@utils/schema";

export const ProductSchema = {

    id: schema_type.primary_key(),

    name: schema_type.string(),

    price: schema_type.decimal(10,2),

    slug: schema_type.string(),

    is_approved: schema_type.boolean(),

    UserId: schema_type.int(),

    createdAt: schema_type.date(),

    updatedAt: schema_type.date()

}

export const PRODUCT_TABLE_NAME = "Products";
