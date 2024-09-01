import { ApiResponseSchemaHost } from "@nestjs/swagger";

export const create_product_response_schema: ApiResponseSchemaHost['schema'] = {
    example: {
        "status": true,
        "statusCode": 200,
        "data": {
            "new_product": {
                "id": 8,
                "name": "Baby Diaper",
                "price": "2500.51",
                "UserId": 3,
                "slug": "baby-diaper-19",
                "is_approved": false,
                "updatedAt": "2024-09-01T18:25:37.118Z",
                "createdAt": "2024-09-01T18:25:37.118Z"
            }
        }
    }
}

export const update_product_response_schema: ApiResponseSchemaHost['schema'] = {
    example: {
        "status": true,
        "statusCode": 200,
        "data": {
            "updated_product": {
                "id": 2,
                "name": "Okin soap-19",
                "price": "2500.00",
                "slug": "okin-soap-19",
                "is_approved": false,
                "UserId": 3,
                "createdAt": "2024-08-31T09:51:13.929Z",
                "updatedAt": "2024-09-01T21:39:48.453Z"
            }
        }
    }
}

export const get_merchant_products_schema: ApiResponseSchemaHost['schema'] = {
    example: {
        "status": true,
        "statusCode": 200,
        "data": {
            "count": 8,
            "products": [
                {
                    "id": 3,
                    "name": "Diaper",
                    "price": "2500.00",
                    "slug": "diaper",
                    "is_approved": false,
                    "UserId": 3,
                    "createdAt": "2024-08-31T10:15:25.489Z",
                    "updatedAt": "2024-08-31T10:15:25.489Z"
                },
                {
                    "id": 5,
                    "name": "Baby Diaper",
                    "price": "2500.50",
                    "slug": "baby-diaper-14",
                    "is_approved": false,
                    "UserId": 3,
                    "createdAt": "2024-08-31T10:16:03.935Z",
                    "updatedAt": "2024-08-31T10:16:03.935Z"
                }
            ]
        }
    }
}

export const get_products_for_admin_schema: ApiResponseSchemaHost['schema'] = {
    example: {
        "status": true,
        "statusCode": 200,
        "data": {
            "count": 8,
            "products": [
                {
                    "id": 5,
                    "name": "Baby Diaper",
                    "price": "2500.50",
                    "slug": "baby-diaper-14",
                    "is_approved": false,
                    "UserId": 3,
                    "createdAt": "2024-08-31T10:16:03.935Z",
                    "updatedAt": "2024-08-31T10:16:03.935Z",
                    "Merchant": {
                        "name": "Owoade Anu"
                    }
                },
                {
                    "id": 6,
                    "name": "Baby Diaper",
                    "price": "2500.51",
                    "slug": "baby-diaper-17",
                    "is_approved": false,
                    "UserId": 3,
                    "createdAt": "2024-08-31T10:16:19.336Z",
                    "updatedAt": "2024-08-31T10:16:19.336Z",
                    "Merchant": {
                        "name": "Owoade Anu"
                    }
                }
            ]
        }
    }
}

export const delete_product_response_schema: ApiResponseSchemaHost['schema'] = {
    example: {
        "status": true,
        "message": "Product deletion initiated",
        "statusCode": 200,
        "data": {}
    }
}

export const review_product_response_schema: ApiResponseSchemaHost['schema'] = {
    example: {
        "status": true,
        "statusCode": 200,
        "data": {
            "updated_user": {
                "id": 4,
                "name": "Baby Diaper",
                "price": "2500.50",
                "slug": "baby-diaper",
                "is_approved": true,
                "UserId": 3,
                "createdAt": "2024-08-31T10:15:55.180Z",
                "updatedAt": "2024-09-01T23:31:42.876Z"
            }
        }
    }
}
  