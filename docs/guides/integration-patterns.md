# Integration patterns

Learn best practices and common patterns for integrating Voucher API into your applications.

## Common integration scenarios

### E-commerce integration

```mermaid
graph TD
    A[Customer] -->|Adds items| B[Cart]
    B -->|Applies voucher| C[Voucher API]
    C -->|Validates| D[Order]
    D -->|Processes| E[Payment]
```

1. **Cart integration**
   - Validate vouchers during cart updates
   - Apply discounts in real-time
   - Handle multiple vouchers

2. **Checkout flow**
   - Validate final order
   - Apply confirmed discount
   - Record redemption

### Mobile app integration

```mermaid
graph LR
    A[App] -->|API Calls| B[Backend]
    B -->|Validates| C[Voucher API]
    C -->|Returns| B
    B -->|Updates| A
```

1. **API integration**
   - Use SDKs for native platforms
   - Handle offline scenarios
   - Implement retry logic

2. **User experience**
   - Show real-time validation
   - Display discount preview
   - Handle errors gracefully

## Implementation examples

=== "JavaScript"

    ```javascript
    import { VouchersAPI } from '@voucher/vouchers-sdk';

    const vouchers = new VouchersAPI({
      apiKey: 'your-api-key'
    });

    // Create a webhook handler
    const webhookHandler = vouchers.createWebhookHandler({
      secret: 'your-webhook-secret'
    });

    // Handle incoming webhook events
    app.post('/webhooks/voucher', async (req, res) => {
      try {
        const event = await webhookHandler.verify(req.body, req.headers['x-voucher-signature']);
        
        switch (event.type) {
          case 'voucher.created':
            console.log('New voucher created:', event.data);
            break;
          case 'voucher.applied':
            console.log('Voucher applied:', event.data);
            break;
        }
        
        res.status(200).send('Webhook processed');
      } catch (error) {
        console.error('Webhook error:', error);
        res.status(400).send('Invalid webhook');
      }
    });
    ```

=== "Node.js"

    ```javascript
    const { VouchersAPI } = require('@voucher/vouchers-sdk');
    const express = require('express');
    const app = express();

    const vouchers = new VouchersAPI({
      apiKey: 'your-api-key'
    });

    // Create a webhook handler
    const webhookHandler = vouchers.createWebhookHandler({
      secret: 'your-webhook-secret'
    });

    // Handle incoming webhook events
    app.post('/webhooks/voucher', async (req, res) => {
      try {
        const event = await webhookHandler.verify(req.body, req.headers['x-voucher-signature']);
        
        switch (event.type) {
          case 'voucher.created':
            console.log('New voucher created:', event.data);
            break;
          case 'voucher.applied':
            console.log('Voucher applied:', event.data);
            break;
        }
        
        res.status(200).send('Webhook processed');
      } catch (error) {
        console.error('Webhook error:', error);
        res.status(400).send('Invalid webhook');
      }
    });
    ```

## Best practices

1. **Error handling**
   - Implement proper error handling
   - Use retry mechanisms
   - Log validation failures

2. **Performance**
   - Cache validation results
   - Use batch operations
   - Implement rate limiting

3. **Security**
   - Validate server-side
   - Use secure API keys
   - Implement proper authentication

## Testing strategy

1. **Unit tests**
   - Test validation logic
   - Mock API responses
   - Verify error handling

2. **Integration tests**
   - Test end-to-end flows
   - Verify discount calculations
   - Check error scenarios

3. **Load testing**
   - Test under load
   - Verify rate limits
   - Check performance

## Next steps

- Review [complex discount types](complex-discounts.md)
- Check [analytics integration](../api-reference/analytics.md)
- See [error handling](../reference/errors.md)

## Additional resources

- [API reference](../api-reference/vouchers.md)
- [Webhook documentation](../reference/webhooks.md)
- [Rate limits](../reference/rate-limits.md) 