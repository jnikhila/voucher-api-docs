# Vouchers API

The Vouchers API allows you to create, manage, and apply discount vouchers to orders. Vouchers can be percentage-based or fixed-amount discounts with customizable conditions and restrictions.

> **Overview**
> Vouchers are discount codes that customers can apply to their orders. They support various discount types, usage limits, and validation rules to ensure proper application. This API provides a complete solution for managing promotional campaigns, customer discounts, and loyalty programs with real-time validation and comprehensive analytics.

### Key Features

- **Multiple discount types**: Percentage and fixed-amount discounts
- **Flexible conditions**: Minimum order values, usage limits, date restrictions
- **Real-time validation**: Instant voucher validation before application
- **Usage tracking**: Monitor voucher usage and performance
- **Webhook support**: Get notified of voucher events

## Base URL

```bash
https://api.voucher.com/v1
```

!!! info "Authentication Required"
    All API requests require authentication using your API key. Include it in the `Authorization` header:
    
    ```bash
    Authorization: Bearer sk_test_...
    ```

## Endpoints

### Create a Voucher

Creates a new voucher with the specified discount type, value, and conditions.

```http
POST /vouchers
```

#### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `code` | string | ✅ | Unique voucher code (e.g., "SUMMER2024") |
| `type` | string | ✅ | Discount type: `percentage` or `fixed` |
| `value` | number | ✅ | Discount value (percentage: 0-100, fixed: amount in cents) |
| `conditions` | object | ❌ | Additional conditions and restrictions |

#### Example Request

=== "cURL"
    ```bash
    curl -X POST https://api.voucher.com/v1/vouchers \
      -H "Authorization: Bearer sk_test_..." \
      -H "Content-Type: application/json" \
      -d '{
        "code": "SUMMER2024",
        "type": "percentage",
        "value": 20,
        "conditions": {
          "min_order_value": 5000,
          "max_uses": 1000,
          "valid_from": "2024-06-01T00:00:00Z",
          "valid_until": "2024-08-31T23:59:59Z"
        }
      }'
    ```

=== "JavaScript"
    ```javascript
    const response = await fetch('https://api.voucher.com/v1/vouchers', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer sk_test_...',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        code: 'SUMMER2024',
        type: 'percentage',
        value: 20,
        conditions: {
          min_order_value: 5000,
          max_uses: 1000,
          valid_from: '2024-06-01T00:00:00Z',
          valid_until: '2024-08-31T23:59:59Z'
        }
      })
    });
    
    const voucher = await response.json();
    ```

=== "Python"
    ```python
    import requests

    response = requests.post(
        'https://api.voucher.com/v1/vouchers',
        headers={
            'Authorization': 'Bearer sk_test_...',
            'Content-Type': 'application/json'
        },
        json={
            'code': 'SUMMER2024',
            'type': 'percentage',
            'value': 20,
            'conditions': {
                'min_order_value': 5000,
                'max_uses': 1000,
                'valid_from': '2024-06-01T00:00:00Z',
                'valid_until': '2024-08-31T23:59:59Z'
            }
        }
    )
    
    voucher = response.json()
    ```

#### Response

```json
{
  "id": "v_1234567890abcdef",
  "code": "SUMMER2024",
  "type": "percentage",
  "value": 20,
  "conditions": {
    "min_order_value": 5000,
    "max_uses": 1000,
    "valid_from": "2024-06-01T00:00:00Z",
    "valid_until": "2024-08-31T23:59:59Z"
  },
  "status": "active",
  "usage_count": 0,
  "created_at": "2024-03-20T10:00:00Z",
  "updated_at": "2024-03-20T10:00:00Z"
}
```

!!! success "Voucher Created Successfully"
    The voucher is now active and ready to be used by customers. The `usage_count` starts at 0 and increments with each successful application.

### Validate a Voucher

Validates a voucher code against an order to check if it can be applied and calculate the discount amount.

```http
POST /vouchers/validate
```

#### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `code` | string | ✅ | Voucher code to validate |
| `order` | object | ✅ | Order details for validation |

