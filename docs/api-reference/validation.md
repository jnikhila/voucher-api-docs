# Validation API

The Validation API provides real-time validation for vouchers before they are applied to orders. This ensures that vouchers meet all conditions and calculates the exact discount amount that will be applied.

> **Overview**
> 
> The Validation API is a crucial component of the voucher system that performs comprehensive checks before voucher application. It validates voucher existence, expiration dates, usage limits, order conditions, and calculates precise discount amounts. This pre-validation step helps prevent errors and provides immediate feedback to users about voucher eligibility and expected savings.

## Validation Process

The validation process follows a systematic approach to ensure vouchers are properly validated:

### 1. Basic Validation
- **Voucher Existence**: Verify the voucher code exists and is active
- **Expiration Check**: Ensure the voucher hasn't expired
- **Usage Limits**: Check if usage limits have been reached

### 2. Condition Validation
- **Order Value**: Validate minimum order requirements
- **Item Eligibility**: Check if specific items qualify for the discount
- **Customer Conditions**: Verify customer segment and eligibility

### 3. Discount Calculation
- **Amount Calculation**: Compute the exact discount amount
- **Restriction Application**: Apply any limitations or caps
- **Special Cases**: Handle complex discount scenarios

## Validation Endpoint

Validates a voucher code against an order to determine eligibility and calculate the discount amount.

```http
POST /vouchers/validate
```

### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `code` | string | ✅ | Voucher code to validate |
| `order` | object | ✅ | Order details for validation |
| `customer` | object | ❌ | Customer information for validation |

### Example Request

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
              "price": 5000,
              "quantity": 2
            }
          ]
        },
        "customer": {
          "id": "customer_123",
          "segment": "premium"
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
              price: 5000,
              quantity: 2
            }
          ]
        },
        customer: {
          id: 'customer_123',
          segment: 'premium'
        }
      })
    });
    
    const validation = await response.json();
    ```

=== "Python"
    ```python
    import requests

    response = requests.post(
        'https://api.voucher.com/v1/vouchers/validate',
        headers={
            'Authorization': 'Bearer sk_test_...',
            'Content-Type': 'application/json'
        },
        json={
            'code': 'SUMMER2024',
            'order': {
                'value': 10000,
                'currency': 'USD',
                'items': [
                    {
                        'id': 'item_1',
                        'price': 5000,
                        'quantity': 2
                    }
                ]
            },
            'customer': {
                'id': 'customer_123',
                'segment': 'premium'
            }
        }
    )
    
    validation = response.json()
    ```

### Response

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
    "valid_date_range": true,
    "customer_eligible": true
  },
  "applied_to": [
    {
      "item_id": "item_1",
      "original_price": 10000,
      "discount_amount": 2000,
      "final_price": 8000
    }
  ],
  "conditions_met": [
    "min_order_value",
    "customer_segment",
    "usage_limit"
  ]
}
```

!!! success "Validation Successful"
    The voucher is valid and ready to be applied. The `discount_amount` shows the exact amount that will be deducted from the order total.

!!! warning "Validation vs Application"
    This endpoint only validates the voucher. Use the [Apply Voucher](../vouchers.md#apply-a-voucher) endpoint to actually apply the discount to the order.

## Validation Rules

The validation system supports various rule types to ensure vouchers are applied correctly:

### Order Value Rules

```json
{
  "type": "order_value",
  "operator": "gte",
  "value": 5000,
  "currency": "USD"
}
```

**Supported Operators:**
- `gte` - Greater than or equal
- `gt` - Greater than
- `lte` - Less than or equal
- `lt` - Less than
- `eq` - Equal to

### Item Rules

```json
{
  "type": "items",
  "rules": [
    {
      "item_id": "item_1",
      "min_quantity": 1,
      "max_quantity": 10
    },
    {
      "category": "electronics",
      "min_value": 2500
    }
  ]
}
```

### Customer Rules

```json
{
  "type": "customer",
  "rules": [
    {
      "segment": "premium",
      "min_orders": 5
    },
    {
      "registration_date": {
        "operator": "gte",
        "value": "2024-01-01T00:00:00Z"
      }
    }
  ]
}
```

## Error Responses

The validation API returns detailed error responses when vouchers cannot be applied:

### Invalid Voucher (400)

```json
{
  "error": {
    "code": "VOUCHER_INVALID",
    "message": "Voucher is not valid for this order",
    "details": {
      "reason": "Order value below minimum",
      "min_required": 5000,
      "current_value": 3000,
      "currency": "USD"
    }
  }
}
```

### Expired Voucher (400)

```json
{
  "error": {
    "code": "VOUCHER_EXPIRED",
    "message": "Voucher has expired",
    "details": {
      "expired_at": "2024-03-19T23:59:59Z",
      "current_time": "2024-03-20T10:00:00Z"
    }
  }
}
```

### Usage Limit Exceeded (400)

```json
{
  "error": {
    "code": "USAGE_LIMIT_EXCEEDED",
    "message": "Voucher usage limit has been reached",
    "details": {
      "max_uses": 100,
      "current_uses": 100,
      "limit_type": "total_uses"
    }
  }
}
```

### Voucher Not Found (404)

```json
{
  "error": {
    "code": "VOUCHER_NOT_FOUND",
    "message": "Voucher code not found",
    "details": {
      "code": "INVALIDCODE",
      "suggestions": [
        "SUMMER2024",
        "WELCOME10"
      ]
    }
  }
}
```

## Best Practices

### Validation Timing

!!! tip "Early Validation"
    Validate vouchers as soon as users enter them to provide immediate feedback and improve user experience.

!!! tip "Revalidation"
    Always revalidate vouchers before applying them, as conditions may have changed between validation and application.

!!! tip "Caching"
    Cache validation results for a short period to improve performance, but ensure they're refreshed when needed.

### Error Handling

!!! warning "Comprehensive Error Handling"
    Handle all possible error cases and provide clear, actionable error messages to users.

!!! warning "Logging"
    Log validation failures for monitoring and debugging purposes.

### Performance Optimization

!!! success "Optimization Tips"
    - Use efficient validation algorithms
    - Implement caching strategies
    - Monitor response times
    - Use database indexes for voucher lookups

## Rate Limits

| Endpoint | Limit | Window | Description |
|----------|-------|--------|-------------|
| `/vouchers/validate` | 200 requests | 1 minute | Validation requests |

!!! info "Rate Limit Headers"
    Response headers include rate limit information:
    
    ```
    X-RateLimit-Limit: 200
    X-RateLimit-Remaining: 185
    X-RateLimit-Reset: 1647763200
    ```

## Testing

Use the validation endpoint to test voucher scenarios without affecting actual usage counts.

!!! tip "Test Mode"
    Test validations are clearly marked and don't affect real voucher usage or limits.

## Next Steps

- [Vouchers API](../vouchers.md) - Complete voucher management endpoints
- [Analytics API](analytics.md) - Track validation performance and usage
- [Advanced Types](advanced-types.md) - Complex validation scenarios
- [Error Reference](../../reference/errors.md) - Complete error code documentation