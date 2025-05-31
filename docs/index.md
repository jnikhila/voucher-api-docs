# Voucher API documentation

Welcome to the comprehensive API documentation for the Voucher API. This powerful RESTful API enables businesses to create, manage, and apply sophisticated promotional offers and discount strategies.

## Features

<div class="grid">

<div class="card">
<h3>Flexible discounts</h3>
<p>Build percentage discounts, fixed amounts, BOGO offers, tiered pricing, and complex conditional logic</p>
<a href="getting-started/quick-start" class="md-button md-button--primary">Get Started</a>
</div>

<div class="card">
<h3>Advanced analytics</h3>
<p>Track performance, conversion rates, revenue impact, and customer behavior with detailed metrics</p>
<a href="api-reference/analytics" class="md-button md-button--primary">Analytics Guide</a>
</div>

<div class="card">
<h3>Developer tools</h3>
<p>RESTful API with comprehensive SDKs, webhooks, and robust error handling</p>
<a href="api-reference/vouchers" class="md-button md-button--primary">API Reference</a>
</div>

<div class="card">
<h3>Global support</h3>
<p>Support for multiple currencies, geographic restrictions, and customer segments</p>
<a href="guides/integration-patterns" class="md-button md-button--primary">Integration Patterns</a>
</div>

</div>

## Quick start

Get started in minutes with a simple percentage discount:

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

## Supported voucher types

| Type | Description | Example Use Case |
|------|-------------|------------------|
| **Percentage** | Apply percentage discounts | 25% off summer collection |
| **Fixed Amount** | Apply fixed monetary discounts | $10 off orders over $50 |
| **BOGO** | Buy-one-get-one offers | Buy 2, get 1 free |
| **Tiered** | Volume-based pricing | Bulk discount tiers |
| **Conditional** | Rule-based with complex logic | Student discounts with verification |

## Enterprise features

- **Geographic targeting** - Country, region, and city-level restrictions
- **Customer segmentation** - Target specific customer groups
- **Usage analytics** - Comprehensive performance tracking
- **Webhook integration** - Real-time event notifications
- **Rate limiting** - Enterprise-grade API protection
- **Multi-currency support** - Global commerce ready

## API information

- **Base URL:** `https://api.voucher.com/v1`
- **Authentication:** Bearer Token
- **Rate Limits:** 1000 requests/hour
- **Response Format:** JSON
- **API Version:** v1.2.0

!!! tip "Need help?"
    
    - Check out our [Quick start guide](getting-started/quick-start)
    - Explore [Code examples](guides/first-voucher)
    - Join our [Community forum](https://community.voucher.com)
    - Contact [API support](mailto:api-support@voucher.com)

## Latest updates

### Version 1.2.0

- ✨ Added tiered discount support
- 📊 Enhanced analytics endpoints  
- 🔧 Improved error messaging
- 🪝 Added webhook support

[View full changelog](reference/changelog){ .md-button }

---

Ready to get started? Follow our [Quick start guide](getting-started/quick-start) or dive into the [API reference](api-reference/vouchers).