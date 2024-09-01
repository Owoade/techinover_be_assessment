import { ApiResponseOptions, ApiResponseSchemaHost } from "@nestjs/swagger";

export const sign_up_response_schema: ApiResponseSchemaHost['schema'] = {
  example: {
    status: true,
    statusCode: 200,
    data: {
       "user": {
        "id": 6,
        "name": "Owoade Anuoluwapo",
        "email": "owoadeanu@yahoo.com",
        "is_banned": false,
        "updatedAt": "2024-08-31T20:18:10.600Z",
        "createdAt": "2024-08-31T20:18:10.600Z"
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Niwic2Vzc2lvbl9pZCI6IjJkYWU1OTJhLWI4ZTQtNDFhMC1hMjkxLTAxZDJjZjVhMGRlMyIsImlhdCI6MTcyNTEzNTQ5MX0.-ZmyKTv5FzuuTYbF1K-Kx4TxP6l5Gb1DJeh2i6rMPRc"
    },
  },
}
export const sign_in_response_schema: ApiResponseSchemaHost['schema'] = {
  example: {
    "status": true,
    "data": {
        "user": {
            "email": "owoadeanu@yahoo.com",
            "id": 3,
            "name": "Owoade Anu",
            "is_banned": false
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywic2Vzc2lvbl9pZCI6IjI4NzM4ZWYxLTM0ZjctNDdjZS1hODZmLTU3YWI3Njk3YzA3YyIsImlhdCI6MTcyNTIxNDgxNn0.s3D0HEflN72qL9AFGXVJaKj8gMNdDYCfXFyftsO04Ds"
    },
    "statusCode": 200
}
}

export const logout_response_schema: ApiResponseSchemaHost['schema'] = {
  example: {
    "status": true,
    "statusCode": 200,
    "data": {},
    "message": "You have successfully logged out"
}
}

export const admin_login_response_schema: ApiResponseSchemaHost['schema'] = {
  example: {
    "status": true,
    "statusCode": 200,
    "data": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywic2Vzc2lvbl9pZCI6IjA1YTkxOWY5LTVkZTQtNGU3ZC05NzI5LWQ0MmZlMGRhMWQ1NSIsImlhdCI6MTcyNTIzMTg3OX0.7_OAJACrjDEecYq1Txf2cpiio4poqRhPXMC2R03U-AE"
    }
  }
}

