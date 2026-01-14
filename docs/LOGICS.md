# System Logic & Architecture
## Unheard Voices

---

## 1. High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                            CLIENT (React)                                │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────────────────┐│
│  │  Home   │ │  Write  │ │ Explore │ │ Details │ │    Admin Portal     ││
│  └────┬────┘ └────┬────┘ └────┬────┘ └────┬────┘ └──────────┬──────────┘│
│       │           │           │           │                  │           │
│       └───────────┴───────────┴───────────┴──────────────────┘           │
│                               │                                          │
│                    ┌──────────▼──────────┐                              │
│                    │   React Router      │                              │
│                    │   + Lazy Loading    │                              │
│                    └──────────┬──────────┘                              │
└───────────────────────────────┼─────────────────────────────────────────┘
                                │
                    ┌───────────▼───────────┐
                    │      Fetch API        │
                    │   (HTTP Requests)     │
                    └───────────┬───────────┘
                                │
┌───────────────────────────────▼─────────────────────────────────────────┐
│                          SERVER (Express.js)                             │
│  ┌─────────────────┐     ┌─────────────────┐     ┌───────────────────┐ │
│  │  Rate Limiter   │────▶│   Blog Routes   │────▶│   Admin Routes    │ │
│  └─────────────────┘     └────────┬────────┘     └─────────┬─────────┘ │
│                                   │                        │           │
│                          ┌────────▼────────────────────────▼────────┐  │
│                          │            Mongoose ODM                   │  │
│                          └──────────────────┬───────────────────────┘  │
└─────────────────────────────────────────────┼───────────────────────────┘
                                              │
                              ┌───────────────▼───────────────┐
                              │        MongoDB Atlas          │
                              │      (Cloud Database)         │
                              └───────────────────────────────┘
```

---

## 2. Component Hierarchy

```
App.jsx
├── HelmetProvider (SEO)
├── LazyMotion (Animations)
└── Router
    ├── Navbar
    ├── RouteChangeLoader
    ├── ErrorBoundary
    │   └── Routes
    │       ├── Home
    │       ├── Write ──────────▶ ConfirmationModal
    │       ├── Explore ────────▶ BlogCard (mapped)
    │       ├── BlogDetails ────▶ LazyImage, Recommendations
    │       ├── AdminPortal ────▶ Charts (Recharts)
    │       ├── About
    │       ├── HelpCenter
    │       ├── WritingTips
    │       ├── CommunityGuidelines
    │       ├── PrivacyPolicy
    │       ├── TermsOfService
    │       ├── CookiePolicy
    │       └── Copyright
    └── Footer
```

---

## 3. Blog Submission Flow

```
┌──────────────────────────────────────────────────────────────────────────┐
│                        BLOG SUBMISSION WORKFLOW                           │
└──────────────────────────────────────────────────────────────────────────┘

     ┌─────────┐
     │  User   │
     │  Types  │
     └────┬────┘
          │
          ▼
┌─────────────────────┐
│ TipTap Rich Editor  │◀────── Draft Auto-saves
│   (Write.jsx)       │        to localStorage
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│  Submit Button      │
│  Clicked            │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐     ┌─────────────────────┐
│ Confirmation Modal  │────▶│ User Confirms       │
│ "Are you sure?"     │     │ Submission          │
└─────────────────────┘     └─────────┬───────────┘
                                      │
                                      ▼
                            ┌─────────────────────┐
                            │  POST /api/blogs    │
                            └─────────┬───────────┘
                                      │
          ┌───────────────────────────┼───────────────────────────┐
          │                           │                           │
          ▼                           ▼                           ▼
┌─────────────────┐       ┌─────────────────────┐     ┌─────────────────┐
│ Rate Limiter    │       │  Bad Word Filter    │     │ Validation      │
│ Check (5/hour)  │       │  containsBadWords() │     │ (title/content) │
└────────┬────────┘       └──────────┬──────────┘     └────────┬────────┘
         │                           │                          │
         │         ┌─────────────────┴──────────────────────────┘
         │         │
         ▼         ▼
    ┌────────────────────┐
    │  All Checks Pass?  │
    └────────┬───────────┘
             │
    ┌────────┴────────┐
    │ YES             │ NO
    ▼                 ▼
┌──────────┐    ┌─────────────┐
│ Generate │    │ Return Error│
│ UUID Slug│    │ 400/403/429 │
└────┬─────┘    └─────────────┘
     │
     ▼
