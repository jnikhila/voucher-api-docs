# Complex discount types

Learn how to create and manage advanced discount scenarios using Voucher API.

## BOGO discounts

Buy-one-get-one (BOGO) offers allow customers to receive free or discounted items when purchasing specific products.

### BOGO configuration

```json
{
  "type": "bogo",
  "discount_config": {
    "buy_quantity": 1,
    "get_quantity": 1,
    "get_discount": 100,
    "get_discount_type": "percentage",
    "applicable_items": ["product_1", "product_2"]
  }
}
```

### Implementation

=== "JavaScript"

    ```javascript
    import { VouchersAPI } from '@voucher/vouchers-sdk';

    const vouchers = new VouchersAPI({
      apiKey: 'your-api-key'
    });

    const bogoVoucher = await vouchers.create({
      code: 'BOGO50',
      type: 'bogo',
      config: {
        buy_quantity: 1,
        get_quantity: 1,
        get_discount: 50,
        get_discount_type: 'percentage',
        applicable_items: ['item_1', 'item_2']
      }
    });
    ```

=== "Node.js"

    ```javascript
    const { VouchersAPI } = require('@voucher/vouchers-sdk');

    const vouchers = new VouchersAPI({
      apiKey: 'your-api-key'
    });

    const bogoVoucher = await vouchers.create({
      code: 'BOGO50',
      type: 'bogo',
      config: {
        buy_quantity: 1,
        get_quantity: 1,
        get_discount: 50,
        get_discount_type: 'percentage',
        applicable_items: ['item_1', 'item_2']
      }
    });
    ```

## Tiered discounts

Tiered discounts provide different discount levels based on purchase quantity or value.

### Tiered configuration

```json
{
  "type": "tiered",
  "discount_config": {
    "tiers": [
      {
        "threshold": 100,
        "discount": 10,
        "discount_type": "percentage"
      },
      {
        "threshold": 200,
        "discount": 15,
        "discount_type": "percentage"
      },
      {
        "threshold": 500,
        "discount": 20,
        "discount_type": "percentage"
      }
    ]
  }
}
```

### Implementation

=== "JavaScript"

    ```javascript
    const tieredVoucher = await vouchers.create({
      code: 'TIERED20',
      type: 'tiered',
      config: {
        tiers: [
          {
            min_value: 100.00,
            discount: 10,
            discount_type: 'percentage'
          },
          {
            min_value: 200.00,
            discount: 20,
            discount_type: 'percentage'
          }
        ]
      }
    });
    ```

=== "Node.js"

    ```javascript
    const { VouchersAPI } = require('@voucher/vouchers-sdk');

    const vouchers = new VouchersAPI({
      apiKey: 'your-api-key'
    });

    const tieredVoucher = await vouchers.create({
      code: 'TIERED20',
      type: 'tiered',
      config: {
        tiers: [
          {
            min_value: 100.00,
            discount: 10,
            discount_type: 'percentage'
          },
          {
            min_value: 200.00,
            discount: 20,
            discount_type: 'percentage'
          }
        ]
      }
    });
    ```

## Conditional discounts

Conditional discounts apply different rules based on specific conditions.

### Conditional configuration

```json
{
  "type": "conditional",
  "discount_config": {
    "conditions": [
      {
        "if": {
          "customer_type": "student",
          "min_order_value": 50
        },
        "then": {
          "discount": 20,
          "discount_type": "percentage"
        }
      },
      {
        "if": {
          "customer_type": "regular",
          "min_order_value": 100
        },
        "then": {
          "discount": 10,
          "discount_type": "percentage"
        }
      }
    ]
  }
}
```

### Implementation

=== "JavaScript"

    ```javascript
    const conditionalVoucher = await vouchers.create({
      code: 'PREMIUM15',
      type: 'conditional',
      config: {
        conditions: [
          {
            type: 'customer_segment',
            value: 'premium'
          },
          {
            type: 'order_value',
            operator: 'gte',
            value: 100.00
          }
        ],
        discount: 15,
        discount_type: 'percentage'
      }
    });
    ```

=== "Node.js"

    ```javascript
    const { VouchersAPI } = require('@voucher/vouchers-sdk');

    const vouchers = new VouchersAPI({
      apiKey: 'your-api-key'
    });

    const conditionalVoucher = await vouchers.create({
      code: 'PREMIUM15',
      type: 'conditional',
      config: {
        conditions: [
          {
            type: 'customer_segment',
            value: 'premium'
          },
          {
            type: 'order_value',
            operator: 'gte',
            value: 100.00
          }
        ],
        discount: 15,
        discount_type: 'percentage'
      }
    });
    ```

## Best practices

1. **Validation**
   - Test all discount scenarios
   - Verify edge cases
   - Check customer eligibility

2. **Performance**
   - Cache validation results
   - Use batch operations
   - Monitor response times

3. **Error Handling**
   - Handle validation errors
   - Implement retry logic
   - Log discount calculations

## Next steps

- Review [integration patterns](integration-patterns.md)
- Check [analytics integration](../api-reference/analytics.md)
- See [error handling](../reference/errors.md)

## Additional resources

- [API Reference](../api-reference/vouchers.md)
- [Webhook Documentation](../reference/webhooks.md)
- [Rate Limits](../reference/rate-limits.md) 