import db from "@db/index";
import { USER_TABLE_NAME, UserSchema } from "@db/schema/user";

export const UserModel = db.define(USER_TABLE_NAME, UserSchema, { timestamps: true });

export const USER_MODEL_PROVIDER = 'USER_MODEL';

export const UserModelProvider = {
    provide: USER_MODEL_PROVIDER,
    useValue: UserModel
}