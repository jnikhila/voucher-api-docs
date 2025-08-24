# Analytics API

The Analytics API provides comprehensive insights into voucher performance, usage patterns, and business impact. Track conversion rates, revenue impact, and customer behavior to optimize your voucher campaigns.

> **Overview**
> 
> The Analytics API delivers real-time and historical data about voucher performance, helping you understand the effectiveness of your discount campaigns. Monitor usage trends, track conversion rates, analyze customer segments, and measure revenue impact to make data-driven decisions about your voucher strategy.

## Analytics Features

### Performance Tracking
- **Usage Metrics**: Track total uses, conversion rates, and discount amounts
- **Revenue Impact**: Measure the financial impact of voucher campaigns
- **Customer Insights**: Analyze customer segments and behavior patterns
- **Trend Analysis**: Monitor performance over time with customizable intervals

### Data Export
- **Flexible Formats**: Export data in CSV, JSON, or Excel formats
- **Custom Time Ranges**: Analyze data for specific periods
- **Bulk Operations**: Export multiple vouchers simultaneously
- **Scheduled Reports**: Set up automated data exports

## Analytics Endpoints

### Get Voucher Performance

Retrieves comprehensive performance metrics for a specific voucher.

```http
GET /analytics/vouchers/{voucher_id}/performance
```

#### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `start_date` | string | ❌ | Start date for analysis (ISO 8601) |
| `end_date` | string | ❌ | End date for analysis (ISO 8601) |
| `include_details` | boolean | ❌ | Include detailed breakdown (default: false) |

#### Example Request

=== "cURL"
    ```bash
    curl -X GET "https://api.voucher.com/v1/analytics/vouchers/v_1234567890abcdef/performance?start_date=2024-03-01T00:00:00Z&end_date=2024-03-20T23:59:59Z" \
      -H "Authorization: Bearer sk_test_..."
    ```

=== "JavaScript"
    ```javascript
    const response = await fetch(
      'https://api.voucher.com/v1/analytics/vouchers/v_1234567890abcdef/performance?start_date=2024-03-01T00:00:00Z&end_date=2024-03-20T23:59:59Z',
      {
        headers: {
          'Authorization': 'Bearer sk_test_...'
        }
      }
    );
    
    const performance = await response.json();
    ```

=== "Python"
    ```python
    import requests

    response = requests.get(
        'https://api.voucher.com/v1/analytics/vouchers/v_1234567890abcdef/performance',
        headers={'Authorization': 'Bearer sk_test_...'},
        params={
            'start_date': '2024-03-01T00:00:00Z',
            'end_date': '2024-03-20T23:59:59Z'
        }
    )
    
    performance = response.json()
    ```

#### Response

```json
{
  "voucher_id": "v_1234567890abcdef",
  "code": "SUMMER2024",
  "performance": {
    "total_uses": 150,
    "total_discount": 150000,
    "conversion_rate": 0.75,
    "avg_order_value": 10000,
    "revenue_impact": 750000,
    "unique_customers": 120,
    "repeat_usage": 30
  },
  "time_period": {
    "start": "2024-03-01T00:00:00Z",
    "end": "2024-03-20T23:59:59Z"
  },
  "currency": "USD",
  "generated_at": "2024-03-20T10:00:00Z"
}
```



### Get Usage Trends

Retrieves time-series data showing voucher usage patterns over time.

```http
GET /analytics/vouchers/{voucher_id}/trends
```

#### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `interval` | string | ❌ | Time interval: `day`, `week`, `month` (default: `day`) |
| `start_date` | string | ❌ | Start date for analysis (ISO 8601) |
| `end_date` | string | ❌ | End date for analysis (ISO 8601) |
| `metrics` | array | ❌ | Specific metrics to include |

#### Example Request

=== "cURL"
    ```bash
    curl -X GET "https://api.voucher.com/v1/analytics/vouchers/v_1234567890abcdef/trends?interval=day&start_date=2024-03-01T00:00:00Z&end_date=2024-03-20T23:59:59Z" \
      -H "Authorization: Bearer sk_test_..."
    ```