┌────────────────────┐
│ Save to MongoDB    │
│ status: 'approved' │
└────────┬───────────┘
         │
         ▼
┌────────────────────┐
│ Redirect to        │
│ /explore/:slug     │
└────────────────────┘
```

---

## 4. Admin Authentication Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    ADMIN AUTH SEQUENCE                           │
└─────────────────────────────────────────────────────────────────┘

Admin                  Frontend                    Backend
  │                        │                           │
  │──── Enter Token ──────▶│                           │
  │                        │                           │
  │                        │─── POST /admin/verify ───▶│
  │                        │    { accessToken }        │
  │                        │                           │
  │                        │                      ┌────┴────┐
  │                        │                      │ Compare │
  │                        │                      │ with    │
  │                        │                      │ ENV VAR │
  │                        │                      └────┬────┘
  │                        │                           │
  │                        │◀── 200 { success } ──────│
  │                        │    OR 401 { error }       │
  │                        │                           │
  │                   ┌────┴────┐                      │
  │                   │ Store   │                      │
  │                   │ Token   │                      │
  │                   │localStorage                    │
  │                   └────┬────┘                      │
  │                        │                           │
  │◀── Show Dashboard ────│                           │
  │                        │                           │
  │                        │─── GET /admin/blogs ─────▶│
  │                        │    Header: adminToken     │
  │                        │                           │
  │                        │◀── Blogs Array ──────────│
  │                        │                           │
```

---

## 5. Caching Strategy

```
┌─────────────────────────────────────────────────────────────────┐
│                    LOCAL STORAGE CACHE                           │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  recentBlogsCache                                                │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  Key: 'uv_recent_blogs'                                   │  │
│  │  Max Items: 20                                            │  │
│  │  Expiry: 24 hours                                         │  │
│  │                                                           │  │
│  │  Structure:                                               │  │
│  │  {                                                        │  │
│  │    blogs: [{ slug, title, timestamp }],                   │  │
│  │    timestamp: Date.now()                                  │  │
│  │  }                                                        │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
│  Methods:                                                        │
│  ├── get()    → Retrieve cached blogs (check expiry)            │
│  ├── add()    → Add blog to front (dedup, limit size)           │
│  ├── check()  → Check if slug exists in cache                   │
│  └── clear()  → Remove all cached data                          │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  draftCache                                                      │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  Key: 'uv_blog_draft'                                     │  │
│  │  Expiry: 7 days                                           │  │
│  │                                                           │  │
│  │  Structure:                                               │  │
│  │  {                                                        │  │
│  │    content: { title, tags, content },                     │  │
│  │    timestamp: Date.now()                                  │  │
│  │  }                                                        │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 6. Slug Generation Algorithm

```
┌─────────────────────────────────────────────────────────────────┐
│                    SLUG GENERATION                               │
└─────────────────────────────────────────────────────────────────┘

Input: "My Amazing Story! @#$%"

Step 1: Lowercase
        └──▶ "my amazing story! @#$%"

Step 2: Replace non-alphanumeric with hyphen
        └──▶ "my-amazing-story----"

Step 3: Remove leading/trailing hyphens
        └──▶ "my-amazing-story"

Step 4: Append UUID (first 6 chars)
        └──▶ "my-amazing-story-a1b2c3"

Output: "my-amazing-story-a1b2c3"

Code:
┌────────────────────────────────────────────────────────────────┐
│ const uniqueId = uuidv4().slice(0, 6);                         │
│ const slug = title.toLowerCase()                               │
│   .replace(/[^a-z0-9]+/g, '-')                                │
│   .replace(/(^-|-$)+/g, '') + '-' + uniqueId;                 │
└────────────────────────────────────────────────────────────────┘
```

---

## 7. Rate Limiting Strategy

```
┌─────────────────────────────────────────────────────────────────┐
│                    RATE LIMITING TIERS                           │
└─────────────────────────────────────────────────────────────────┘

                          Incoming Request
                                │
                                ▼
                    ┌───────────────────────┐
                    │   Check IP Address    │
                    └───────────┬───────────┘
                                │
        ┌───────────────────────┼───────────────────────┐
        │                       │                       │
        ▼                       ▼                       ▼
┌───────────────┐     ┌─────────────────┐     ┌─────────────────┐
│ API Limiter   │     │ Blog Submit     │     │ Flag Limiter    │
│ 100 req/15min │     │ 5 posts/hour    │     │ 10 flags/hour   │
└───────┬───────┘     └────────┬────────┘     └────────┬────────┘
        │                      │                       │
        │         ┌────────────┴───────────────────────┘
        │         │
        ▼         ▼
    ┌─────────────────┐
    │ Within Limit?   │
    └────────┬────────┘
             │
    ┌────────┴────────┐
    │YES              │NO
    ▼                 ▼
