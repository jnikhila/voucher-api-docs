# Testing Reference

Learn how to test Voucher API integrations.

## Test Environment

```javascript
// JavaScript
const client = new VoucherClient({
  apiKey: 'test_key',
  environment: 'sandbox'
});
```

```python
# Python
client = VoucherClient(
    api_key='test_key',
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
  "id": "order_test_123",
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

### Voucher Creation

```javascript
// JavaScript
test('create voucher', async () => {
  const voucher = await client.vouchers.create({
    code: 'TEST2024',
    type: 'percentage',
    value: 20
  });
  
  expect(voucher.code).toBe('TEST2024');
  expect(voucher.type).toBe('percentage');
  expect(voucher.value).toBe(20);
});
```

```python
# Python
def test_create_voucher():
    voucher = client.vouchers.create(
        code='TEST2024',
        type='percentage',
        value=20
    )
    
    assert voucher.code == 'TEST2024'
    assert voucher.type == 'percentage'
    assert voucher.value == 20
```

### Voucher Validation

```javascript
// JavaScript
test('validate voucher', async () => {
  const validation = await client.vouchers.validate({
    code: 'TEST2024',
    order: {
      value: 100.00,
      currency: 'USD'
    }
  });
  
  expect(validation.is_valid).toBe(true);
  expect(validation.discount_amount).toBe(20.00);
});
```

```python
# Python
def test_validate_voucher():
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
import { mockVoucherApi } from '@voucher/api/testing';

beforeEach(() => {
  mockVoucherApi(client);
});
```

```python
# Python
from voucher.testing import mock_voucher_api

@pytest.fixture
def client():
    client = VoucherClient(api_key='test_key')
    mock_voucher_api(client)
    return client
```

### Mock Webhooks

```javascript
// JavaScript
import { mockWebhook } from '@voucher/api/testing';

test('handle webhook', async () => {
  const event = await mockWebhook('voucher.created', {
    id: 'v_123',
    code: 'TEST2024'
  });
  
  expect(event.type).toBe('voucher.created');
  expect(event.data.code).toBe('TEST2024');
});
```

```python
# Python
from voucher.testing import mock_webhook

def test_handle_webhook():
    event = mock_webhook('voucher.created', {
        'id': 'v_123',
        'code': 'TEST2024'
    })
    
    assert event.type == 'voucher.created'
    assert event.data['code'] == 'TEST2024'
```

## Best Practices

1. **Test Coverage**
   - Test all endpoints
   - Cover error cases
   - Test edge cases

2. **Test Data**
   - Use realistic data
   - Clean up test data
   - Isolate test cases

3. **Performance**
   - Mock external calls
   - Use test environment
   - Monitor test times

## Next Steps

- Review [error handling](../reference/errors.md)
- Check [rate limits](../reference/rate-limits.md)
- See [webhook events](../reference/webhooks.md)

## Additional Resources

- [API Reference](../../api-reference/vouchers.md)
- [Webhook Documentation](../../reference/webhooks.md)
- [Rate Limits](../../reference/rate-limits.md) 