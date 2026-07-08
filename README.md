# CJID Events Admin Dashboard

A React + TypeScript + Tailwind CSS admin dashboard for managing CJID events and blog posts.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Admin Dashboard with tabs: Create Event, Upcoming Events, Past Events, Blog Posts |
| `/events/create` | Create New Event form |
| `/events/:id/edit` | Edit Event form |

Use `?tab=upcoming`, `?tab=past`, or `?tab=blog` on the dashboard to open a specific tab.

## Getting Started

```bash
npm install
npm run dev
```

## Tech Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- React Router
- Lucide React (icons)
