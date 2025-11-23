# The Ad Management System for Moderation

## Overview

This project is a web application for managing advertisement moderation. It provides a clean interface for moderators to review, approve, reject, and request changes on user-submitted ads. The system includes a modern UI, statistics dashboard, and detailed item view.

The project is built with:

* React 19
* TypeScript
* Vite
* MUI 7
* React Query
* Node.js and Express backend

---

## Features

### Moderator Panel

* Review new advertisements.
* Approve, reject, or request additional changes.
* View moderation history.

### Statistics Dashboard

* Visual overview of moderator performance.
* Daily activity statistics.
* Decision distribution and category reports.

### Advertisement Viewer

* Detailed item view.
* Image gallery.
* Seller information.
* Auto-updating moderation actions.

### Backend API

* Ads listing with pagination and filters.
* Ad details endpoint.
* Endpoints for approve, reject, and request-changes.
* Statistics endpoints.

---

## Project Structure

```
/
├── client/      Frontend (React + Vite)
└── server/      Backend (Node + Express)
```

---

## Getting Started

### 1. Install dependencies

Frontend:

```
cd client
npm install
```

Backend:

```
cd server
npm install
```

---

## Running the App

Start backend:

```
cd server
npm run dev
```

Start frontend:

```
cd client
npm run dev
```

The application runs at:

```
Frontend: http://localhost:5173
Backend:  http://localhost:3001
```

---

## Build for Production

Frontend:

```
npm run build
```

Backend:
Deploy as any standard Node server.

---

## Environment Variables

In `client/.env`:

```
VITE_API_URL=http://localhost:3001/api/v1
```

---

## Requirements

* Node.js 18 or newer
* npm 9 or newer
