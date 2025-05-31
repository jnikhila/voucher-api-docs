# Authentication

Learn how to authenticate with Voucher API and manage API keys securely.

## API key management

Voucher API uses API keys for authentication. Each API key is associated with a specific account and has defined permissions.

### Creating API keys

1. Log in to [Voucher Dashboard](https://dashboard.voucher.com)
2. Navigate to Settings > API Keys
3. Click "Create New API Key"
4. Select required permissions
5. Copy and securely store your API key

!!! warning "API key security"
    Never share your API key or commit it to version control. Store it securely using environment variables or a secrets manager.

## Request authentication

Include your API key in all requests using the Authorization header:

```bash
curl -X GET "https://api.voucher.com/v1/vouchers" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

## API key permissions

| Permission | Description |
|------------|-------------|
| `vouchers:read` | View vouchers and their details |
| `vouchers:write` | Create and update vouchers |
| `vouchers:delete` | Delete vouchers |
| `analytics:read` | Access analytics data |
| `webhooks:manage` | Manage webhook configurations |

## Security best practices

1. **Key rotation**
   - Rotate API keys regularly
   - Use different keys for different environments
   - Revoke compromised keys immediately

2. **Environment management**
   - Use different API keys for development and production
   - Store keys in environment variables
   - Never hardcode keys in application code

3. **Error handling**
   - Handle authentication errors gracefully
   - Implement proper retry logic
   - Log authentication failures

## Implementation examples

=== "JavaScript"

    ```javascript
    import { VouchersAPI } from '@voucher/vouchers-sdk';

    const vouchers = new VouchersAPI({
      apiKey: 'your-api-key'
    });

    // Test the connection
    try {
      const response = await vouchers.ping();
      console.log('Connected successfully!');
    } catch (error) {
      console.error('Authentication failed:', error.message);
    }
    ```

=== "Node.js"

    ```javascript
    const { VouchersAPI } = require('@voucher/vouchers-sdk');

    const vouchers = new VouchersAPI({
      apiKey: 'your-api-key'
    });

    // Test the connection
    vouchers.ping()
      .then(response => {
        console.log('Connected successfully!');
      })
      .catch(error => {
        console.error('Authentication failed:', error.message);
      });
    ```

## Error responses

Authentication errors return HTTP 401 status code:

```json
{
  "error": {
    "code": "AUTH_INVALID_KEY",
    "message": "Invalid API key",
    "details": "The provided API key is invalid or has been revoked"
  }
}
```

## Next steps

- Review [Quick start guide](quick-start.md) to begin using the API
- See [Error codes](../reference/errors.md) for handling authentication errors
- Learn about [Rate limits](../reference/rate-limits.md) for API usage