#### Example Request

=== "cURL"
    ```bash
    curl -X POST https://api.voucher.com/v1/vouchers/validate \
      -H "Authorization: Bearer sk_test_..." \
      -H "Content-Type: application/json" \
      -d '{
        "code": "SUMMER2024",
        "order": {
          "value": 10000,
          "currency": "USD",
          "items": [
            {
              "id": "item_1",
              "price": 10000,
              "quantity": 1
            }
          ]
        }
      }'
    ```

=== "JavaScript"
    ```javascript
    const response = await fetch('https://api.voucher.com/v1/vouchers/validate', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer sk_test_...',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        code: 'SUMMER2024',
        order: {
          value: 10000,
          currency: 'USD',
          items: [
            {
              id: 'item_1',
              price: 10000,
              quantity: 1
            }
          ]
        }
      })
    });
    
    const validation = await response.json();
    ```

#### Response

```json
{
  "is_valid": true,
  "voucher": {
    "id": "v_1234567890abcdef",
    "code": "SUMMER2024",
    "type": "percentage",
    "value": 20
  },
  "discount_amount": 2000,
  "final_amount": 8000,
  "currency": "USD",
  "validation_details": {
    "min_order_value_met": true,
    "usage_limit_not_exceeded": true,
    "valid_date_range": true
  }
}
```

!!! warning "Validation vs Application"
    Validation only checks if a voucher can be applied. It doesn't reserve or apply the voucher. Use the [Apply Voucher](#apply-a-voucher) endpoint to actually apply the discount.

### Apply a Voucher

Applies a validated voucher to an order, creating a permanent record of the discount application.

```http
POST /vouchers/apply
```

#### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `code` | string | ✅ | Voucher code to apply |
| `order_id` | string | ✅ | Unique identifier for the order |

#### Example Request

=== "cURL"
    ```bash
    curl -X POST https://api.voucher.com/v1/vouchers/apply \
      -H "Authorization: Bearer sk_test_..." \
      -H "Content-Type: application/json" \
      -d '{
        "code": "SUMMER2024",
        "order_id": "order_1234567890"
      }'
    ```

=== "JavaScript"
    ```javascript
    const response = await fetch('https://api.voucher.com/v1/vouchers/apply', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer sk_test_...',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        code: 'SUMMER2024',
        order_id: 'order_1234567890'
      })
    });
    
    const application = await response.json();
    ```

#### Response

```json
{
  "id": "va_1234567890abcdef",
  "voucher": {
    "id": "v_1234567890abcdef",
    "code": "SUMMER2024"
  },
  "order_id": "order_1234567890",
  "discount_amount": 2000,
  "final_amount": 8000,
  "currency": "USD",
  "applied_at": "2024-03-20T10:01:00Z"
}
```

!!! important "Idempotency"
    Applying the same voucher code to the same order multiple times will return the same result without creating duplicate applications.

### List Vouchers

Retrieves a list of vouchers with optional filtering and pagination.

```http
GET /vouchers
```

#### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `limit` | integer | Number of results (default: 10, max: 100) |
| `offset` | integer | Result offset for pagination |
| `status` | string | Filter by status: `active`, `inactive`, `expired` |
| `type` | string | Filter by discount type: `percentage`, `fixed` |
| `created_after` | string | Filter vouchers created after this timestamp |
| `created_before` | string | Filter vouchers created before this timestamp |

#### Example Request

=== "cURL"
    ```bash
    curl -X GET "https://api.voucher.com/v1/vouchers?limit=5&status=active" \
      -H "Authorization: Bearer sk_test_..."
    ```

=== "JavaScript"
    ```javascript
    const response = await fetch(
      'https://api.voucher.com/v1/vouchers?limit=5&status=active',
      {
        headers: {
          'Authorization': 'Bearer sk_test_...'
        }
      }
    );
    
    const vouchers = await response.json();
    ```

#### Response