┌────────┐      ┌──────────────┐
│Continue│      │ 429 Too Many │
│Request │      │ Requests     │
└────────┘      └──────────────┘
```

---

## 8. Blog Visibility Logic

```
┌─────────────────────────────────────────────────────────────────┐
│                    BLOG VISIBILITY QUERY                         │
└─────────────────────────────────────────────────────────────────┘

MongoDB Query Logic:

{
  $or: [
    // Condition 1: Approved AND not flagged
    {
      $and: [
        { status: 'approved' },
        { $or: [
            { flagged: false },
            { flagged: { $exists: false } }
          ]
        }
      ]
    },
    // Condition 2: Recently created (last 24 hours)
    {
      createdAt: { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) }
    }
  ]
}

Decision Tree:

              ┌─────────────────┐
              │   Blog Entry    │
              └────────┬────────┘
                       │
              ┌────────▼────────┐
              │ status ==       │
              │ 'approved'?     │
              └────────┬────────┘
                       │
          ┌────────────┴────────────┐
          │YES                      │NO
          ▼                         ▼
  ┌───────────────┐        ┌───────────────┐
  │ flagged ==    │        │ Created in    │
  │ false?        │        │ last 24 hrs?  │
  └───────┬───────┘        └───────┬───────┘
          │                        │
     ┌────┴────┐              ┌────┴────┐
     │YES     │NO             │YES     │NO
     ▼        ▼               ▼        ▼
 ┌──────┐ ┌──────┐        ┌──────┐ ┌──────┐
 │VISIBLE│ │HIDDEN│        │VISIBLE│ │HIDDEN│
 └──────┘ └──────┘        └──────┘ └──────┘
```

---

## 9. Recommendation Algorithm

```
┌─────────────────────────────────────────────────────────────────┐
│                    RECOMMENDATION ENGINE                         │
└─────────────────────────────────────────────────────────────────┘

Input: Current blog slug "mental-health-story-abc123"

Step 1: Fetch current blog's tags
        └──▶ ['mental-health', 'anxiety', 'personal']

Step 2: Query for matching blogs
        ┌────────────────────────────────────────────┐
        │ db.blogs.find({                            │
        │   status: 'approved',                     │
        │   slug: { $ne: 'mental-health-story-abc'  │
        │         },                                 │
        │   tags: { $in: ['mental-health',          │
        │                 'anxiety', 'personal'] }  │
        │ })                                         │
        │ .sort({ createdAt: -1 })                  │
        │ .limit(4)                                  │
        └────────────────────────────────────────────┘

Step 3: Return recommendations
        └──▶ [blog1, blog2, blog3, blog4]

Matching Logic:
┌─────────────────────────────────────────────────────────────────┐
│  Current Blog Tags      │     Candidate Blog Tags               │
│  ──────────────────     │     ───────────────────               │
│  [A, B, C]              │     [B, D, E]  ──▶ Match: B ──▶ Include│
│                         │     [X, Y, Z]  ──▶ No Match ──▶ Exclude│
│                         │     [A, C, F]  ──▶ Match: A,C ──▶ Inc │
└─────────────────────────────────────────────────────────────────┘
```

---

## 10. State Management Pattern

```
┌─────────────────────────────────────────────────────────────────┐
│                    COMPONENT STATE FLOW                          │
└─────────────────────────────────────────────────────────────────┘

                    ┌─────────────────┐
                    │   App.jsx       │
                    │   (Router)      │
                    └────────┬────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
        ▼                    ▼                    ▼
┌───────────┐       ┌───────────────┐     ┌───────────────┐
│ Write.jsx │       │ Explore.jsx   │     │AdminPortal.jsx│
├───────────┤       ├───────────────┤     ├───────────────┤
│ State:    │       │ State:        │     │ State:        │
│ - title   │       │ - blogs[]     │     │ - isAuth      │
│ - tags    │       │ - loading     │     │ - blogs[]     │
│ - isDark  │       │ - error       │     │ - analytics   │
│ - editor  │       │ - page        │     │ - activeTab   │
└───────────┘       │ - hasMore     │     └───────────────┘
                    └───────────────┘
                             │
                    localStorage
                    ├── Draft cache
                    ├── Admin token
                    └── Highlight blog
```
