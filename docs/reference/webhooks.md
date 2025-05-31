# Webhooks Reference

Learn about Voucher API webhooks and how to implement them.

## Webhook Events

| Event | Description | Payload |
|-------|-------------|---------|
| `voucher.created` | Voucher created | Voucher object |
| `voucher.updated` | Voucher updated | Voucher object |
| `voucher.deleted` | Voucher deleted | Voucher ID |
| `voucher.validated` | Voucher validated | Validation result |
| `voucher.applied` | Voucher applied | Application result |
| `voucher.expired` | Voucher expired | Voucher ID |

## Webhook Configuration

```json
{
  "url": "https://your-domain.com/webhooks/voucher",
  "events": ["voucher.created", "voucher.updated"],
  "secret": "your_webhook_secret"
}
```

## Event Payloads

### Voucher Created

```json
{
  "event": "voucher.created",
  "data": {
    "id": "v_123",
    "code": "SUMMER2024",
    "type": "percentage",
    "value": 20,
    "created_at": "2024-03-20T10:00:00Z"
  }
}
```

### Voucher Validated

```json
{
  "event": "voucher.validated",
  "data": {
    "voucher_id": "v_123",
    "is_valid": true,
    "discount_amount": 20.00,
    "validated_at": "2024-03-20T10:01:00Z"
  }
}
```

## Security

1. **Signature Verification**
   - Verify webhook signatures
   - Use secure webhook secrets
   - Implement request validation

2. **TLS Requirements**
   - Use HTTPS endpoints
   - Validate SSL certificates
   - Monitor certificate expiry

3. **IP Allowlisting**
   - Allowlist Voucher API IPs
   - Monitor IP changes
   - Update allowlist regularly

## Best Practices

1. **Implementation**
   - Handle duplicate events
   - Implement idempotency
   - Process events asynchronously

2. **Error Handling**
   - Log failed deliveries
   - Implement retry logic
   - Monitor webhook health

3. **Testing**
   - Use webhook testing tools
   - Verify event handling
   - Test error scenarios

## Next Steps

- Review [error handling](errors.md)
- Check [rate limits](rate-limits.md)
- See [changelog](changelog.md) 