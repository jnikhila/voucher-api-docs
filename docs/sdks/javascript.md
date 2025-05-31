# JavaScript SDK Reference

Learn how to use Voucher API with JavaScript.

## Installation

```bash
npm install @voucher/api
```

## Configuration

```javascript
import { VoucherClient } from '@voucher/api';

const client = new VoucherClient({
  apiKey: 'your_api_key',
  environment: 'production' // or 'sandbox'
});
```

## Core Features

### Create Voucher

```javascript
const voucher = await client.vouchers.create({
  code: 'SUMMER2024',
  type: 'percentage',
  value: 20,
  conditions: {
    min_order_value: 50.00,
    max_uses: 1000
  }
});
```

### Validate Voucher

```javascript
const validation = await client.vouchers.validate({
  code: 'SUMMER2024',
  order: {
    value: 100.00,
    currency: 'USD'
  }
});
```

### Apply Voucher

```javascript
const result = await client.vouchers.apply({
  code: 'SUMMER2024',
  order_id: 'order_123'
});
```

## Advanced Features

### Batch Operations

```javascript
const results = await client.vouchers.batchCreate([
  {
    code: 'SUMMER2024',
    type: 'percentage',
    value: 20
  },
  {
    code: 'WINTER2024',
    type: 'fixed',
    value: 10.00
  }
]);
```

### Analytics

```javascript
const analytics = await client.analytics.getPerformance({
  start_date: '2024-01-01',
  end_date: '2024-03-20'
});
```

## Error Handling

```javascript
try {
  const voucher = await client.vouchers.create({
    code: 'SUMMER2024',
    type: 'percentage',
    value: 20
  });
} catch (error) {
  if (error.code === 'INVALID_REQUEST') {
    // Handle validation error
  } else if (error.code === 'RATE_LIMIT_EXCEEDED') {
    // Handle rate limit error
  }
}
```

## Webhooks

```javascript
import { WebhookHandler } from '@voucher/api';

const handler = new WebhookHandler('your_webhook_secret');

app.post('/webhooks/voucher', async (req, res) => {
  const event = handler.verify(req.body, req.headers['x-voucher-signature']);
  
  switch (event.type) {
    case 'voucher.created':
      // Handle created event
      break;
    case 'voucher.validated':
      // Handle validated event
      break;
  }
  
  res.status(200).send('Webhook received');
});
```

## Best Practices

1. **Error Handling**
   - Use try-catch blocks
   - Handle specific error codes
   - Implement retry logic

2. **Performance**
   - Use batch operations
   - Cache responses
   - Monitor rate limits

3. **Security**
   - Store API keys securely
   - Verify webhook signatures
   - Use HTTPS endpoints

## Next Steps

- Review [error handling](../reference/errors.md)
- Check [rate limits](../reference/rate-limits.md)
- See [webhook events](../reference/webhooks.md)
- Learn about [complex discounts](../guides/complex-discounts.md)
- Explore [integration patterns](../guides/integration-patterns.md)

## Additional Resources

- [API Reference](../api-reference/vouchers.md)
- [Webhook Documentation](../reference/webhooks.md)
- [Rate Limits](../reference/rate-limits.md) 