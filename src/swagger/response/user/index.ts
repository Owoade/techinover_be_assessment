import { ApiResponseSchemaHost } from "@nestjs/swagger";

export const get_users_response_schema: ApiResponseSchemaHost['schema'] = {
    example: {
        "status": true,
        "statusCode": 200,
        "data": {
            "count": 3,
            "users": [
                {
                    "id": 3,
                    "email": "owoadeanu@yahoo.com",
                    "name": "Owoade Anu",
                    "is_banned": false,
                    "createdAt": "2024-08-31T09:36:11.705Z",
                    "updatedAt": "2024-08-31T12:19:21.340Z"
                },
                {
                    "id": 5,
                    "email": "owoadeanuoluwapo2@gmail.com",
                    "name": "Owoade Anu",
                    "is_banned": false,
                    "createdAt": "2024-08-31T12:47:26.337Z",
                    "updatedAt": "2024-08-31T12:47:26.337Z"
                },
                {
                    "id": 6,
                    "email": "owoadeanuoluwapo2@gmai.com",
                    "name": "Owoade Anu",
                    "is_banned": false,
                    "createdAt": "2024-08-31T20:18:10.600Z",
                    "updatedAt": "2024-08-31T20:18:10.600Z"
                }
            ]
        }
    }
}

export const toggle_user_access_response_schema: ApiResponseSchemaHost['schema'] = {
    example: {
        "status": true,
        "statusCode": 200,
        "data": {
            "updated_user": {
                "id": 3,
                "email": "owoadeanu@yahoo.com",
                "name": "Owoade Anu",
                "is_banned": true,
                "createdAt": "2024-08-31T09:36:11.705Z",
                "updatedAt": "2024-09-01T23:21:11.068Z"
            }
        }
    }
}