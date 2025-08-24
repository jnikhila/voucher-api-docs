# Advanced Types API

The Advanced Types API provides sophisticated discount configurations beyond basic percentage and fixed-amount vouchers. Create complex promotional scenarios with BOGO offers, tiered discounts, conditional rules, and stackable vouchers.

> **Overview**
> 
> Advanced voucher types enable complex promotional strategies that go beyond simple discounts. These configurations support sophisticated business requirements like buy-one-get-one offers, tiered pricing based on order value, conditional discounts for specific customer segments, and stackable vouchers that can be combined for maximum impact.

## Advanced Voucher Types

### BOGO (Buy One Get One) Discounts

BOGO discounts offer free or discounted items when customers purchase qualifying products.

#### Configuration

```json
{
  "type": "bogo",
  "config": {
    "buy_quantity": 1,
    "get_quantity": 1,
    "get_discount": 100,
    "get_discount_type": "percentage",
    "applicable_items": ["item_1", "item_2"],
    "excluded_items": ["item_3"],
    "min_order_value": 5000,
    "max_uses_per_order": 2
  }
}
```

#### Example Request

=== "cURL"
    ```bash
    curl -X POST https://api.voucher.com/v1/vouchers \
      -H "Authorization: Bearer sk_test_..." \
      -H "Content-Type: application/json" \
      -d '{
        "code": "BOGO50",
        "type": "bogo",
        "config": {
          "buy_quantity": 1,
          "get_quantity": 1,
          "get_discount": 50,
          "get_discount_type": "percentage",
          "applicable_items": ["item_1", "item_2"],
          "min_order_value": 5000
        },
        "conditions": {
          "max_uses": 1000,
          "valid_from": "2024-06-01T00:00:00Z",
          "valid_until": "2024-08-31T23:59:59Z"
        }
      }'
    ```

=== "JavaScript"
    ```javascript
    const response = await fetch('https://api.voucher.com/v1/vouchers', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer sk_test_...',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        code: 'BOGO50',
        type: 'bogo',
        config: {
          buy_quantity: 1,
          get_quantity: 1,
          get_discount: 50,
          get_discount_type: 'percentage',
          applicable_items: ['item_1', 'item_2'],
          min_order_value: 5000
        },
        conditions: {
          max_uses: 1000,
          valid_from: '2024-06-01T00:00:00Z',
          valid_until: '2024-08-31T23:59:59Z'
        }
      })
    });
    
    const voucher = await response.json();
    ```

#### Response

```json
{
  "id": "v_1234567890abcdef",
  "code": "BOGO50",
  "type": "bogo",
  "config": {
    "buy_quantity": 1,
    "get_quantity": 1,
    "get_discount": 50,
    "get_discount_type": "percentage",
    "applicable_items": ["item_1", "item_2"],
    "min_order_value": 5000
  },
  "status": "active",
  "usage_count": 0,
  "created_at": "2024-03-20T10:00:00Z"
}
```

!!! success "BOGO Configuration"
    BOGO vouchers automatically apply discounts to qualifying items based on the buy/get quantities and discount rules.

### Tiered Discounts

Tiered discounts apply different discount rates based on the total order value, encouraging larger purchases.

#### Configuration

```json
{
  "type": "tiered",
  "config": {
    "tiers": [
      {
        "min_value": 5000,
        "max_value": 9999,
        "discount": 10,
        "discount_type": "percentage"
      },
      {
        "min_value": 10000,
        "max_value": 19999,
        "discount": 15,
        "discount_type": "percentage"
      },
      {
        "min_value": 20000,
        "max_value": null,
        "discount": 20,
        "discount_type": "percentage"
      }
    ],
    "currency": "USD"
  }
}
```

#### Example Request

=== "cURL"
    ```bash
    curl -X POST https://api.voucher.com/v1/vouchers \
      -H "Authorization: Bearer sk_test_..." \
      -H "Content-Type: application/json" \
      -d '{
        "code": "TIERED10",
        "type": "tiered",
        "config": {
          "tiers": [
            {
              "min_value": 5000,
              "max_value": 9999,
              "discount": 10,
              "discount_type": "percentage"
            },
            {
              "min_value": 10000,
              "max_value": 19999,
              "discount": 15,
              "discount_type": "percentage"
            },
            {
              "min_value": 20000,
              "max_value": null,
              "discount": 20,
              "discount_type": "percentage"
            }
          ]
        },
        "conditions": {
          "max_uses": 500,
          "valid_from": "2024-06-01T00:00:00Z",
          "valid_until": "2024-08-31T23:59:59Z"
        }
      }'
    ```

