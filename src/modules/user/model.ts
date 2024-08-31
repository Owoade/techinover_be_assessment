import db from "@db/index";
import { USER_TABLE_NAME, UserSchema } from "@db/schema/user";
import { ProductModel } from "@modules/product/model";

export const UserModel = db.define(USER_TABLE_NAME, UserSchema, { timestamps: true  });

export const USER_MODEL_PROVIDER = 'USER_MODEL';

UserModel.hasMany(ProductModel, { as: "Merchant" });

ProductModel.belongsTo(UserModel, { as: "Merchant", foreignKey: "UserId" })

export const UserModelProvider = {
    provide: USER_MODEL_PROVIDER,
    useValue: UserModel
}