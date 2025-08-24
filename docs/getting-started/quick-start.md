# Create Your First Voucher

Get started with Voucher API in minutes. This guide walks through creating your first voucher and applying it to an order.

> **Overview**
> 
> The Voucher API enables you to create, validate, and apply discount vouchers to orders. This quick start guide will help you create your first voucher and understand the basic workflow. You'll learn the essential steps: creating a voucher, validating it against an order, and applying the discount to complete the transaction.

!!! info "Prerequisites"
    Before you begin, make sure you have:
    
    - ✅ Voucher API account
    - ✅ API key (get one from your dashboard)
    - ✅ Basic understanding of REST APIs

## Create Voucher

Create a simple percentage discount voucher that gives customers 10% off orders over $25.

=== "cURL"
    ```bash
    curl -X POST "https://api.voucher.com/v1/vouchers" \
      -H "Authorization: Bearer YOUR_API_KEY" \
      -H "Content-Type: application/json" \
      -d '{
        "code": "WELCOME10",
        "type": "percentage",
        "value": 10,
        "conditions": {
          "min_order_value": 2500
        }
      }'
    ```

=== "JavaScript"
    ```javascript
    const response = await fetch('https://api.voucher.com/v1/vouchers', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        code: 'WELCOME10',
        type: 'percentage',
        value: 10,
        conditions: {
          min_order_value: 2500
        }
      })
    });
    
    const voucher = await response.json();
    ```

=== "Python"
    ```python
    import requests

    response = requests.post(
        'https://api.voucher.com/v1/vouchers',
        headers={
            'Authorization': 'Bearer YOUR_API_KEY',
            'Content-Type': 'application/json'
        },
        json={
            'code': 'WELCOME10',
            'type': 'percentage',
            'value': 10,
            'conditions': {
                'min_order_value': 2500
            }
        }
    )
    
    voucher = response.json()
    ```

### Response

```json
{
  "id": "v_1234567890abcdef",
  "code": "WELCOME10",
  "type": "percentage",
  "value": 10,
  "conditions": {
    "min_order_value": 2500
  },
  "status": "active",
  "usage_count": 0,
  "created_at": "2024-03-20T10:00:00Z"
}
```

!!! success "Voucher Created Successfully"
    Your voucher is now active and ready to be used by customers. The `usage_count` starts at 0 and will increment with each successful application.

## Validate Voucher

Before applying a voucher to an order, always validate it to ensure it can be used and calculate the discount amount.

=== "cURL"
    ```bash
    curl -X POST "https://api.voucher.com/v1/vouchers/validate" \
      -H "Authorization: Bearer YOUR_API_KEY" \
      -H "Content-Type: application/json" \
      -d '{
        "code": "WELCOME10",
        "order": {
          "value": 10000,
          "currency": "USD"
        }
      }'
    ```

=== "JavaScript"
    ```javascript
    const validation = await fetch('https://api.voucher.com/v1/vouchers/validate', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        code: 'WELCOME10',
        order: {
          value: 10000,
          currency: 'USD'
        }
      })
    });
    
    const result = await validation.json();
    ```

=== "Python"
    ```python
    validation = requests.post(
        'https://api.voucher.com/v1/vouchers/validate',
        headers={
            'Authorization': 'Bearer YOUR_API_KEY',
            'Content-Type': 'application/json'
        },
        json={
            'code': 'WELCOME10',
            'order': {
                'value': 10000,
                'currency': 'USD'
            }
        }
    )
    
    result = validation.json()
    ```

### Response

```json
{
  "is_valid": true,
  "voucher": {
    "id": "v_1234567890abcdef",
    "code": "WELCOME10",
    "type": "percentage",
    "value": 10
  },
  "discount_amount": 1000,
  "final_amount": 9000,
  "currency": "USD",
  "validation_details": {
    "min_order_value_met": true,
    "usage_limit_not_exceeded": true
  }
}
```

!!! warning "Validation vs Application"
    Validation only checks if a voucher can be applied. It doesn't reserve or apply the voucher. Use the next step to actually apply the discount.

## Apply Voucher

Once validated, apply the voucher to create a permanent record of the discount application.

=== "cURL"
    ```bash
    curl -X POST "https://api.voucher.com/v1/vouchers/apply" \
      -H "Authorization: Bearer YOUR_API_KEY" \
      -H "Content-Type: application/json" \
      -d '{
        "code": "WELCOME10",
        "order_id": "order_1234567890"
      }'
    ```

=== "JavaScript"
    ```javascript
    const application = await fetch('https://api.voucher.com/v1/vouchers/apply', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        code: 'WELCOME10',
        order_id: 'order_1234567890'
      })
    });
    
    const result = await application.json();
    ```

=== "Python"
    ```python
    application = requests.post(
        'https://api.voucher.com/v1/vouchers/apply',
        headers={
            'Authorization': 'Bearer YOUR_API_KEY',
            'Content-Type': 'application/json'
        },
        json={
            'code': 'WELCOME10',
            'order_id': 'order_1234567890'
        }
    )
    
    result = application.json()
    ```

### Response

```json
{
  "id": "va_1234567890abcdef",
  "voucher": {
    "id": "v_1234567890abcdef",
    "code": "WELCOME10"
  },
  "order_id": "order_1234567890",
  "discount_amount": 1000,
  "final_amount": 9000,
  "currency": "USD",
  "applied_at": "2024-03-20T10:01:00Z"
}
```

!!! important "Idempotency"
    Applying the same voucher code to the same order multiple times will return the same result without creating duplicate applications.

## What's Next?

Now that you've created your first voucher, explore more advanced features:

### 🎯 **Core Features**
- [Complex Discount Types](guides/complex-discounts/) - BOGO, tiered pricing, and conditional logic
- [Analytics & Reporting](api-reference/analytics/) - Track performance and ROI
- [Webhook Integration](reference/webhooks/) - Real-time event notifications

### 🛠️ **Developer Tools**
- [Full API Reference]api-reference/vouchers/) - Complete endpoint documentation
- [SDK Libraries](sdks/javascript/) - Client libraries for your language
- [Error Handling](reference/errors/) - Comprehensive error reference

### 📚 **Guides & Examples**
- [Integration Patterns](guides/integration-patterns/) - Best practices for implementation
- [Testing Guide](sdks/testing/) - How to test your integration
- [Rate Limits](reference/rate-limits/) - Understanding API limits

## Need Help?

!!! tip "Getting Support"
    
    - 📚 Browse [full API reference](api-reference/vouchers/)
    - 💬 Join [community forum](https://community.voucher.com)
    - 📧 Contact [support](mailto:api-support@voucher.com)
    - 🐛 Report issues on [GitHub](https://github.com/voucher/api)

!!! success "Pro Tips"
    
    - Always validate vouchers before applying them
    - Use webhooks to track voucher events in real-time
    - Monitor usage analytics to optimize discount strategies
    - Test thoroughly in sandbox environment first
    - Implement proper error handling for all API calls