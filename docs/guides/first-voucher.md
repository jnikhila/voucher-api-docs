# Creating your first voucher

Learn how to create your first voucher using Voucher API.

## Prerequisites

- Voucher API account
- API key
- Basic understanding of REST APIs

## Create simple voucher

Create a basic percentage discount voucher:

=== "cURL"

    ```bash
    curl -X POST "https://api.voucher.com/v1/vouchers" \
      -H "Authorization: Bearer YOUR_API_KEY" \
      -H "Content-Type: application/json" \
      -d '{
        "code": "WELCOME10",
        "type": "percentage",
        "discount_config": {
          "percentage": 10.0
        },
        "conditions": {
          "min_order_value": 25.00
        }
      }'
    ```

=== "JavaScript"

    ```javascript
    import { VouchersAPI } from '@voucher/vouchers-sdk';

    const vouchers = new VouchersAPI({
      apiKey: 'your-api-key'
    });

    const newVoucher = await vouchers.create({
      code: 'WELCOME10',
      type: 'percentage',
      discount_config: {
        percentage: 10.0
      },
      conditions: {
        min_order_value: 25.00
      }
    });
    ```

=== "Node.js"

    ```javascript
    const { VouchersAPI } = require('@voucher/vouchers-sdk');

    const vouchers = new VouchersAPI({
      apiKey: 'your-api-key'
    });

    const newVoucher = await vouchers.create({
      code: 'WELCOME10',
      type: 'percentage',
      discount_config: {
        percentage: 10.0
      },
      conditions: {
        min_order_value: 25.00
      }
    });
    ```

## Validate Voucher

Test the voucher before using it:

=== "cURL"

    ```bash
    curl -X POST "https://api.voucher.com/v1/vouchers/validate" \
      -H "Authorization: Bearer YOUR_API_KEY" \
      -H "Content-Type: application/json" \
      -d '{
        "code": "WELCOME10",
        "order_value": 100.00
      }'
    ```

=== "JavaScript"

    ```javascript
    const validation = await vouchers.validate({
      code: 'WELCOME10',
      order: {
        value: 100.00,
        currency: 'USD'
      }
    });

    if (validation.is_valid) {
      console.log(`Discount amount: ${validation.discount_amount} ${validation.currency}`);
    }
    ```

=== "Node.js"

    ```javascript
    const validation = await vouchers.validate({
      code: 'WELCOME10',
      order: {
        value: 100.00,
        currency: 'USD'
      }
    });

    if (validation.is_valid) {
      console.log(`Discount amount: ${validation.discount_amount} ${validation.currency}`);
    }
    ```

## Apply Voucher

Apply the validated voucher to an order:

=== "cURL"

    ```bash
    curl -X POST "https://api.voucher.com/v1/vouchers/apply" \
      -H "Authorization: Bearer YOUR_API_KEY" \
      -H "Content-Type: application/json" \
      -d '{
        "code": "WELCOME10",
        "order_id": "order_123",
        "order_value": 100.00
      }'
    ```

=== "JavaScript"

    ```javascript
    const application = await vouchers.apply({
      code: 'WELCOME10',
      order_id: 'order_123'
    });

    console.log(`Voucher applied successfully! Discount: ${application.discount_amount} ${application.currency}`);
    ```

=== "Node.js"

    ```javascript
    const application = await vouchers.apply({
      code: 'WELCOME10',
      order_id: 'order_123'
    });

    console.log(`Voucher applied successfully! Discount: ${application.discount_amount} ${application.currency}`);
    ```

## Best Practices

1. **Validation**
   - Always validate vouchers before applying
   - Check all conditions
   - Verify customer eligibility

2. **Error Handling**
   - Handle validation errors
   - Implement retry logic
   - Log voucher operations

3. **Security**
   - Use secure API keys
   - Validate input data
   - Monitor usage

## Next Steps

- Review [complex discount types](complex-discounts.md)
- Check [integration patterns](integration-patterns.md)
- See [error handling](../reference/errors.md)

## Additional resources

- [API Reference](../api-reference/vouchers.md)
- [Webhook Documentation](../reference/webhooks.md) 