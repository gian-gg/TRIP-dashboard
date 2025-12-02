# Getting Started with TRIP Dashboard

This guide will help you set up and run the TRIP Dashboard on your local machine.

## 📋 Prerequisites

- **Node.js**: Version 18.0 or higher ([Download](https://nodejs.org/))
- **npm**: Version 9.0 or higher (comes with Node.js)
- **Git**: For cloning the repository ([Download](https://git-scm.com/))

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/gian-gg/TRIP-dashboard.git
cd TRIP-dashboard
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including:

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Shadcn/ui components
- Recharts for data visualization
- And more...

### 3. Environment Configuration

Create a `.env` file in the root directory:

```bash
touch .env
```

Add the following environment variables:

```env
# API Configuration
VITE_API_URL=your_api_url_here
VITE_API_KEY=your_api_key_here
```

**Important**: Replace the placeholder values with your actual API credentials.

### 4. Backend Setup

This dashboard requires a backend API to function. For backend setup and configuration:

**Backend Repository**: [TRIP Backend API](https://github.com/Ehmann37/TRIP-dashboard-api)

Please refer to the backend repository for:

- Database setup and configuration
- API endpoint documentation
- Authentication setup
- Environment variables for the backend

### 5. Start Development Server

```bash
npm run dev
```

The application will start at `http://localhost:5173`

## 📂 Project Structure

```
TRIP-dashboard/
├── docs/                    # Documentation files
├── public/                  # Static assets (logo, images)
├── src/                     # Source code
│   ├── app/                 # Application pages
│   │   ├── landing/         # Public landing page
│   │   ├── login/           # Authentication page
│   │   └── dashboard/       # Protected dashboard routes
│   │       ├── operator/    # Operator dashboard
│   │       └── conductor/   # Conductor dashboard
│   ├── components/          # Reusable UI components
│   │   └── ui/              # Shadcn/ui base components
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions
│   │   ├── api.ts           # API client
│   │   ├── auth.ts          # Authentication utilities
│   │   └── utils.ts         # General utilities
│   ├── globals.css          # Global styles and theme
│   ├── main.tsx             # Application entry point
│   └── type.ts              # TypeScript type definitions
├── package.json             # Project dependencies
├── tsconfig.json            # TypeScript configuration
└── vite.config.ts           # Vite build configuration
```

## ✅ Setup Checklist

- [ ] Node.js and npm installed
- [ ] Repository cloned
- [ ] Dependencies installed (`npm install`)
- [ ] `.env` file created and configured
- [ ] Backend API set up and running
- [ ] Development server running (`npm run dev`)
- [ ] Landing page loads successfully

---

**Ready to start!** 🎉

_Last Updated: December 2, 2025_