=== "JavaScript"
    ```javascript
    const response = await fetch(
      'https://api.voucher.com/v1/analytics/vouchers/v_1234567890abcdef/trends?interval=day&start_date=2024-03-01T00:00:00Z&end_date=2024-03-20T23:59:59Z',
      {
        headers: {
          'Authorization': 'Bearer sk_test_...'
        }
      }
    );
    
    const trends = await response.json();
    ```

#### Response

```json
{
  "voucher_id": "v_1234567890abcdef",
  "code": "SUMMER2024",
  "interval": "day",
  "trends": [
    {
      "date": "2024-03-01",
      "uses": 10,
      "discount": 10000,
      "orders": 15,
      "conversion_rate": 0.67,
      "avg_order_value": 8500
    },
    {
      "date": "2024-03-02",
      "uses": 15,
      "discount": 15000,
      "orders": 20,
      "conversion_rate": 0.75,
      "avg_order_value": 9200
    }
  ],
  "summary": {
    "total_period_uses": 150,
    "total_period_discount": 150000,
    "avg_daily_uses": 7.5,
    "growth_rate": 0.15
  }
}
```

### Get Customer Insights

Analyzes customer behavior and segments for voucher usage.

```http
GET /analytics/vouchers/{voucher_id}/customers
```

#### Example Request

=== "cURL"
    ```bash
    curl -X GET https://api.voucher.com/v1/analytics/vouchers/v_1234567890abcdef/customers \
      -H "Authorization: Bearer sk_test_..."
    ```

=== "JavaScript"
    ```javascript
    const response = await fetch(
      'https://api.voucher.com/v1/analytics/vouchers/v_1234567890abcdef/customers',
      {
        headers: {
          'Authorization': 'Bearer sk_test_...'
        }
      }
    );
    
    const insights = await response.json();
    ```

#### Response

```json
{
  "voucher_id": "v_1234567890abcdef",
  "code": "SUMMER2024",
  "customer_insights": {
    "total_customers": 120,
    "new_customers": 80,
    "returning_customers": 40,
    "avg_customer_value": 12500,
    "customer_lifetime_value": 45000,
    "top_customer_segments": [
      {
        "segment": "premium",
        "count": 45,
        "avg_order_value": 15000,
        "conversion_rate": 0.85
      },
      {
        "segment": "standard",
        "count": 75,
        "avg_order_value": 8500,
        "conversion_rate": 0.65
      }
    ],
    "geographic_distribution": [
      {
        "region": "North America",
        "count": 85,
        "percentage": 70.8
      },
      {
        "region": "Europe",
        "count": 35,
        "percentage": 29.2
      }
    ]
  }
}
```

## Data Export

### Request Export

Creates a data export for specified vouchers and metrics.

```http
POST /analytics/export
```

#### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `voucher_ids` | array | ✅ | Array of voucher IDs to export |
| `metrics` | array | ✅ | Metrics to include in export |
| `format` | string | ❌ | Export format: `csv`, `json`, `xlsx` (default: `csv`) |
| `time_period` | object | ❌ | Time period for data export |

#### Example Request

=== "cURL"
    ```bash
    curl -X POST https://api.voucher.com/v1/analytics/export \
      -H "Authorization: Bearer sk_test_..." \
      -H "Content-Type: application/json" \
      -d '{
        "voucher_ids": ["v_1234567890abcdef"],
        "metrics": ["uses", "discount", "orders", "conversion_rate"],
        "format": "csv",
        "time_period": {
          "start": "2024-03-01T00:00:00Z",
          "end": "2024-03-20T23:59:59Z"
        }
      }'
    ```

=== "JavaScript"
    ```javascript
    const response = await fetch('https://api.voucher.com/v1/analytics/export', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer sk_test_...',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        voucher_ids: ['v_1234567890abcdef'],
        metrics: ['uses', 'discount', 'orders', 'conversion_rate'],
        format: 'csv',
        time_period: {
          start: '2024-03-01T00:00:00Z',
          end: '2024-03-20T23:59:59Z'
        }
      })
    });
    
    const exportRequest = await response.json();
    ```

