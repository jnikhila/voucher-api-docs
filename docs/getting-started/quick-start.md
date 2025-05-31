# Quick Start Guide

Get started with Voucher API in minutes. This guide walks through creating your first voucher and applying it to an order.

## Prerequisites

- Voucher API account
- API key
- Basic understanding of REST APIs

## Create First Voucher

Create a simple percentage discount voucher:

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

## Validate Voucher

Validate a voucher before applying it:

```bash
curl -X POST "https://api.voucher.com/v1/vouchers/validate" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "code": "WELCOME10",
    "order_value": 100.00
  }'
```

## Apply Voucher

Apply the validated voucher to an order:

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

## Next Steps

Now that you've created your first voucher, explore more advanced features:

- [Complex Discount Types](../guides/complex-discounts.md) - BOGO, tiered pricing, and conditional logic
- [Analytics & Reporting](../api-reference/analytics.md) - Track performance and ROI
- [Webhook Integration](../reference/webhooks.md) - Real-time event notifications

## Need Help?

- 📚 Browse [full API reference](../api-reference/vouchers.md)
- 💬 Join [community forum](https://community.voucher.com)
- 📧 Contact [support](mailto:api-support@voucher.com)
- 🐛 Report issues on [GitHub](https://github.com/voucher/api)

!!! tip "Pro Tips"
    
    - Always validate vouchers before applying them
    - Use webhooks to track voucher events in real-time
    - Monitor usage analytics to optimize discount strategies
    - Test thoroughly in sandbox environment first