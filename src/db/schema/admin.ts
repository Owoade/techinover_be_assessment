import schema_type from "@utils/schema";

export const AdminSchema = {

    id: schema_type.primary_key(),

    email: schema_type.string(),

    name: schema_type.string(),

    password: schema_type.string(),

    createdAt: schema_type.date(),

    updatedAt: schema_type.date()

}

export const ADMIN_TABLE_NAME = "Admins";


