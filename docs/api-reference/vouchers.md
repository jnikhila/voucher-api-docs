# Voucher API Reference

Learn about Voucher API endpoints and operations.

## Base URL

```
https://api.voucher.com/v1
```

All API requests require authentication using an API key.

## Endpoints

### Create Voucher

```http
POST /vouchers
```

#### Request Body

```json
{
  "code": "SUMMER2024",
  "type": "percentage",
  "value": 20,
  "conditions": {
    "min_order_value": 50.00,
    "max_uses": 1000
  }
}
```

#### Response

```json
{
  "id": "v_123",
  "code": "SUMMER2024",
  "type": "percentage",
  "value": 20,
  "conditions": {
    "min_order_value": 50.00,
    "max_uses": 1000
  },
  "created_at": "2024-03-20T10:00:00Z"
}
```

### Validate Voucher

```http
POST /vouchers/validate
```

#### Request Body

```json
{
  "code": "SUMMER2024",
  "order": {
    "value": 100.00,
    "currency": "USD"
  }
}
```

#### Response

```json
{
  "is_valid": true,
  "discount_amount": 20.00,
  "currency": "USD"
}
```

### Apply Voucher

```http
POST /vouchers/apply
```

#### Request Body

```json
{
  "code": "SUMMER2024",
  "order_id": "order_123"
}
```

#### Response

```json
{
  "id": "v_123",
  "code": "SUMMER2024",
  "order_id": "order_123",
  "discount_amount": 20.00,
  "currency": "USD",
  "applied_at": "2024-03-20T10:01:00Z"
}
```

### List Vouchers

```http
GET /vouchers
```

#### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `limit` | integer | Number of results |
| `offset` | integer | Result offset |
| `status` | string | Voucher status |

#### Response

```json
{
  "data": [
    {
      "id": "v_123",
      "code": "SUMMER2024",
      "type": "percentage",
      "value": 20,
      "status": "active"
    }
  ],
  "total": 100,
  "limit": 10,
  "offset": 0
}
```

### Get Voucher

```http
GET /vouchers/{voucher_id}
```

#### Response

```json
{
  "id": "v_123",
  "code": "SUMMER2024",
  "type": "percentage",
  "value": 20,
  "conditions": {
    "min_order_value": 50.00,
    "max_uses": 1000
  },
  "status": "active",
  "created_at": "2024-03-20T10:00:00Z"
}
```

### Update Voucher

```http
PUT /vouchers/{voucher_id}
```

#### Request Body

```json
{
  "value": 25,
  "conditions": {
    "min_order_value": 75.00
  }
}
```

#### Response

```json
{
  "id": "v_123",
  "code": "SUMMER2024",
  "type": "percentage",
  "value": 25,
  "conditions": {
    "min_order_value": 75.00,
    "max_uses": 1000
  },
  "updated_at": "2024-03-20T10:02:00Z"
}
```

### Delete Voucher

```http
DELETE /vouchers/{voucher_id}
```

#### Response

```json
{
  "id": "v_123",
  "deleted_at": "2024-03-20T10:03:00Z"
}
```

## Error Responses

### Invalid Request

```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Request validation failed",
    "details": [
      {
        "field": "value",
        "message": "Value must be between 0 and 100"
      }
    ]
  }
}
```

### Not Found

```json
{
  "error": {
    "code": "VOUCHER_NOT_FOUND",
    "message": "Voucher not found",
    "details": {
      "voucher_id": "v_123"
    }
  }
}
```

## Rate Limits

| Endpoint | Limit | Window |
|----------|-------|---------|
| `/vouchers` | 100 requests | 1 minute |
| `/vouchers/validate` | 200 requests | 1 minute |
| `/vouchers/apply` | 100 requests | 1 minute |

## Next Steps

- Review [validation reference](validation.md)
- Check [analytics endpoints](analytics.md)
- See [advanced types](advanced-types.md)