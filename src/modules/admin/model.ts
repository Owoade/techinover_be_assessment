import db from "@db/index";
import {ADMIN_TABLE_NAME, AdminSchema} from "@db/schema/admin";

export const AdminModel = db.define(ADMIN_TABLE_NAME, AdminSchema, { timestamps: true });

export const ADMIN_MODEL_PROVIDER = 'ADMIN_MODEL';

export const AdminModelProvider = {
    provide: ADMIN_MODEL_PROVIDER,
    useValue: AdminModel
}