# TRIP Dashboard - Architecture & Technology

This document provides an overview of the system architecture, technology stack, and key design patterns used in the TRIP Dashboard.

## 🏗️ System Architecture

### High-Level Architecture

```
┌────────────────────────────────────┐
│    React SPA (TRIP Dashboard)      │
│  - Vite Build Tool                 │
│  - React Router (Client-side)      │
│  - Axios HTTP Client               │
└────────────────┬───────────────────┘
                 │
┌────────────────▼───────────────────┐
│         API Layer (PHP)             │
│  - Dashboard API (Operator/Conductor) │
│  - Bus API (Passenger features)     │
└────────────────┬───────────────────┘
                 │
┌────────────────▼───────────────────┐
│       Database (MySQL)              │
│  - User Authentication              │
│  - Trip Data                        │
│  - Fleet Information                │
└─────────────────────────────────────┘
```

### Application Structure

**Single Page Application (SPA)** with component-based architecture:

```
Main App (main.tsx)
├── React Router
│   ├── Public Routes (Landing, Login)
│   ├── Operator Dashboard (Overview, Financial, Operations, Routes)
│   └── Conductor Dashboard (Upload)
├── State Management (React hooks + LocalStorage)
├── API Communication (Axios + Token Auth)
└── UI Components (Shadcn/ui + Recharts)
```

## 💻 Technology Stack

### Core Technologies

| Technology       | Version | Purpose           |
| ---------------- | ------- | ----------------- |
| **React**        | 19.1.0  | UI Framework      |
| **TypeScript**   | 5.8.3   | Type Safety       |
| **Vite**         | 6.3.5   | Build Tool        |
| **React Router** | 7.6.2   | Client Routing    |
| **Tailwind CSS** | 4.1.10  | Utility-first CSS |
| **Axios**        | 1.10.0  | HTTP Client       |

### UI & Components

| Technology        | Version  | Purpose               |
| ----------------- | -------- | --------------------- |
| **Shadcn/ui**     | Latest   | Component Library     |
| **Radix UI**      | Various  | Accessible Components |
| **Lucide React**  | 0.525.0  | Icon Library          |
| **Recharts**      | 2.15.4   | Data Visualization    |
| **Framer Motion** | 12.23.24 | Animations            |

### Forms & Utilities

| Technology          | Version | Purpose           |
| ------------------- | ------- | ----------------- |
| **React Hook Form** | 7.60.0  | Form Management   |
| **Zod**             | 4.0.5   | Schema Validation |
| **date-fns**        | 4.1.0   | Date Formatting   |

## 📁 Directory Structure

```
src/
├── app/                       # Application pages
│   ├── landing/               # Public landing page
│   │   ├── page.tsx
│   │   └── components/        # Landing components
│   ├── login/                 # Authentication
│   │   ├── page.tsx
│   │   └── components/SignIn.tsx
│   ├── dashboard/             # Protected dashboards
│   │   ├── components/Sidebar.tsx
│   │   ├── operator/          # Operator dashboard
│   │   │   ├── page.tsx
│   │   │   └── pages/
│   │   │       ├── Overview/
│   │   │       ├── Financial/
│   │   │       ├── Operations/
│   │   │       └── BusRoutes/
│   │   └── conductor/         # Conductor dashboard
│   │       ├── page.tsx
│   │       └── pages/Upload.tsx
│   └── NotFound.tsx
│
├── components/                # Reusable components
│   ├── Cards.tsx
│   ├── FilterDate.tsx
│   ├── Loading.tsx
│   └── ui/                    # Shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── table.tsx
│       └── ... (more UI components)
│
├── hooks/                     # Custom React hooks
│   ├── use-authorized.ts      # Auth check hook
│   └── use-mobile.ts          # Mobile detection
│
├── lib/                       # Utility functions
│   ├── api.ts                 # API client
│   ├── auth.ts                # Authentication
│   └── utils.ts               # General utilities
│
├── globals.css                # Global styles & theme
├── main.tsx                   # Application entry
└── type.ts                    # TypeScript types
```

## 🔄 Data Flow

### API Communication

```
Component → APICall() → Axios HTTP Request → Backend API
                ↓
           Response → Success/Error Callback → Update State
```

**Centralized API Client** (`lib/api.ts`):

- Adds authentication token to headers
- Handles errors globally
- Provides success/error callbacks

### Authentication Flow

```
1. User submits login → signIn()
2. POST to /auth/index.php
3. Receive token & role
4. Store token in localStorage
5. Navigate to role-based dashboard
6. useAuthorized() hook validates token on each protected route
```

**Simple token-based authentication** - not JWT, just a token stored in localStorage.

### State Management

Component-level state using React hooks:

```
Page Component (e.g., Operations)
  ↓ useState for data
  ↓ useEffect for fetch
  ↓ Props passed down
Child Components
  ↓ Local UI state
  ↓ Callbacks to parent
Refresh data after mutations
```

## 🎨 Design Patterns

### Component Architecture

**Atomic Design Pattern:**

```
Atoms (ui/) → Base components (Button, Input, Badge)
Molecules (components/) → Simple combinations (FilterDate, Cards)
Organisms (app/*/components/) → Feature-specific (BusTable, LineGraph)
Pages (app/*/page.tsx) → Complete views with data fetching
```

### Common Patterns

**Modal Pattern:**

- Local state in parent component
- Open/close handlers
- Pass refreshData callback to reload after changes

**Utility Functions:**

- Organized by feature in `utils/` directories
- Each handles API call + success/error
- Separated by action (add, edit, delete, print)

## 🔐 Security

### Authentication

- **Token-based authentication** (stored in localStorage)
- Token sent in Authorization header
- `useAuthorized` hook validates on protected routes
- Role-based access (operator vs conductor)

### Data Protection

- **End-to-end encryption** for trip data (.enc files)
- HTTPS for all API communication
- Input validation with React Hook Form + Zod
- TypeScript for type safety

## ⚡ Performance

### Optimizations

- **Lazy loading**: Routes loaded on demand
- **Code splitting**: Smaller initial bundle
- **Vite build**: Fast builds with minification
- **Tailwind CSS**: Purges unused styles

### Build Process

```
TypeScript + JSX → Vite Bundler → Tailwind CSS → Minification → dist/
```

## 📦 Deployment

Static hosting recommended (Vercel, Netlify, etc.):

1. Build: `npm run build`
2. Upload `dist/` folder
3. Configure environment variables
4. Ensure backend API is accessible

---

_Last Updated: December 2, 2025_
