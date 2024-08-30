import * as Joi from "joi";

const environment_variable_validator = Joi.object({

    DATABASE_USER: Joi.string().required(),

    DATABASE_PASSWORD: Joi.string().required(),

    DATABASE_NAME: Joi.string().required(),

    DATABASE_PORT: Joi.string().regex(/^[0-9]+$/).default('1').required(),

    DATABSE_HOST: Joi.string().required(),

    JWT_TOKEN_PASSPHARSE: Joi.string().required(),

    REDIS_URL: Joi.string()

}).required()

export default environment_variable_validator;