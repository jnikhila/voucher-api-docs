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

- Review [error handling](../../reference/errors.md)
- Check [rate limits](../../reference/rate-limits.md)
- See [webhook events](../../reference/webhooks.md)
- Learn about [complex discounts](../../guides/complex-discounts.md)
- Explore [integration patterns](../../guides/integration-patterns.md)

## Additional Resources

```javascript
// Create a voucher
const voucher = await client.vouchers.create({
  code: 'SUMMER2024',
  name: 'Summer Sale',
  type: 'percentage',
  discount_config: {
    percentage: 20.0,
    max_discount_amount: 100.00
  },
  conditions: {
    min_order_value: 50.00,
    max_uses_per_customer: 1
  }
});

// List vouchers
const vouchers = await client.vouchers.list({
  limit: 10,
  offset: 0,
  status: 'active'
});

// Get a specific voucher
const voucher = await client.vouchers.get('SUMMER2024');

// Update a voucher
const updatedVoucher = await client.vouchers.update('SUMMER2024', {
  name: 'Updated Summer Sale',
  discount_config: {
    percentage: 25.0
  }
});

// Delete a voucher
await client.vouchers.delete('SUMMER2024');
```

### Voucher Validation

```javascript
// Validate a voucher
const validation = await client.vouchers.validate({
  code: 'SUMMER2024',
  order_value: 100.00,
  customer_id: 'customer_123',
  items: [
    {
      id: 'item_1',
      price: 50.00,
      quantity: 2
    }
  ]
});

// Check validation result
if (validation.isValid) {
  console.log('Discount amount:', validation.discount_amount);
} else {
  console.log('Validation failed:', validation.error);
}
```

### Voucher Application

```javascript
// Apply a voucher
const application = await client.vouchers.apply({
  code: 'SUMMER2024',
  order_id: 'order_456',
  customer_id: 'customer_123',
  items: [
    {
      id: 'item_1',
      price: 50.00,
      quantity: 2
    }
  ]
});

// Remove applied voucher
await client.vouchers.remove({
  code: 'SUMMER2024',
  order_id: 'order_456'
});
```

### Analytics

```javascript
// Get voucher analytics
const analytics = await client.analytics.getVoucherStats({
  voucher_id: 'SUMMER2024',
  start_date: '2024-01-01',
  end_date: '2024-12-31'
});

// Get redemption history
const redemptions = await client.analytics.getRedemptions({
  voucher_id: 'SUMMER2024',
  limit: 10,
  offset: 0
});
```

## Error Handling

```javascript
try {
  const voucher = await client.vouchers.create({
    code: 'SUMMER2024',
    // ... other options
  });
} catch (error) {
  if (error instanceof VoucherError) {
    switch (error.code) {
      case 'INVALID_VOUCHER_CODE':
        console.error('Invalid voucher code format');
        break;
      case 'DUPLICATE_VOUCHER_CODE':
        console.error('Voucher code already exists');
        break;
      case 'RATE_LIMIT_EXCEEDED':
        console.error('Too many requests');
        break;
      default:
        console.error('Unknown error:', error.message);
    }
  } else {
    console.error('Unexpected error:', error);
  }
}
```

## Webhooks

```javascript
// Set up webhook handler
client.webhooks.on('voucher.redeemed', async (event) => {
  const { voucher_id, order_id, customer_id } = event.data;
  
  // Handle voucher redemption
  await updateOrderStatus(order_id, 'voucher_redeemed');
  await notifyCustomer(customer_id, 'voucher_used');
});

// Start webhook server
client.webhooks.start(3000);
```

## Best Practices

### 1. Error Handling

```javascript
class VoucherService {
  async applyVoucher(code, orderId) {
    try {
      const validation = await this.client.vouchers.validate({
        code,
        order_id: orderId
      });

      if (!validation.isValid) {
        throw new VoucherError('INVALID_VOUCHER', validation.error);
      }

      return await this.client.vouchers.apply({
        code,
        order_id: orderId
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  handleError(error) {
    if (error instanceof VoucherError) {
      // Handle known errors
      this.logger.error(`Voucher error: ${error.code}`, error);
    } else {
      // Handle unexpected errors
      this.logger.error('Unexpected error', error);
    }
  }
}
```

### 2. Caching

```javascript
class CachedVoucherClient {
  constructor(client) {
    this.client = client;
    this.cache = new Map();
  }

  async getVoucher(code) {
    if (this.cache.has(code)) {
      return this.cache.get(code);
    }

    const voucher = await this.client.vouchers.get(code);
    this.cache.set(code, voucher);
    return voucher;
  }

  invalidateCache(code) {
    this.cache.delete(code);
  }
}
```

### 3. Retry Logic

```javascript
class RetryableVoucherClient {
  constructor(client) {
    this.client = client;
    this.maxRetries = 3;
  }

  async withRetry(operation) {
    let lastError;
    
    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error;
        
        if (this.shouldRetry(error)) {
          await this.delay(attempt * 1000);
          continue;
        }
        
        throw error;
      }
    }
    
    throw lastError;
  }

  shouldRetry(error) {
    return (
      error.code === 'RATE_LIMIT_EXCEEDED' ||
      error.code === 'SERVICE_UNAVAILABLE'
    );
  }
}
```

## TypeScript Support

The SDK includes TypeScript definitions:

```typescript
import { VoucherClient, Voucher, ValidationResult } from '@voucher/api-sdk';

const client = new VoucherClient({
  apiKey: 'your_api_key'
});

async function applyVoucher(
  code: string,
  orderId: string
): Promise<ValidationResult> {
  return client.vouchers.apply({
    code,
    order_id: orderId
  });
}
```

## Testing

```javascript
import { VoucherClient } from '@voucher/api-sdk';
import { mockVoucherApi } from '@voucher/api-sdk/testing';

describe('VoucherClient', () => {
  let client;

  beforeEach(() => {
    client = new VoucherClient({
      apiKey: 'test_key'
    });
    mockVoucherApi(client);
  });

  it('should create a voucher', async () => {
    const voucher = await client.vouchers.create({
      code: 'TEST2024',
      name: 'Test Voucher',
      type: 'percentage',
      discount_config: {
        percentage: 10.0
      }
    });

    expect(voucher.code).toBe('TEST2024');
    expect(voucher.type).toBe('percentage');
  });
});
```

## Next Steps

- Review [Complex Discounts](../../guides/complex-discounts.md) for advanced scenarios
- Explore [Integration Patterns](../../guides/integration-patterns.md) for best practices
- Check [Error Codes](../../reference/errors.md) for troubleshooting

## Additional Resources

- [API Reference](../../api-reference/vouchers.md)
- [Webhook Documentation](../../reference/webhooks.md)
- [Rate Limits](../../reference/rate-limits.md) 