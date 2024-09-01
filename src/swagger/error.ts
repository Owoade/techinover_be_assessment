import { ApiResponseSchemaHost } from "@nestjs/swagger";

export const error_response_schema: ApiResponseSchemaHost['schema'] = {
    example: {
      "message": "Error message",
      "error": "Bad Request",
      "statusCode": 400
    },
  }