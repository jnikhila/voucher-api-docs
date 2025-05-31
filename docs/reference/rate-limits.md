# Rate Limits Reference

Learn about Voucher API rate limits and how to handle them.

## Rate Limit Headers

All API responses include rate limit headers:

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1710936000
```

## Default Limits

| Limit Type | Limit | Window |
|------------|-------|---------|
| Hourly | 1000 requests | 1 hour |
| Minute | 100 requests | 1 minute |
| Second | 10 requests | 1 second |

## Endpoint-Specific Limits

| Endpoint | Limit | Window |
|----------|-------|---------|
| `/vouchers/validate` | 200 requests | 1 minute |
| `/vouchers/apply` | 100 requests | 1 minute |
| `/analytics/export` | 10 requests | 1 hour |

## Rate Limit Errors

When rate limit is exceeded:

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

1. **Request Management**
   - Implement request queuing
   - Use batch operations
   - Cache responses

2. **Error Handling**
   - Implement exponential backoff
   - Monitor rate limit headers
   - Handle retries gracefully

3. **Performance**
   - Optimize request patterns
   - Use appropriate endpoints
   - Monitor usage patterns

## Next Steps

- Review [error handling](errors.md)
- Check [voucher endpoints](../api-reference/vouchers.md)
- See [webhook events](webhooks.md) 