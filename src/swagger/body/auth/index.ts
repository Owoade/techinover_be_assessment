import { ApiBodyOptions } from "@nestjs/swagger";

export const sign_up_body_config: ApiBodyOptions = {
    schema: {
        type: 'object',
        properties: {
          name: { type: 'string', example: "Owoade Anuoluwapo" },
          email: { type: 'string', example: "owoadeanu@yahoo.com" },
          password: { type: 'string', example: "owoadeanu" }
        },
        required: ['name', 'email', 'password'],
    }
}

export const sign_in_body_config: ApiBodyOptions = {
    schema: {
        type: 'object',
        properties: {
          email: { type: 'string', example: "owoadeanu@yahoo.com" },
          password: { type: 'string', example: "owoadeanu" }
        },
        required: ['name', 'email', 'password'],
    }
}
