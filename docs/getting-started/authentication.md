# Authentication

Learn how to authenticate with the Voucher API using API keys and understand security best practices.

> **Overview**
> 
> The Voucher API uses API key-based authentication for all requests. Your API key identifies your account and determines which operations you can perform. This guide covers everything you need to know about API key management, security best practices, and proper authentication implementation for both development and production environments.

!!! info "API Keys"
    API keys are used to authenticate your requests and identify your account. Keep them secure and never expose them in client-side code.

## Getting Your API Key
Follow these steps to generate API key:

1. Create a Voucher API account at [dashboard.voucher.com](https://dashboard.voucher.com).
2. Navigate to the **API Keys** section in your dashboard:
3. Click the [Generate API Key](https://via.placeholder.com/800x400/6772e5/ffffff?text=Generate+New+API+Key)
4. Choose Environment: Select the appropriate environment for your API key:

    | Environment | Description | Use Case |
    |-------------|-------------|----------|
    | **Production** | Live API with real data | Production applications |
    | **Sandbox** | Test environment | Development and testing |

    !!! warning "Environment Separation"
        Production and sandbox environments are completely separate. Data and vouchers created in sandbox won't appear in production.

## Using API Keys
Follow these steps to use the API keys:

### Request Headers

Include your API key in the `Authorization` header of all requests:

=== "cURL"
    ```bash
    curl -X POST "https://api.voucher.com/v1/vouchers" \
      -H "Authorization: Bearer sk_live_..." \
      -H "Content-Type: application/json" \
      -d '{
        "code": "SUMMER2024",
        "type": "percentage",
        "value": 20
      }'
    ```

=== "JavaScript"
    ```javascript
    const response = await fetch('https://api.voucher.com/v1/vouchers', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer sk_live_...',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        code: 'SUMMER2024',
        type: 'percentage',
        value: 20
      })
    });
    ```

=== "Python"
    ```python
    import requests

    response = requests.post(
        'https://api.voucher.com/v1/vouchers',
        headers={
            'Authorization': 'Bearer sk_live_...',
            'Content-Type': 'application/json'
        },
        json={
            'code': 'SUMMER2024',
            'type': 'percentage',
            'value': 20
        }
    )
    ```

### API Key Format

API keys follow this format:

```
sk_live_1234567890abcdef  # Production key
sk_test_1234567890abcdef  # Sandbox key
```

!!! tip "Key Prefixes"
    - `sk_live_` - Production API keys
    - `sk_test_` - Sandbox API keys

## Security Best Practices

### 🔒 **Keep Keys Secure**

!!! warning "Never Expose API Keys"
    
    - ❌ Don't commit API keys to version control
    - ❌ Don't include keys in client-side code
    - ❌ Don't share keys in public repositories
    - ❌ Don't log keys in application logs

!!! success "Secure Storage"
    
    - ✅ Store keys in environment variables
    - ✅ Use secure key management services
    - ✅ Rotate keys regularly
    - ✅ Use different keys for different environments

### Environment Variables

Store your API keys securely using environment variables:

=== "Bash"
    ```bash
    export VOUCHER_API_KEY="sk_live_..."
    ```

=== "JavaScript"
    ```javascript
    const apiKey = process.env.VOUCHER_API_KEY;
    ```

=== "Python"
    ```python
    import os
    api_key = os.environ.get('VOUCHER_API_KEY')
    ```

### Key Rotation

Regularly rotate your API keys for enhanced security:

1. **Generate new key** in your dashboard
2. **Update your application** with the new key
3. **Test thoroughly** in sandbox environment
4. **Deploy to production** with new key
5. **Revoke old key** after successful deployment

!!! important "Zero Downtime Rotation"
    Generate and test new keys before revoking old ones to ensure zero downtime during rotation.

## Error Handling

### Authentication Errors

Handle authentication errors gracefully:

=== "JavaScript"
    ```javascript
    try {
      const response = await fetch('https://api.voucher.com/v1/vouchers', {
        headers: {
          'Authorization': 'Bearer sk_live_...'
        }
      });
      
      if (response.status === 401) {
        throw new Error('Invalid API key');
      }
      
      const data = await response.json();
    } catch (error) {
      console.error('Authentication failed:', error.message);
    }
    ```

=== "Python"
    ```python
    try:
        response = requests.post(
            'https://api.voucher.com/v1/vouchers',
            headers={'Authorization': 'Bearer sk_live_...'}
        )
        
        if response.status_code == 401:
            raise Exception('Invalid API key')
            
        data = response.json()
    except Exception as e:
        print(f'Authentication failed: {e}')
    ```

### Common Authentication Errors

| Error Code | Description | Solution |
|------------|-------------|----------|
| `401 Unauthorized` | Invalid or missing API key | Check API key format and validity |
| `403 Forbidden` | Insufficient permissions | Verify key has required permissions |
| `429 Too Many Requests` | Rate limit exceeded | Implement exponential backoff |

## Testing Authentication

### Verify Your API Key

Test your API key with a simple request:

=== "cURL"
    ```bash
    curl -X GET "https://api.voucher.com/v1/vouchers" \
      -H "Authorization: Bearer YOUR_API_KEY"
    ```

=== "JavaScript"
    ```javascript
    const response = await fetch('https://api.voucher.com/v1/vouchers', {
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY'
      }
    });
    
    if (response.ok) {
      console.log('API key is valid!');
    }
    ```

=== "Python"
    ```python
    response = requests.get(
        'https://api.voucher.com/v1/vouchers',
        headers={'Authorization': 'Bearer YOUR_API_KEY'}
    )
    
    if response.status_code == 200:
        print('API key is valid!')
    ```

## Next Steps

- [Core Concepts](core-concepts/) - Understand fundamental API concepts
- [Quick Start Guide](quick-start/) - Create your first voucher
- [API Reference](../api-reference/vouchers/) - Complete endpoint documentation
- [Error Handling](../reference/errors/) - Handle API errors properly

## Need Help?

!!! tip "Authentication Support"
    
    - 🔑 [API Key Management](https://dashboard.voucher.com/keys) - Manage your keys
    - 📚 [Security Documentation](https://docs.voucher.com/security) - Security best practices
    - 💬 [Community Forum](https://community.voucher.com) - Get help from other developers
    - 📧 [Support Team](mailto:security@voucher.com) - Contact security team