```json
{
  "data": [
    {
      "id": "v_1234567890abcdef",
      "code": "SUMMER2024",
      "type": "percentage",
      "value": 20,
      "status": "active",
      "usage_count": 45,
      "created_at": "2024-03-20T10:00:00Z"
    },
    {
      "id": "v_0987654321fedcba",
      "code": "WELCOME10",
      "type": "fixed",
      "value": 1000,
      "status": "active",
      "usage_count": 12,
      "created_at": "2024-03-19T15:30:00Z"
    }
  ],
  "total": 25,
  "limit": 5,
  "offset": 0,
  "has_more": true
}
```

### Retrieve a Voucher

Retrieves detailed information about a specific voucher.

```http
GET /vouchers/{voucher_id}
```

#### Example Request

=== "cURL"
    ```bash
    curl -X GET https://api.voucher.com/v1/vouchers/v_1234567890abcdef \
      -H "Authorization: Bearer sk_test_..."
    ```

=== "JavaScript"
    ```javascript
    const response = await fetch(
      'https://api.voucher.com/v1/vouchers/v_1234567890abcdef',
      {
        headers: {
          'Authorization': 'Bearer sk_test_...'
        }
      }
    );
    
    const voucher = await response.json();
    ```

#### Response

```json
{
  "id": "v_1234567890abcdef",
  "code": "SUMMER2024",
  "type": "percentage",
  "value": 20,
  "conditions": {
    "min_order_value": 5000,
    "max_uses": 1000,
    "valid_from": "2024-06-01T00:00:00Z",
    "valid_until": "2024-08-31T23:59:59Z"
  },
  "status": "active",
  "usage_count": 45,
  "usage_history": [
    {
      "order_id": "order_1234567890",
      "discount_amount": 2000,
      "applied_at": "2024-03-20T10:01:00Z"
    }
  ],
  "created_at": "2024-03-20T10:00:00Z",
  "updated_at": "2024-03-20T10:01:00Z"
}
```

### Update a Voucher

Updates an existing voucher's properties. Only certain fields can be modified after creation.

```http
PUT /vouchers/{voucher_id}
```

#### Updatable Fields

| Field | Description |
|-------|-------------|
| `value` | Discount value (percentage or fixed amount) |
| `conditions` | Voucher conditions and restrictions |
| `status` | Voucher status (`active`, `inactive`) |

#### Example Request

=== "cURL"
    ```bash
    curl -X PUT https://api.voucher.com/v1/vouchers/v_1234567890abcdef \
      -H "Authorization: Bearer sk_test_..." \
      -H "Content-Type: application/json" \
      -d '{
        "value": 25,
        "conditions": {
          "min_order_value": 7500
        }
      }'
    ```

=== "JavaScript"
    ```javascript
    const response = await fetch(
      'https://api.voucher.com/v1/vouchers/v_1234567890abcdef',
      {
        method: 'PUT',
        headers: {
          'Authorization': 'Bearer sk_test_...',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          value: 25,
          conditions: {
            min_order_value: 7500
          }
        })
      }
    );
    
    const voucher = await response.json();
    ```

#### Response

```json
{
  "id": "v_1234567890abcdef",
  "code": "SUMMER2024",
  "type": "percentage",
  "value": 25,
  "conditions": {
    "min_order_value": 7500,
    "max_uses": 1000,
    "valid_from": "2024-06-01T00:00:00Z",
    "valid_until": "2024-08-31T23:59:59Z"
  },
  "status": "active",
  "updated_at": "2024-03-20T10:02:00Z"
}
```

!!! warning "Immutable Fields"
    The `code`, `type`, and `created_at` fields cannot be modified after voucher creation.

### Delete a Voucher

Deactivates a voucher, preventing it from being used in future orders.

```http
DELETE /vouchers/{voucher_id}
```

#### Example Request

=== "cURL"
    ```bash
    curl -X DELETE https://api.voucher.com/v1/vouchers/v_1234567890abcdef \
      -H "Authorization: Bearer sk_test_..."
    ```

