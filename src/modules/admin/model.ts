import db from "@db/index";
import AdminSchema, {ADMIN_TABLE_NAME} from "@db/schema/admin";

export const AdminModel = db.define(ADMIN_TABLE_NAME, AdminSchema, { timestamps: true });

export const ADMIN_MODEL_PROVIDER = 'USER_MODEL';

export const UserModelProvider = {
    provide: ADMIN_MODEL_PROVIDER,
    useValue: AdminModel
}