# JavaScript SDK

The official JavaScript SDK for the Voucher API provides a simple and intuitive way to integrate voucher functionality into your applications.

> **Overview**
> 
> The Voucher JavaScript SDK supports both browser and Node.js environments, offering a consistent API for creating, validating, and managing vouchers. Built with modern JavaScript features, it provides type safety, comprehensive error handling, and seamless integration with popular frameworks and build tools.

> **SDK Features**
> 
> - **Full API coverage** - All Voucher API endpoints
> - **TypeScript support** - Complete type definitions
> - **Promise-based** - Modern async/await syntax
> - **Error handling** - Comprehensive error management
> - **Webhook support** - Built-in webhook verification

## Installation

### NPM

```bash
npm install @voucher/api
```

### Yarn

```bash
yarn add @voucher/api
```

### CDN (Browser)

```html
<script src="https://unpkg.com/@voucher/api@latest/dist/voucher.min.js"></script>
```

## Quick Start

### Initialize the Client

=== "ES6 Modules"
    ```javascript
    import { VoucherClient } from '@voucher/api';

    const client = new VoucherClient({
      apiKey: 'sk_live_...',
      environment: 'production' // or 'sandbox'
    });
    ```

=== "CommonJS"
    ```javascript
    const { VoucherClient } = require('@voucher/api');

    const client = new VoucherClient({
      apiKey: 'sk_live_...',
      environment: 'production'
    });
    ```

=== "Browser"
    ```javascript
    const client = new VoucherClient({
      apiKey: 'sk_live_...',
      environment: 'production'
    });
    ```

### Create Your First Voucher

```javascript
const voucher = await client.vouchers.create({
  code: 'SUMMER2024',
  type: 'percentage',
  value: 20,
  conditions: {
    min_order_value: 5000,
    max_uses: 1000
  }
});

console.log('Voucher created:', voucher.id);
```

## Core Features

### Voucher Management

#### Create Voucher

```javascript
const voucher = await client.vouchers.create({
  code: 'SUMMER2024',
  type: 'percentage',
  value: 20,
  conditions: {
    min_order_value: 5000,
    max_uses: 1000,
    valid_from: '2024-06-01T00:00:00Z',
    valid_until: '2024-08-31T23:59:59Z'
  }
});
```

#### Validate Voucher

```javascript
const validation = await client.vouchers.validate({
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
});

if (validation.is_valid) {
  console.log(`Discount: ${validation.discount_amount} ${validation.currency}`);
}
```

#### Apply Voucher

```javascript
const application = await client.vouchers.apply({
  code: 'SUMMER2024',
  order_id: 'order_1234567890'
});

console.log(`Voucher applied! Final amount: ${application.final_amount}`);
```

#### List Vouchers

```javascript
const vouchers = await client.vouchers.list({
  limit: 10,
  status: 'active',
  type: 'percentage'
});

console.log(`Found ${vouchers.data.length} vouchers`);
```

### Batch Operations

Perform multiple operations efficiently:

```javascript
// Create multiple vouchers
const results = await client.vouchers.batchCreate([
  {
    code: 'SUMMER2024',
    type: 'percentage',
    value: 20
  },
  {
    code: 'WINTER2024',
    type: 'fixed',
    value: 1000
  }
]);

// Validate multiple vouchers
const validations = await client.vouchers.batchValidate([
  { code: 'SUMMER2024', order: { value: 10000 } },
  { code: 'WINTER2024', order: { value: 5000 } }
]);
```

### Analytics

Track voucher performance and usage:

```javascript
// Get performance metrics
const analytics = await client.analytics.getPerformance({
  start_date: '2024-01-01',
  end_date: '2024-03-20',
  voucher_ids: ['v_123', 'v_456']
});

// Get usage statistics
const usage = await client.analytics.getUsage({
  voucher_id: 'v_123',
  period: 'daily'
});
```

## Error Handling

### Try-Catch Pattern

```javascript
try {
  const voucher = await client.vouchers.create({
    code: 'SUMMER2024',
    type: 'percentage',
    value: 20
  });
} catch (error) {
  if (error.code === 'INVALID_REQUEST') {
    console.error('Validation error:', error.message);
  } else if (error.code === 'RATE_LIMIT_EXCEEDED') {
    console.error('Rate limit exceeded, retry later');
  } else {
    console.error('Unexpected error:', error.message);
  }
}
```

### Error Types

| Error Type | Description | HTTP Status |
|------------|-------------|-------------|
| `VoucherError` | API-related errors | 4xx, 5xx |
| `ValidationError` | Request validation failed | 400 |
| `AuthenticationError` | Invalid API key | 401 |
| `RateLimitError` | Too many requests | 429 |

### Retry Logic