#### Response

```json
{
  "export_id": "export_1234567890abcdef",
  "status": "processing",
  "estimated_completion": "2024-03-20T10:05:00Z",
  "format": "csv",
  "voucher_count": 1,
  "metrics": ["uses", "discount", "orders", "conversion_rate"]
}
```

### Get Export Status

Check the status of a data export request.

```http
GET /analytics/export/{export_id}
```

#### Example Request

=== "cURL"
    ```bash
    curl -X GET https://api.voucher.com/v1/analytics/export/export_1234567890abcdef \
      -H "Authorization: Bearer sk_test_..."
    ```

=== "JavaScript"
    ```javascript
    const response = await fetch(
      'https://api.voucher.com/v1/analytics/export/export_1234567890abcdef',
      {
        headers: {
          'Authorization': 'Bearer sk_test_...'
        }
      }
    );
    
    const exportStatus = await response.json();
    ```

#### Response

```json
{
  "export_id": "export_1234567890abcdef",
  "status": "completed",
  "download_url": "https://api.voucher.com/v1/analytics/export/export_1234567890abcdef/download",
  "expires_at": "2024-03-21T10:00:00Z",
  "file_size": "2.5MB",
  "record_count": 15000,
  "completed_at": "2024-03-20T10:03:45Z"
}
```



## Error Responses

### Invalid Time Period (400)

```json
{
  "error": {
    "code": "INVALID_TIME_PERIOD",
    "message": "Time period exceeds maximum allowed range",
    "details": {
      "max_days": 90,
      "requested_days": 120
    }
  }
}
```

### Export Failed (500)

```json
{
  "error": {
    "code": "EXPORT_FAILED",
    "message": "Failed to generate export",
    "details": {
      "reason": "Too many records requested",
      "max_records": 100000,
      "requested_records": 150000
    }
  }
}
```

### Voucher Not Found (404)

```json
{
  "error": {
    "code": "VOUCHER_NOT_FOUND",
    "message": "One or more vouchers not found",
    "details": {
      "not_found": ["v_invalid_id"],
      "found": ["v_1234567890abcdef"]
    }
  }
}
```

## Best Practices

### Data Collection
- Track all voucher interactions including views, attempts, and successful applications to get complete insights
- Set up real-time alerts for unusual patterns or performance drops to respond quickly to issues
- Analyze performance by customer segments, geographic regions, and time periods to identify optimization opportunities

### Performance Monitoring
- **Conversion Rate**: Percentage of voucher views that result in usage
- **Revenue Impact**: Net revenue change from voucher campaigns
- **Customer Acquisition**: New customers acquired through vouchers
- **Repeat Usage**: Customers who use vouchers multiple times

### Export Management
- Schedule exports during off-peak hours
- Use appropriate formats for your analysis tools
- Clean up old exports to manage storage
- Validate export data before analysis
- Exports are automatically deleted after 24 hours
- Download and store important reports locally

## Rate Limits

| Endpoint | Limit | Window | Description |
|----------|-------|--------|-------------|
| `/analytics/vouchers/*/performance` | 100 requests | 1 minute | Performance data requests |
| `/analytics/vouchers/*/trends` | 100 requests | 1 minute | Trend data requests |
| `/analytics/vouchers/*/customers` | 50 requests | 1 minute | Customer insights requests |
| `/analytics/export` | 10 requests | 1 minute | Export creation requests |



## Testing

Use test vouchers to explore analytics features without affecting production data.



## Next Steps

- [Vouchers API](../vouchers.md) - Complete voucher management endpoints
- [Validation API](validation.md) - Real-time voucher validation
- [Advanced Types](advanced-types.md) - Complex voucher scenarios
- [Error Reference](../../reference/errors.md) - Complete error code documentation
