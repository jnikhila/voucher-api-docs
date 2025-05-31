# Advanced Types Reference

Learn about advanced voucher types and configurations.

## BOGO Discounts

Buy One Get One (BOGO) discounts offer free or discounted items.

```json
{
  "type": "bogo",
  "config": {
    "buy_quantity": 1,
    "get_quantity": 1,
    "get_discount": 100,
    "get_discount_type": "percentage",
    "applicable_items": ["item_1", "item_2"]
  }
}
```

## Tiered Discounts

Tiered discounts apply different discount rates based on purchase value.

```json
{
  "type": "tiered",
  "config": {
    "tiers": [
      {
        "min_value": 100.00,
        "discount": 10,
        "discount_type": "percentage"
      },
      {
        "min_value": 200.00,
        "discount": 20,
        "discount_type": "percentage"
      }
    ]
  }
}
```

## Conditional Discounts

Conditional discounts apply based on specific conditions.

```json
{
  "type": "conditional",
  "config": {
    "conditions": [
      {
        "type": "customer_segment",
        "value": "premium"
      },
      {
        "type": "order_value",
        "operator": "gte",
        "value": 100.00
      }
    ],
    "discount": 15,
    "discount_type": "percentage"
  }
}
```

## Stackable Discounts

Stackable discounts can be combined with other vouchers.

```json
{
  "type": "stackable",
  "config": {
    "base_discount": 10,
    "base_discount_type": "percentage",
    "stack_rules": {
      "max_stack_count": 2,
      "max_total_discount": 30
    }
  }
}
```

## Best Practices

1. **Configuration**
   - Validate discount rules
   - Test edge cases
   - Monitor performance

2. **Implementation**
   - Handle conflicts
   - Track usage
   - Log changes

3. **Testing**
   - Test combinations
   - Verify calculations
   - Check limits

## Next Steps

- Review [voucher endpoints](vouchers.md)
- Check [validation reference](validation.md)
- See [analytics endpoints](analytics.md)

