import environment_variable_validator from "@validators/env";
import { config } from "dotenv";
import * as Joi from "joi";

config();

export const DATABASE_USER = process.env.DATABASE_USER as string;

export const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD as string;

export const DATABASE_NAME = process.env.DATABASE_NAME as string;

export const DATABASE_PORT = parseInt( process.env.DATABASE_PORT as string );

export const DATABASE_HOST = process.env.DATABASE_HOST as string;

export const NODE_ENV = (process.env.NODE_ENV ?? "development") as "development" | "test" | "production";

export const JWT_TOKEN_PASSPHARSE = process.env.JWT_TOKEN_PASSPHRASE as string;

export const REDIS_URL = process.env.REDIS_URL as string;

export const REDIS_SSL_MODE = process.env.REDIS_SSL_MODE as string;

export const DATABASE_SSL_MODE = process.env.DATABASE_SSL_MODE as string;

// console.log(process.env)

export const { error } = environment_variable_validator.validate(process.env);

if( error ) throw new Error(`Environment variable validation: ${error.message}`);

