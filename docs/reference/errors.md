# Error Handling Reference

Learn how to handle errors in Voucher API responses.

## Error Response Format

All error responses follow this format:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description",
    "details": "Additional error details"
  }
}
```

## Common Error Codes

### Authentication Errors

| Code | Description |
|------|-------------|
| `INVALID_API_KEY` | API key is invalid or expired |
| `MISSING_API_KEY` | API key is missing from request |
| `INSUFFICIENT_PERMISSIONS` | API key lacks required permissions |

### Validation Errors

| Code | Description |
|------|-------------|
| `INVALID_REQUEST` | Request validation failed |
| `INVALID_VOUCHER_CODE` | Voucher code format is invalid |
| `INVALID_DISCOUNT_CONFIG` | Discount configuration is invalid |
| `INVALID_CONDITIONS` | Voucher conditions are invalid |

### Voucher Errors

| Code | Description |
|------|-------------|
| `VOUCHER_NOT_FOUND` | Voucher does not exist |
| `VOUCHER_EXPIRED` | Voucher has expired |
| `VOUCHER_INVALID` | Voucher is not valid for the order |
| `VOUCHER_ALREADY_USED` | Voucher has already been used |
| `USAGE_LIMIT_EXCEEDED` | Voucher usage limit reached |

### Rate Limit Errors

| Code | Description |
|------|-------------|
| `RATE_LIMIT_EXCEEDED` | Too many requests |
| `CONCURRENT_LIMIT_EXCEEDED` | Too many concurrent requests |

## Error Handling Examples

### Authentication Error

```json
{
  "error": {
    "code": "INVALID_API_KEY",
    "message": "API key is invalid",
    "details": {
      "key_id": "key_123",
      "expired_at": "2024-03-19T23:59:59Z"
    }
  }
}
```

### Validation Error

```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Request validation failed",
    "details": [
      {
        "field": "discount_config.percentage",
        "message": "Percentage must be between 0.01 and 100.00",
        "code": "INVALID_PERCENTAGE"
      }
    ]
  }
}
```

### Voucher Error

```json
{
  "error": {
    "code": "VOUCHER_INVALID",
    "message": "Voucher is not valid for this order",
    "details": {
      "reason": "Order value below minimum",
      "min_required": 25.00,
      "current_value": 20.00
    }
  }
}
```

### Rate Limit Error

```json
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests",
    "details": {
      "limit": 100,
      "reset_at": "2024-03-20T10:01:00Z"
    }
  }
}
```

## Best Practices

1. **Error Handling**
   - Handle all error cases
   - Show user-friendly messages
   - Log error details for debugging

2. **Rate Limiting**
   - Implement exponential backoff
   - Cache successful responses
   - Monitor rate limit headers

3. **Validation**
   - Validate requests before sending
   - Handle validation errors gracefully
   - Provide clear error messages

## Next Steps

- Review [voucher endpoints](../api-reference/vouchers.md)
- Check [validation reference](../api-reference/validation.md)
- See [rate limits](rate-limits.md) 