=== "JavaScript"
    ```javascript
    const response = await fetch('https://api.voucher.com/v1/vouchers', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer sk_test_...',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        code: 'TIERED10',
        type: 'tiered',
        config: {
          tiers: [
            {
              min_value: 5000,
              max_value: 9999,
              discount: 10,
              discount_type: 'percentage'
            },
            {
              min_value: 10000,
              max_value: 19999,
              discount: 15,
              discount_type: 'percentage'
            },
            {
              min_value: 20000,
              max_value: null,
              discount: 20,
              discount_type: 'percentage'
            }
          ]
        },
        conditions: {
          max_uses: 500,
          valid_from: '2024-06-01T00:00:00Z',
          valid_until: '2024-08-31T23:59:59Z'
        }
      })
    });
    
    const voucher = await response.json();
    ```

!!! tip "Tiered Logic"
    The system automatically applies the highest applicable tier based on the order value. Tiers are evaluated in order, and the first matching tier is applied.

### Conditional Discounts

Conditional discounts apply based on specific customer or order conditions, allowing for highly targeted promotions.

#### Configuration

```json
{
  "type": "conditional",
  "config": {
    "conditions": [
      {
        "type": "customer_segment",
        "operator": "eq",
        "value": "premium"
      },
      {
        "type": "order_value",
        "operator": "gte",
        "value": 10000
      },
      {
        "type": "customer_registration_date",
        "operator": "gte",
        "value": "2024-01-01T00:00:00Z"
      }
    ],
    "discount": 15,
    "discount_type": "percentage",
    "all_conditions_required": true
  }
}
```

#### Example Request

=== "cURL"
    ```bash
    curl -X POST https://api.voucher.com/v1/vouchers \
      -H "Authorization: Bearer sk_test_..." \
      -H "Content-Type: application/json" \
      -d '{
        "code": "PREMIUM15",
        "type": "conditional",
        "config": {
          "conditions": [
            {
              "type": "customer_segment",
              "operator": "eq",
              "value": "premium"
            },
            {
              "type": "order_value",
              "operator": "gte",
              "value": 10000
            }
          ],
          "discount": 15,
          "discount_type": "percentage",
          "all_conditions_required": true
        },
        "conditions": {
          "max_uses": 200,
          "valid_from": "2024-06-01T00:00:00Z",
          "valid_until": "2024-08-31T23:59:59Z"
        }
      }'
    ```

=== "JavaScript"
    ```javascript
    const response = await fetch('https://api.voucher.com/v1/vouchers', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer sk_test_...',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        code: 'PREMIUM15',
        type: 'conditional',
        config: {
          conditions: [
            {
              type: 'customer_segment',
              operator: 'eq',
              value: 'premium'
            },
            {
              type: 'order_value',
              operator: 'gte',
              value: 10000
            }
          ],
          discount: 15,
          discount_type: 'percentage',
          all_conditions_required: true
        },
        conditions: {
          max_uses: 200,
          valid_from: '2024-06-01T00:00:00Z',
          valid_until: '2024-08-31T23:59:59Z'
        }
      })
    });
    
    const voucher = await response.json();
    ```

!!! warning "Condition Logic"
    When `all_conditions_required` is `true`, all conditions must be met. When `false`, any single condition being met will apply the discount.

### Stackable Discounts

Stackable discounts can be combined with other vouchers, allowing customers to use multiple promotions simultaneously.

#### Configuration

```json
{
  "type": "stackable",
  "config": {
    "base_discount": 10,
    "base_discount_type": "percentage",
    "stack_rules": {
      "max_stack_count": 2,
      "max_total_discount": 30,
      "stackable_with": ["percentage", "fixed"],
      "excluded_types": ["bogo"]
    },
    "priority": 1
  }
}
```

#### Example Request

=== "cURL"
    ```bash
    curl -X POST https://api.voucher.com/v1/vouchers \
      -H "Authorization: Bearer sk_test_..." \
      -H "Content-Type: application/json" \
      -d '{
        "code": "STACK10",
        "type": "stackable",
        "config": {
          "base_discount": 10,
          "base_discount_type": "percentage",
          "stack_rules": {
            "max_stack_count": 2,
            "max_total_discount": 30,
            "stackable_with": ["percentage", "fixed"],
            "excluded_types": ["bogo"]
          },
          "priority": 1
        },
        "conditions": {
          "max_uses": 1000,
          "valid_from": "2024-06-01T00:00:00Z",
          "valid_until": "2024-08-31T23:59:59Z"
        }
      }'
    ```

