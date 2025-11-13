# API Documentation

## Base URL
```
http://localhost:3000
```

## Endpoints

### Get Sales by User
Retrieve sales analytics aggregated by user and time period (monthly).

**Endpoint:** `GET /api/v1/sales/by-user`

#### Query Parameters

| Parameter | Type | Required | Description                                                                                                                    | Example |
|-----------|------|----------|--------------------------------------------------------------------------------------------------------------------------------|---------|
| `start_date` | string | No | Filter sales from this date (inclusive). Format: YYYY-MM-DD                                                                    | `2024-01-01` |
| `end_date` | string | No | Filter sales until this date (inclusive). Format: YYYY-MM-DD                                                                   | `2024-12-31` |
| `user_id` | string | No | Filter by specific user ID(s). Comma-separated for multiple users                                                              | `1` or `1,2,3` |
| `role` | string | No | Filter by user role. Valid values: `Call Center Agent`, `Admin`, `Retail Agent`, `Agent`                                       | `Agent` |
| `sort_by` | string | No | Sort results by field. Valid values: `period`, `total_revenue`, `sales_count`, `average_revenue`, `user_id`. Default: `period` | `total_revenue` |
| `interval` | string | No | Aggregation interval. Valid values: `day`, `week`, `month`. Default: `month`                                                   | `week` |

#### Response Format

**Success (200 OK):**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "period": "2024-01-01T00:00:00.000Z",
      "user_id": 1,
      "user_name": "John Doe",
      "user_role": "Agent",
      "sales_count": 15,
      "total_revenue": 15000,
      "average_revenue": 1000
    },
    {
      "period": "2024-02-01T00:00:00.000Z",
      "user_id": 1,
      "user_name": "John Doe",
      "user_role": "Agent",
      "sales_count": 20,
      "total_revenue": 22000,
      "average_revenue": 1100
    }
  ]
}
```

#### Example Requests

Get all sales by user :
```bash
curl http://localhost:3000/api/v1/sales/by-user
```

Get sales for specific user in date range:
```bash
curl "http://localhost:3000/api/v1/sales/by-user?user_id=1&start_date=2021-01-01&end_date=2021-03-31"
```

Get sales for multiple users, sorted by revenue:
```bash
curl "http://localhost:3000/api/v1/sales/by-user?user_id=1,2,3&sort_by=total_revenue"
```

Filter by role:
```bash
curl "http://localhost:3000/api/v1/sales/by-user?role=Agent"
```

Get daily aggregated sales:
```bash
curl "http://localhost:3000/api/v1/sales/by-user?interval=day"
```

---

### Get Sales by Group
Retrieve sales analytics aggregated by group and time period (monthly).

**Endpoint:** `GET /api/v1/sales/by-group`

#### Query Parameters

| Parameter | Type | Required | Description | Example |
|-----------|------|----------|-------------|---------|
| `start_date` | string | No | Filter sales from this date (inclusive). Format: YYYY-MM-DD | `2024-01-01` |
| `end_date` | string | No | Filter sales until this date (inclusive). Format: YYYY-MM-DD | `2024-12-31` |
| `group_id` | string | No | Filter by specific group ID(s). Comma-separated for multiple groups | `1` or `1,2,3` |
| `role` | string | No | Filter by user role. Valid values: `Call Center Agent`, `Admin`, `Retail Agent`, `Agent`                                       | `Agent` |
| `sort_by` | string | No | Sort results by field. Valid values: `period`, `total_revenue`, `sales_count`, `average_revenue`, `group_id`. Default: `period` | `total_revenue` |
| `interval` | string | No | Aggregation interval. Valid values: `day`, `week`, `month`. Default: `month` | `week` |

#### Response Format

**Success (200 OK):**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "period": "2024-01-01T00:00:00.000Z",
      "group_id": 1,
      "group_name": "Sales Team A",
      "sales_count": 150,
      "total_revenue": 150000,
      "average_revenue": 1000
    },
    {
      "period": "2024-02-01T00:00:00.000Z",
      "group_id": 1,
      "group_name": "Sales Team A",
      "sales_count": 200,
      "total_revenue": 220000,
      "average_revenue": 1100
    }
  ]
}
```

#### Example Requests

Get all sales by group:
```bash
curl http://localhost:3000/api/v1/sales/by-group
```

Get sales for specific group in date range:
```bash
curl "http://localhost:3000/api/v1/sales/by-group?group_id=1&start_date=2021-01-01&end_date=2021-03-31"
```

Get sales for multiple groups, sorted by sales count:
```bash
curl "http://localhost:3000/api/v1/sales/by-group?group_id=1,2&sort_by=sales_count"
```

Filter by role within groups:
```bash
curl "http://localhost:3000/api/v1/sales/by-group?role=Retail%20Agent"
```

Get weekly aggregated sales:
```bash
curl "http://localhost:3000/api/v1/sales/by-group?interval=week"
```
## Notes

1. **Time Period Aggregation**: Data is aggregated by the specified `interval` (day, week, or month). Default is month. The `period` field represents the first day/moment of each interval.

2. **Sorting**: Results are sorted by the specified `sort_by` field in descending order, with `period` as a secondary sort.

3. **Multiple IDs**: When providing multiple user_id or group_id values, separate them with commas (no spaces).

4. **Date Filtering**: Dates are inclusive. If only `start_date` is provided, all sales from that date forward are included. If only `end_date` is provided, all sales up to that date are included.

5. **Role Filtering**: In the by-group endpoint, the `role` parameter filters users within groups by their role.

6. **Empty Results**: If no data matches the filters, an empty array is returned with `count: 0`.
