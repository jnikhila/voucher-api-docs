# Analytics Reference

Track and analyze voucher performance and usage patterns.

## Analytics Endpoints

### Get Voucher Performance

```http
GET /analytics/vouchers/{voucher_id}/performance
```

#### Response

```json
{
  "voucher_id": "voucher_123",
  "code": "WELCOME10",
  "performance": {
    "total_uses": 150,
    "total_discount": 1500.00,
    "conversion_rate": 0.75,
    "avg_order_value": 100.00,
    "revenue_impact": 7500.00
  },
  "time_period": {
    "start": "2024-03-01T00:00:00Z",
    "end": "2024-03-20T23:59:59Z"
  }
}
```

### Get Usage Trends

```http
GET /analytics/vouchers/{voucher_id}/trends
```

#### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `interval` | string | Time interval (day, week, month) |
| `start_date` | string | Start date (ISO format) |
| `end_date` | string | End date (ISO format) |

#### Response

```json
{
  "voucher_id": "voucher_123",
  "code": "WELCOME10",
  "trends": [
    {
      "date": "2024-03-01",
      "uses": 10,
      "discount": 100.00,
      "orders": 15
    },
    {
      "date": "2024-03-02",
      "uses": 15,
      "discount": 150.00,
      "orders": 20
    }
  ]
}
```

### Get Customer Insights

```http
GET /analytics/vouchers/{voucher_id}/customers
```

#### Response

```json
{
  "voucher_id": "voucher_123",
  "code": "WELCOME10",
  "customer_insights": {
    "total_customers": 120,
    "new_customers": 80,
    "returning_customers": 40,
    "avg_customer_value": 125.00,
    "top_customer_segments": [
      {
        "segment": "premium",
        "count": 45,
        "avg_order_value": 150.00
      }
    ]
  }
}
```

## Export Analytics

### Request Export

```http
POST /analytics/export
```

#### Request Body

```json
{
  "voucher_ids": ["voucher_123"],
  "metrics": ["uses", "discount", "orders"],
  "format": "csv",
  "time_period": {
    "start": "2024-03-01T00:00:00Z",
    "end": "2024-03-20T23:59:59Z"
  }
}
```

#### Response

```json
{
  "export_id": "export_123",
  "status": "processing",
  "estimated_completion": "2024-03-20T10:05:00Z"
}
```

### Get Export Status

```http
GET /analytics/export/{export_id}
```

#### Response

```json
{
  "export_id": "export_123",
  "status": "completed",
  "download_url": "https://api.voucher.com/v1/analytics/export/export_123/download",
  "expires_at": "2024-03-21T10:00:00Z"
}
```

## Error Responses

### Invalid Time Period

```json
{
  "error": {
    "code": "INVALID_TIME_PERIOD",
    "message": "Time period exceeds maximum allowed range",
    "details": {
      "max_days": 90
    }
  }
}
```

### Export Failed

```json
{
  "error": {
    "code": "EXPORT_FAILED",
    "message": "Failed to generate export",
    "details": {
      "reason": "Too many records"
    }
  }
}
```

## Best Practices

1. **Data Collection**
   - Track all voucher interactions
   - Monitor conversion rates
   - Analyze customer segments

2. **Performance Monitoring**
   - Set up alerts for anomalies
   - Track key metrics daily
   - Compare against benchmarks

3. **Export Management**
   - Schedule regular exports
   - Clean up old exports
   - Use appropriate formats

## Next Steps

- Review [voucher endpoints](vouchers.md)
- Check [validation reference](validation.md)
- See [error handling](../reference/errors.md)