=== "JavaScript"
    ```javascript
    const response = await fetch('https://api.voucher.com/v1/vouchers', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer sk_test_...',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        code: 'STACK10',
        type: 'stackable',
        config: {
          base_discount: 10,
          base_discount_type: 'percentage',
          stack_rules: {
            max_stack_count: 2,
            max_total_discount: 30,
            stackable_with: ['percentage', 'fixed'],
            excluded_types: ['bogo']
          },
          priority: 1
        },
        conditions: {
          max_uses: 1000,
          valid_from: '2024-06-01T00:00:00Z',
          valid_until: '2024-08-31T23:59:59Z'
        }
      })
    });
    
    const voucher = await response.json();
    ```

!!! important "Stacking Rules"
    Stackable vouchers follow specific rules to prevent abuse and ensure fair application. The system automatically validates stacking compatibility and applies discounts in priority order.

## Validation for Advanced Types

Advanced voucher types require specialized validation to ensure proper application:

### BOGO Validation

```json
{
  "validation_details": {
    "bogo_eligible_items": 2,
    "bogo_applied_items": 1,
    "discount_applied": 2500,
    "remaining_eligibility": 1
  }
}
```

### Tiered Validation

```json
{
  "validation_details": {
    "order_value": 15000,
    "applicable_tier": {
      "min_value": 10000,
      "max_value": 19999,
      "discount": 15,
      "discount_type": "percentage"
    },
    "discount_amount": 2250
  }
}
```

### Conditional Validation

```json
{
  "validation_details": {
    "conditions_met": [
      "customer_segment",
      "order_value"
    ],
    "conditions_failed": [],
    "all_conditions_satisfied": true,
    "discount_applicable": true
  }
}
```

## Error Responses

### Invalid Configuration (400)

```json
{
  "error": {
    "code": "INVALID_CONFIGURATION",
    "message": "Invalid voucher configuration",
    "details": {
      "field": "tiers",
      "issue": "Overlapping tier ranges detected",
      "suggestion": "Ensure tier ranges do not overlap"
    }
  }
}
```

### Stacking Conflict (409)

```json
{
  "error": {
    "code": "STACKING_CONFLICT",
    "message": "Voucher cannot be stacked with existing vouchers",
    "details": {
      "conflicting_voucher": "v_1234567890abcdef",
      "conflict_reason": "Incompatible voucher types",
      "stackable_types": ["percentage", "fixed"]
    }
  }
}
```

### Condition Not Met (400)

```json
{
  "error": {
    "code": "CONDITION_NOT_MET",
    "message": "Voucher conditions not satisfied",
    "details": {
      "failed_conditions": [
        {
          "type": "customer_segment",
          "expected": "premium",
          "actual": "standard"
        }
      ],
      "required_conditions": 2,
      "met_conditions": 1
    }
  }
}
```

## Best Practices

### Configuration

!!! tip "Validation Testing"
    Always test advanced voucher configurations with various scenarios to ensure they work as expected.

!!! tip "Edge Cases"
    Consider edge cases like overlapping tiers, conflicting conditions, and stacking limits during configuration.

!!! tip "Performance Monitoring"
    Monitor the performance impact of complex voucher types, especially conditional and stackable vouchers.

### Implementation

!!! warning "Conflict Resolution"
    Implement clear rules for handling conflicts between different voucher types and stacking scenarios.

!!! warning "Usage Tracking"
    Track usage patterns for advanced vouchers to understand their effectiveness and prevent abuse.

!!! warning "Change Logging"
    Log all changes to advanced voucher configurations for audit purposes and troubleshooting.

### Testing

!!! success "Comprehensive Testing"
    - Test all possible combinations of conditions
    - Verify discount calculations for edge cases
    - Validate stacking behavior with multiple vouchers
    - Check performance with high-volume scenarios

!!! success "Integration Testing"
    - Test with real order data
    - Validate against existing voucher types
    - Ensure compatibility with validation endpoints
    - Verify analytics tracking for advanced types

## Rate Limits

| Endpoint | Limit | Window | Description |
|----------|-------|--------|-------------|
| `/vouchers` (POST) | 50 requests | 1 minute | Advanced voucher creation |
| `/vouchers/validate` | 200 requests | 1 minute | Advanced voucher validation |

!!! info "Advanced Type Limits"
    Advanced voucher types may have additional processing time and should be used judiciously in high-volume scenarios.

## Testing

Use test environments to thoroughly validate advanced voucher configurations before deploying to production.

!!! tip "Test Scenarios"
    Create comprehensive test scenarios covering all possible combinations and edge cases for advanced voucher types.

## Next Steps

- [Vouchers API](../vouchers.md) - Basic voucher management endpoints
- [Validation API](validation.md) - Real-time voucher validation
- [Analytics API](analytics.md) - Track advanced voucher performance
- [Error Reference](../../reference/errors.md) - Complete error code documentation

