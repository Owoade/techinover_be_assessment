import * as Joi from "joi";

const environment_variable_validator = Joi.object({

    DATABASE_USER: Joi.string().required(),

    DATABASE_PASSWORD: Joi.string().required(),

    DATABASE_NAME: Joi.string().required(),

    DATABASE_PORT: Joi.string().regex(/^[0-9]+$/).default('1').required(),

    DATABASE_HOST: Joi.string().required(),

    JWT_TOKEN_PASSPHRASE: Joi.string().required(),

    DATABASE_SSL_MODE: Joi.string().valid("on", "off").required(),

    REDIS_SSL_MODE: Joi.string().valid("on", "off").required(),

    REDIS_URL: Joi.string()

}).unknown(true).required()

export default environment_variable_validator;