```javascript
import { VoucherClient, RateLimitError } from '@voucher/api';

const client = new VoucherClient({
  apiKey: 'sk_live_...',
  maxRetries: 3,
  retryDelay: 1000
});

// Automatic retry for rate limits
const voucher = await client.vouchers.create({
  code: 'SUMMER2024',
  type: 'percentage',
  value: 20
});
```

## Webhooks

### Verify Webhook Signatures

```javascript
import { WebhookHandler } from '@voucher/api';

const handler = new WebhookHandler('whsec_...');

app.post('/webhooks/voucher', async (req, res) => {
  try {
    const event = handler.verify(
      req.body,
      req.headers['x-voucher-signature']
    );
    
    switch (event.type) {
      case 'voucher.created':
        console.log('New voucher created:', event.data.id);
        break;
      case 'voucher.applied':
        console.log('Voucher applied:', event.data.voucher_id);
        break;
      case 'voucher.expired':
        console.log('Voucher expired:', event.data.voucher_id);
        break;
    }
    
    res.status(200).send('Webhook received');
  } catch (error) {
    console.error('Webhook verification failed:', error.message);
    res.status(400).send('Invalid signature');
  }
});
```

### Webhook Event Types

| Event | Description | Data |
|-------|-------------|------|
| `voucher.created` | New voucher created | Voucher object |
| `voucher.updated` | Voucher modified | Voucher object |
| `voucher.applied` | Voucher applied to order | Application object |
| `voucher.expired` | Voucher reached expiration | Voucher object |

## Configuration Options

### Client Options

```javascript
const client = new VoucherClient({
  apiKey: 'sk_live_...',
  environment: 'production', // 'production' or 'sandbox'
  timeout: 30000, // Request timeout in milliseconds
  maxRetries: 3, // Maximum retry attempts
  retryDelay: 1000, // Delay between retries
  userAgent: 'MyApp/1.0' // Custom user agent
});
```

### Environment Variables

```javascript
const client = new VoucherClient({
  apiKey: process.env.VOUCHER_API_KEY,
  environment: process.env.NODE_ENV === 'production' ? 'production' : 'sandbox'
});
```

## Best Practices

### 🔒 **Security**

!!! warning "API Key Security"
    
    - Store API keys in environment variables
    - Never expose keys in client-side code
    - Use different keys for different environments
    - Rotate keys regularly

### 🚀 **Performance**

!!! success "Optimization Tips"
    
    - Use batch operations for multiple requests
    - Implement caching for frequently accessed data
    - Monitor rate limits and implement backoff
    - Use webhooks for real-time updates

### 🛠️ **Error Handling**

!!! tip "Robust Error Handling"
    
    - Handle all error types appropriately
    - Implement retry logic for transient failures
    - Log errors for debugging
    - Provide user-friendly error messages

## Examples

### E-commerce Integration

```javascript
// Create a voucher for a promotion
const voucher = await client.vouchers.create({
  code: 'BLACKFRIDAY2024',
  type: 'percentage',
  value: 25,
  conditions: {
    min_order_value: 10000,
    max_uses: 5000,
    valid_until: '2024-11-30T23:59:59Z'
  }
});

// Validate voucher during checkout
const validation = await client.vouchers.validate({
  code: 'BLACKFRIDAY2024',
  order: {
    value: cartTotal,
    currency: 'USD',
    items: cartItems
  }
});

// Apply voucher to order
if (validation.is_valid) {
  const application = await client.vouchers.apply({
    code: 'BLACKFRIDAY2024',
    order_id: orderId
  });
  
  // Update order with discount
  order.final_amount = application.final_amount;
  order.discount_amount = application.discount_amount;
}
```

### Analytics Dashboard

```javascript
// Get comprehensive analytics
const analytics = await client.analytics.getPerformance({
  start_date: '2024-01-01',
  end_date: '2024-12-31',
  group_by: 'voucher'
});

// Display metrics
analytics.data.forEach(voucher => {
  console.log(`${voucher.code}: ${voucher.total_discount} discount applied`);
});
```

## Next Steps

- [API Reference](../api-reference/vouchers/) - Complete endpoint documentation
- [Error Handling](../reference/errors/) - Handle API errors properly
- [Webhooks](../reference/webhooks/) - Real-time event notifications
- [Rate Limits](../reference/rate-limits/) - Understanding API limits
- [Testing Guide](testing/) - Test your integration

## Need Help?

!!! tip "SDK Support"
    
    - 📚 [API Documentation](https://docs.voucher.com) - Complete API reference
    - 💬 [Community Forum](https://community.voucher.com) - Get help from developers
    - 🐛 [GitHub Issues](https://github.com/voucher/api-js) - Report bugs
    - 📧 [Support Team](mailto:support@voucher.com) - Contact support 