import schema_type from "@utils/schema";

export const UserSchema = {

    id: schema_type.primary_key(),

    email: schema_type.string(),

    name: schema_type.string(),

    is_banned: schema_type.boolean(),

    password: schema_type.string(),

    createdAt: schema_type.date(),

    updatedAt: schema_type.date()

}

export const USER_TABLE_NAME = "Users";

