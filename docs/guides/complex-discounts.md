# Complex discount types

Learn how to create and manage advanced discount scenarios using Voucher API. This guide will walk you through implementing sophisticated discount strategies to enhance your promotional capabilities and drive customer engagement.

## Prerequisites

- Voucher API account
- API key
- Basic understanding of REST APIs
- Familiarity with [core concepts](/explanation/core-concepts)

## BOGO discounts

Buy-one-get-one (BOGO) offers allow customers to receive free or discounted items when purchasing specific products.

### BOGO configuration

BOGO (Buy One Get One) discounts are powerful promotional tools that encourage customers to purchase more items. They work by offering a free or discounted item when a customer purchases a specified quantity of eligible products.

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

**Key parameters:**

- `buy_quantity`: Number of items customer must purchase
- `get_quantity`: Number of items customer receives at a discount
- `get_discount`: Amount of discount applied to the free items
- `get_discount_type`: Type of discount (percentage or fixed)
- `applicable_items`: Array of product IDs eligible for this promotion

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

Tiered discounts provide different discount levels based on purchase quantity or value. This strategy rewards customers who spend more, encouraging larger order values while providing flexibility in your promotional structure.

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

**Key parameters:**

- `tiers`: Array of discount tiers
- `threshold`: Minimum order value to qualify for this tier
- `discount`: Amount of discount to apply
- `discount_type`: Type of discount (percentage or fixed)

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

Conditional discounts apply different rules based on specific conditions. These are the most flexible discount types, allowing you to target specific customer segments or behaviors with tailored promotions.

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

**Key parameters:**

- `conditions`: Array of condition objects
- `if`: Criteria that must be met (customer attributes, order properties)
- `then`: Discount to apply when conditions are met
- `discount_type`: Type of discount (percentage or fixed)

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

## Validating complex discounts

Before deploying your discount vouchers, it's essential to validate them to ensure they work as expected:

=== "JavaScript"

    ```javascript
    // Validate a BOGO voucher
    const validation = await vouchers.validate({
      code: 'BOGO50',
      order: {
        items: [
          { id: 'item_1', quantity: 2, price: 50.00 },
          { id: 'item_3', quantity: 1, price: 30.00 }
        ],
        value: 130.00,
        currency: 'USD'
      }
    });
    
    console.log(validation.valid); // true or false
    console.log(validation.discount); // discount amount
    ```

=== "Node.js"

    ```javascript
    // Validate a tiered voucher
    const validation = await vouchers.validate({
      code: 'TIERED20',
      order: {
        value: 250.00,
        currency: 'USD'
      }
    });
    
    console.log(validation.valid); // true or false
    console.log(validation.discount); // discount amount
    console.log(validation.applied_tier); // which tier was applied
    ```

## Next Steps

- Check [analytics integration](../api-reference/analytics.md)
- See [error handling](../reference/errors.md)

## See Also

- [Integration Patterns](../reference/integration-patterns.md)
- [Voucher Discount Best Practices](../explanation/voucher-discount-best-practices.md)
- [API Reference](../api-reference/vouchers.md)
- [Webhook Documentation](../reference/webhooks.md)
- [Rate Limits](../reference/rate-limits.md)