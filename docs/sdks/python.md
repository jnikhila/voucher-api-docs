# Python SDK Reference

Learn how to use Voucher API with Python.

## Installation

```bash
pip install voucher-api
```

## Configuration

```python
from voucher_api import VoucherClient

client = VoucherClient(
    api_key='your_api_key',
    environment='production'  # or 'sandbox'
)
```

## Core Features

### Create Voucher

```python
voucher = client.vouchers.create(
    code='SUMMER2024',
    type='percentage',
    value=20,
    conditions={
        'min_order_value': 50.00,
        'max_uses': 1000
    }
)
```

### Validate Voucher

```python
validation = client.vouchers.validate(
    code='SUMMER2024',
    order={
        'value': 100.00,
        'currency': 'USD'
    }
)
```

### Apply Voucher

```python
result = client.vouchers.apply(
    code='SUMMER2024',
    order_id='order_123'
)
```

## Advanced Features

### Batch Operations

```python
results = client.vouchers.batch_create([
    {
        'code': 'SUMMER2024',
        'type': 'percentage',
        'value': 20
    },
    {
        'code': 'WINTER2024',
        'type': 'fixed',
        'value': 10.00
    }
])
```

### Analytics

```python
analytics = client.analytics.get_performance(
    start_date='2024-01-01',
    end_date='2024-03-20'
)
```

## Error Handling

```python
try:
    voucher = client.vouchers.create(
        code='SUMMER2024',
        type='percentage',
        value=20
    )
except VoucherError as error:
    if error.code == 'INVALID_REQUEST':
        # Handle validation error
        pass
    elif error.code == 'RATE_LIMIT_EXCEEDED':
        # Handle rate limit error
        pass
```

## Webhooks

```python
from voucher_api import WebhookHandler
from flask import Flask, request

app = Flask(__name__)
handler = WebhookHandler('your_webhook_secret')

@app.route('/webhooks/voucher', methods=['POST'])
def handle_webhook():
    event = handler.verify(
        request.data,
        request.headers['X-Voucher-Signature']
    )
    
    if event.type == 'voucher.created':
        # Handle created event
        pass
    elif event.type == 'voucher.validated':
        # Handle validated event
        pass
    
    return 'Webhook received', 200
```

## Best Practices

1. **Error Handling**
   - Use try-except blocks
   - Handle specific error codes
   - Implement retry logic

2. **Performance**
   - Use batch operations
   - Cache responses
   - Monitor rate limits

3. **Security**
   - Store API keys securely
   - Verify webhook signatures
   - Use HTTPS endpoints

## Next Steps

- Review [error handling](../reference/errors.md)
- Check [rate limits](../reference/rate-limits.md)
- See [webhook events](../reference/webhooks.md)
- Learn about [complex discounts](../guides/complex-discounts.md)
- Explore [integration patterns](../reference/integration-patterns.md)

## Additional Resources

- [API Reference](../api-reference/vouchers.md)
- [Webhook Documentation](../reference/webhooks.md)
- [Rate Limits](../reference/rate-limits.md)

### Voucher Validation

```python
# Validate a voucher
validation = client.vouchers.validate(
    code='SUMMER2024',
    order_value=100.00,
    customer_id='customer_123',
    items=[
        {
            'id': 'item_1',
            'price': 50.00,
            'quantity': 2
        }
    ]
)

# Check validation result
if validation.is_valid:
    print('Discount amount:', validation.discount_amount)
else:
    print('Validation failed:', validation.error)
```

### Voucher Application

```python
# Apply a voucher
application = client.vouchers.apply(
    code='SUMMER2024',
    order_id='order_456',
    customer_id='customer_123',
    items=[
        {
            'id': 'item_1',
            'price': 50.00,
            'quantity': 2
        }
    ]
)

# Remove applied voucher
client.vouchers.remove(
    code='SUMMER2024',
    order_id='order_456'
)
```

### Analytics

```python
# Get voucher analytics
analytics = client.analytics.get_voucher_stats(
    voucher_id='SUMMER2024',
    start_date='2024-01-01',
    end_date='2024-12-31'
)

# Get redemption history
```