=== "JavaScript"
    ```javascript
    const response = await fetch(
      'https://api.voucher.com/v1/vouchers/v_1234567890abcdef',
      {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer sk_test_...'
        }
      }
    );
    
    const result = await response.json();
    ```

#### Response

```json
{
  "id": "v_1234567890abcdef",
  "deleted_at": "2024-03-20T10:03:00Z"
}
```

!!! note "Soft Delete"
    Vouchers are soft-deleted, meaning they're marked as inactive but their data is preserved for audit purposes.

## Voucher Types

### Percentage Discount

Reduces the order total by a specified percentage.

```json
{
  "type": "percentage",
  "value": 20,
  "conditions": {
    "min_order_value": 5000
  }
}
```

**Example**: 20% off orders over $50.00

### Fixed Amount Discount

Reduces the order total by a fixed amount in the smallest currency unit (cents).

```json
{
  "type": "fixed",
  "value": 1000,
  "conditions": {
    "min_order_value": 2500
  }
}
```

**Example**: $10.00 off orders over $25.00

## Voucher Conditions

Vouchers support various conditions to control when and how they can be applied:

| Condition | Type | Description |
|-----------|------|-------------|
| `min_order_value` | integer | Minimum order value in cents |
| `max_uses` | integer | Maximum number of times the voucher can be used |
| `valid_from` | string | Start date for voucher validity (ISO 8601) |
| `valid_until` | string | End date for voucher validity (ISO 8601) |
| `customer_limit` | integer | Maximum uses per customer |
| `product_ids` | array | Specific product IDs the voucher applies to |
| `excluded_product_ids` | array | Product IDs excluded from the voucher |

## Error Handling

The API returns standard HTTP status codes and detailed error messages.

### Common Error Responses

#### Invalid Request (400)

```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Request validation failed",
    "details": [
      {
        "field": "value",
        "message": "Value must be between 0 and 100 for percentage vouchers"
      }
    ]
  }
}
```

#### Voucher Not Found (404)

```json
{
  "error": {
    "code": "VOUCHER_NOT_FOUND",
    "message": "Voucher not found",
    "details": {
      "voucher_id": "v_1234567890abcdef"
    }
  }
}
```

#### Voucher Already Applied (409)

```json
{
  "error": {
    "code": "VOUCHER_ALREADY_APPLIED",
    "message": "Voucher has already been applied to this order",
    "details": {
      "order_id": "order_1234567890",
      "voucher_id": "v_1234567890abcdef"
    }
  }
}
```

## Rate Limits

| Endpoint | Limit | Window | Description |
|----------|-------|--------|-------------|
| `/vouchers` (GET) | 100 requests | 1 minute | List and retrieve vouchers |
| `/vouchers` (POST) | 50 requests | 1 minute | Create vouchers |
| `/vouchers/validate` | 200 requests | 1 minute | Validate vouchers |
| `/vouchers/apply` | 100 requests | 1 minute | Apply vouchers |

!!! info "Rate Limit Headers"
    Response headers include rate limit information:
    
    ```
    X-RateLimit-Limit: 100
    X-RateLimit-Remaining: 95
    X-RateLimit-Reset: 1647763200
    ```

## Webhooks

Vouchers trigger webhook events for important actions:

- `voucher.created` - When a new voucher is created
- `voucher.updated` - When a voucher is modified
- `voucher.applied` - When a voucher is successfully applied to an order
- `voucher.expired` - When a voucher reaches its expiration date

See the [Webhooks reference](../reference/webhooks.md) for detailed information.

## Testing

Use test API keys to create and test vouchers without affecting production data.

!!! tip "Test Mode"
    Test vouchers are clearly marked and can be used with test orders. They don't affect real transactions or usage limits.

## Next Steps

- [Validation Reference](validation.md) - Learn about advanced validation rules
- [Analytics Endpoints](analytics.md) - Track voucher performance and usage
- [Advanced Types](advanced-types.md) - Complex discount scenarios and combinations
- [Integration Patterns](../guides/integration-patterns.md) - Best practices for implementing vouchers