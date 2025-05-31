# Testing Reference

Learn how to test your Voucher API integration.

## Test Environment

### JavaScript

```javascript
import { VoucherClient } from '@voucher/api';

const client = new VoucherClient({
  apiKey: 'test_api_key',
  environment: 'sandbox'
});
```

### Python

```python
from voucher_api import VoucherClient

client = VoucherClient(
    api_key='test_api_key',
    environment='sandbox'
)
```

## Test Data

### Voucher Data

```json
{
  "code": "TEST2024",
  "type": "percentage",
  "value": 20,
  "conditions": {
    "min_order_value": 50.00,
    "max_uses": 1000
  }
}
```

### Order Data

```json
{
  "value": 100.00,
  "currency": "USD",
  "items": [
    {
      "id": "item_1",
      "price": 50.00,
      "quantity": 2
    }
  ]
}
```

## Test Cases

### Create Voucher

```javascript
// JavaScript
const voucher = await client.vouchers.create({
  code: 'TEST2024',
  type: 'percentage',
  value: 20
});

assert(voucher.code === 'TEST2024');
assert(voucher.type === 'percentage');
assert(voucher.value === 20);
```

```python
# Python
voucher = client.vouchers.create(
    code='TEST2024',
    type='percentage',
    value=20
)

assert voucher.code == 'TEST2024'
assert voucher.type == 'percentage'
assert voucher.value == 20
```

### Validate Voucher

```javascript
// JavaScript
const validation = await client.vouchers.validate({
  code: 'TEST2024',
  order: {
    value: 100.00,
    currency: 'USD'
  }
});

assert(validation.is_valid === true);
assert(validation.discount_amount === 20.00);
```

```python
# Python
validation = client.vouchers.validate(
    code='TEST2024',
    order={
        'value': 100.00,
        'currency': 'USD'
    }
)

assert validation.is_valid is True
assert validation.discount_amount == 20.00
```

## Mocking

### Mock API Responses

```javascript
// JavaScript
import { VoucherClient } from '@voucher/api';
import nock from 'nock';

const client = new VoucherClient({
  apiKey: 'test_api_key',
  environment: 'sandbox'
});

nock('https://api.voucher.com')
  .post('/v1/vouchers')
  .reply(200, {
    code: 'TEST2024',
    type: 'percentage',
    value: 20
  });

const voucher = await client.vouchers.create({
  code: 'TEST2024',
  type: 'percentage',
  value: 20
});
```

```python
# Python
from voucher_api import VoucherClient
from unittest.mock import patch

client = VoucherClient(
    api_key='test_api_key',
    environment='sandbox'
)

mock_response = {
    'code': 'TEST2024',
    'type': 'percentage',
    'value': 20
}

with patch('voucher_api.client.requests.post') as mock_post:
    mock_post.return_value.json.return_value = mock_response
    mock_post.return_value.status_code = 200
    
    voucher = client.vouchers.create(
        code='TEST2024',
        type='percentage',
        value=20
    )
```

### Mock Webhooks

```javascript
// JavaScript
import { WebhookHandler } from '@voucher/api';

const handler = new WebhookHandler('test_webhook_secret');
const payload = {
  type: 'voucher.created',
  data: {
    code: 'TEST2024',
    type: 'percentage',
    value: 20
  }
};

const signature = handler.sign(payload);
const event = handler.verify(payload, signature);

assert(event.type === 'voucher.created');
assert(event.data.code === 'TEST2024');
```

```python
# Python
from voucher_api import WebhookHandler

handler = WebhookHandler('test_webhook_secret')
payload = {
    'type': 'voucher.created',
    'data': {
        'code': 'TEST2024',
        'type': 'percentage',
        'value': 20
    }
}

signature = handler.sign(payload)
event = handler.verify(payload, signature)

assert event.type == 'voucher.created'
assert event.data.code == 'TEST2024'
```

## Best Practices

1. **Test Coverage**
   - Test all API endpoints
   - Test error cases
   - Test edge cases

2. **Data Management**
   - Use test data
   - Clean up after tests
   - Use unique test data

3. **Performance**
   - Mock external services
   - Use test environment
   - Monitor test duration

## Next Steps

- Review [API reference](../api-reference/vouchers.md)
- Check [webhook events](../reference/webhooks.md)
- See [rate limits](../reference/rate-limits.md)

## Additional Resources

- [API Reference](../api-reference/vouchers.md)
- [Webhook Documentation](../reference/webhooks.md)
- [Rate Limits](../reference/rate-limits.md) 