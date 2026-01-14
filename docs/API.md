# API Documentation
## Unheard Voices Backend API

**Base URL**: `https://unheard-voices.onrender.com/api`

---

## Authentication

Admin routes require the `adminToken` header matching the `ADMIN_SECRET` environment variable.

```
Header: adminToken: <ADMIN_SECRET>
```

---

## Rate Limiting

| Limiter | Window | Max Requests | Applies To |
|---------|--------|--------------|------------|
| `apiLimiter` | 15 min | 100 | All routes |
| `blogSubmissionLimiter` | 1 hour | 5 | POST /blogs |
| `blogFlagLimiter` | 1 hour | 10 | POST /blogs/:id/flag |

---

## Blog Routes (`/api/blogs`)

### GET `/blogs`
Fetch all visible (non-flagged, approved) blogs.

**Response**: `200 OK`
```json
[
  {
    "_id": "string",
    "title": "string",
    "content": "string (HTML)",
    "tags": ["string"],
    "slug": "string",
    "createdAt": "ISO 8601",
    "reactions": {
      "related": 0,
      "thoughtful": 0,
      "touched": 0,
      "inspired": 0
    },
    "poll": { "yes": 0, "no": 0 }
  }
]
```

---

### POST `/blogs`
Create a new blog post.

**Request Body**:
```json
{
  "title": "string (required)",
  "content": "string (required)",
  "tags": ["string"]
}
```

**Response**: `201 Created`
```json
{
  "message": "Blog posted anonymously",
  "blog": { ... }
}
```

**Error Responses**:
- `400`: Missing title/content
- `403`: Bad words detected
- `429`: Rate limit exceeded

---

### GET `/blogs/:slug`
Fetch a single blog by slug.

**Response**: `200 OK` | `404 Not Found`

---

### POST `/blogs/:id/react`
Add a reaction to a blog.

**Request Body**:
```json
{
  "reaction": "related | thoughtful | touched | inspired"
}
```

**Response**: `200 OK` with updated blog

---

### POST `/blogs/:id/vote`
Submit a poll vote.

**Request Body**:
```json
{
  "vote": "yes | no"
}
```

**Response**: `200 OK`
```json
{
  "message": "Vote recorded",
  "poll": { "yes": 10, "no": 5 }
}
```

---

### GET `/blogs/recommend/:slug`
Get recommended blogs based on matching tags.

**Response**: `200 OK` - Array of 4 recommended blogs

---

### POST `/blogs/:id/flag`
Flag a blog for review.

**Response**: `200 OK` with updated flagged status

---

## Admin Routes (`/api/admin`)

### POST `/admin/verify`
Verify admin access token.

**Request Body**:
```json
{
  "accessToken": "string"
}
```

**Response**: `200 OK` | `401 Unauthorized`

---

### GET `/admin/analytics`
Fetch platform analytics.

**Headers**: `adminToken: <token>`

**Response**: `200 OK`
```json
{
  "totalBlogs": 50,
  "flaggedBlogs": 3,
  "blogsThisMonth": 12,
  "topTags": [{ "tag": "mental-health", "count": 15 }],
  "reactionStats": {
    "related": 100,
    "thoughtful": 80,
    "touched": 120,
    "inspired": 90
  },
  "dailyPosts": [{ "date": "2024-01-15", "posts": 5 }]
}
```

---

### GET `/admin/blogs`
Fetch all blogs (including flagged).

**Headers**: `adminToken: <token>`

---

### DELETE `/admin/blogs/:id`
Delete a blog permanently.

**Headers**: `adminToken: <token>`

**Response**: `200 OK` | `404 Not Found`

---

### PATCH `/admin/blogs/:id/flag`
Update blog flagged status.

**Request Body**:
```json
{
  "flagged": true | false
}
```

---

### PATCH `/admin/blogs/:id/status`
Update blog approval status.

**Request Body**:
```json
{
  "status": "pending | approved | rejected"
}
```

---

## Data Models

### Blog Schema

```javascript
{
  title: String,          // Required
  content: String,        // Required (HTML)
  slug: String,           // Unique, auto-generated
  tags: [String],
  authorId: String,       // Anonymous UUID
  status: String,         // pending | approved | rejected
  flagged: Boolean,
  createdAt: Date,
  views: Number,
  reactions: {
    related: Number,
    thoughtful: Number,
    touched: Number,
    inspired: Number
  },
  poll: {
    yes: Number,
    no: Number
  }
}
```

---

## Error Codes

| Code | Description |
|------|-------------|
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Invalid/missing admin token |
| 403 | Forbidden - Bad words detected |
| 404 | Not Found - Resource doesn't exist |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error |
