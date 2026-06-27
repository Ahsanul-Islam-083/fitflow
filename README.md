# FitFlow - Discover, Book & Train with the Best Fitness Classes

FitFlow is a modern fitness marketplace designed to connect members, trainers, and administrators through a polished web experience. Members can discover classes, book sessions, and engage with the community, while trainers manage classes, enrollments, and content.

---

## Overview

FitFlow solves the main problems fitness platforms face:

- Members struggle to discover relevant fitness classes and book them securely.
- Trainers need an easy way to create classes, manage students, and grow engagement.
- Administrators require tools for user moderation, approvals, and transaction oversight.

This product combines search, booking, authentication, and community features in one seamless experience.

---

## Live Links

- **Live Platform:** [FitFlow Live](https://fitflow-green.vercel.app)
- **Server Repository:** [GitHub - Server](https://github.com/Ahsanul-Islam-083/fitflow-server)

---

## What Makes FitFlow Different

- **Role-based experiences:** Separate dashboards for members, trainers, and admins.
- **Smooth auth flow:** Email/password login, Google OAuth, and redirect preservation.
- **Secure payments:** Stripe-powered booking flow with reliable checkout.
- **Community focus:** Forum posts, comments, and activity notifications.

---

## Core Features

### Member Features
- Browse classes by category, trainer, and schedule.
- Book classes securely using Stripe.
- Save favorites to a personal dashboard.
- Participate in forums with likes and comments.

### Trainer Features
- Create, edit, and publish class offerings.
- Track student enrollment and manage attendance.
- Share content and announcements in the community forum.
- View performance metrics for classes and students.

### Administrator Features
- Moderate platform users and content.
- Approve or reject trainer applications.
- Apply soft blocks for suspicious accounts.
- Monitor transactions and system-wide analytics.

---

## Authentication & Login Flow

- Client-side validation for email/password login.
- Google OAuth support for social login.
- Redirect destination preserved after successful login.
- Login page component: `src/app/(public)/(auth)/login/page.jsx`

---

## Tech Stack

| Technology       | Purpose                                |
| ---------------- | -------------------------------------- |
| Next.js 16       | App Router and modern React rendering  |
| React 19         | Component-based UI                     |
| Tailwind CSS v4  | Utility-first styling                  |
| Shadcn UI        | Accessible UI primitives               |
| Framer Motion    | Animations and transitions             |
| Recharts         | Dashboard charts and analytics         |
| BetterAuth       | Authentication and session management  |
| Stripe           | Payment checkout and booking           |
| MongoDB          | Data persistence                       |
| Lucide React     | Icon components                        |

---

## Architecture

- **App Router:** Uses server and client components for a scalable layout.
- **`proxy.js`:** Protects dashboard routes and enforces user roles.
- **Server Actions:** Securely handle form submissions and data mutations.
- **Backend API:** Keeps business logic separate from the frontend.

---

## Project Structure

```
src/
├── app/
│   ├── dashboard/
│   │   ├── admin/           # Admin dashboard pages
│   │   ├── trainer/         # Trainer dashboard pages
│   │   ├── user/            # User dashboard pages
│   │   └── favorites/       # Shared favorites page
│   ├── (public)/            # Public-facing pages and auth flows
│   │   └── (auth)/
│   │       ├── login/       # Login page with client validation and Google OAuth
│   │       └── register/    # User registration pages
│   ├── layout.js            # Root layout and theme provider
│   ├── not-found.jsx        # Custom 404 page
│   └── globals.css          # Global styles and Tailwind config
├── components/
│   ├── ui/                  # Reusable UI primitives
│   ├── shared/              # Shared components (Navbar, Footer, Logo, etc.)
│   ├── home/                # Home page sections
│   ├── classes/             # Class-related presentation components
│   ├── forums/              # Forum-related components
│   ├── dashboard/           # Dashboard-specific components
│   └── dashboardPage/
│       └── shared/          # Shared dashboard widgets and tables
├── lib/
│   ├── api/                 # Backend API client functions
│   ├── actions/             # Server actions for data mutations
│   ├── core/                # Core utilities and session helpers
│   ├── auth.js              # BetterAuth server configuration
│   ├── auth-client.js       # BetterAuth client configuration
│   ├── stripe.js            # Stripe SDK initialization
│   ├── getTokenServer.js    # JWT token retrieval helper
│   └── utils.js             # Tailwind utility helper
└── proxy.js                 # Next.js middleware for route protection
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas cluster
- Stripe account for payments
- BetterAuth-compatible backend server running at `http://localhost:8000`

### Setup

```bash
# Clone the repository
git clone <repo-url>
cd fitflow

# Install dependencies
npm install

# Create a .env.local file with the following variables
NEXT_PUBLIC_BASE_URL=http://localhost:8000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_auth_secret
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_IMAGE_UPLOAD_API=your_imgbb_api_key

# Start development server
npm run dev
```

Open the app at `http://localhost:3000` and visit `http://localhost:3000/login` to verify the auth flow.

---

## Available Scripts

| Command         | Description                        |
| --------------- | ---------------------------------- |
| `npm run dev`   | Start the development server       |
| `npm run build` | Build the app for production       |
| `npm start`     | Run the production server          |
| `npm run lint`  | Run ESLint checks                  |

---

## Notes

- Auth is handled through BetterAuth with support for both credentials and Google sign-in.
- Redirect targets are preserved after successful login.
- This README has been reorganized for clarity without modifying any application code.
