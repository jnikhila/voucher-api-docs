# Validation Reference

Learn about Voucher API validation process.

## Validation Process

1. **Basic Validation**
   - Check voucher existence
   - Verify expiration
   - Validate usage limits

2. **Condition Validation**
   - Check order value
   - Verify item eligibility
   - Validate customer conditions

3. **Discount Calculation**
   - Calculate discount amount
   - Apply restrictions
   - Handle special cases

## Validation Endpoint

```http
POST /v1/vouchers/validate
```

### Request Body

```json
{
  "code": "SUMMER2024",
  "order": {
    "value": 100.00,
    "currency": "USD",
    "items": [
      {
        "id": "item_1",
        "price": 50.00,
        "quantity": 2
      }
    ]
  },
  "customer": {
    "id": "customer_123",
    "segment": "premium"
  }
}
```

### Response

```json
{
  "is_valid": true,
  "discount_amount": 20.00,
  "currency": "USD",
  "applied_to": [
    {
      "item_id": "item_1",
      "discount": 10.00
    }
  ],
  "conditions_met": [
    "min_order_value",
    "customer_segment"
  ]
}
```

## Validation Rules

### Order Value

```json
{
  "type": "order_value",
  "operator": "gte",
  "value": 50.00,
  "currency": "USD"
}
```

### Items

```json
{
  "type": "items",
  "rules": [
    {
      "item_id": "item_1",
      "min_quantity": 1
    }
  ]
}
```

### Customer

```json
{
  "type": "customer",
  "rules": [
    {
      "segment": "premium"
    }
  ]
}
```

## Error Responses

### Invalid Voucher

```json
{
  "error": {
    "code": "VOUCHER_INVALID",
    "message": "Voucher is not valid",
    "details": {
      "reason": "Order value below minimum",
      "min_required": 50.00,
      "current_value": 30.00
    }
  }
}
```

### Expired Voucher

```json
{
  "error": {
    "code": "VOUCHER_EXPIRED",
    "message": "Voucher has expired",
    "details": {
      "expired_at": "2024-03-19T23:59:59Z"
    }
  }
}
```

### Usage Limit Exceeded

```json
{
  "error": {
    "code": "USAGE_LIMIT_EXCEEDED",
    "message": "Voucher usage limit reached",
    "details": {
      "max_uses": 100,
      "current_uses": 100
    }
  }
}
```

## Best Practices

1. **Validation Timing**
   - Validate early
   - Revalidate before apply
   - Cache results

2. **Error Handling**
   - Handle all cases
   - Show clear messages
   - Log failures

3. **Performance**
   - Optimize checks
   - Use caching
   - Monitor response times

## Next Steps

- Review [voucher endpoints](vouchers.md)
- Check [analytics endpoints](analytics.md)
- See [advanced types](advanced-types.md)