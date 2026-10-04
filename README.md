<<<<<<< HEAD
# Board Dashboard

A modern, responsive analytics dashboard and authentication system built with **React.js and Vite**, styled with **Tailwind CSS**, featuring interactive **Recharts** visualizations, **Axios** data fetching, and **Google OAuth** integration.

---

## Features

- **Pixel-Accurate UI**: Accurately reproduces both the Login screen and the Dashboard layout based on the design specification.
- **Responsive Design**: Flawless display across mobile (375px+), tablet, and desktop (up to 1920px+) with an adaptive mobile sidebar drawer.
- **Google Authentication**: Seamless Google OAuth integration utilizing `@react-oauth/google` with JWT token decoding, profile avatar display, and session persistence.
- **Protected Routes**: Secure client-side routing via React Router; unauthenticated access to `/dashboard` automatically redirects to `/login`.
- **Dashboard Statistics**: Four data-driven pastel metric cards (Total Revenues, Total Transactions, Total Likes, Total Users).
- **Activities Line Chart**: Working interactive dual-line chart (Guest & User trends) rendered dynamically with Recharts.
- **Top Products Donut Chart**: Dynamic percentage breakdown with colored slices and custom legend.
- **Today's Schedule**: Real-time schedule card with colored left accent borders.
- **Axios Data Layer**: Structured asynchronous API layer with loading states and error recovery.
- **Decorative Avatar Groups**: Reusable overlapping avatar components with hover tooltips.

---

## Tech Stack

- **Framework**: [React 18](https://react.dev/)
- **Bundler**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Routing**: [React Router DOM v6](https://reactrouter.com/)
- **Data Fetching**: [Axios](https://axios-http.com/)
- **Charts & Visualizations**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Authentication**: [@react-oauth/google](https://www.npmjs.com/package/@react-oauth/google) & [jwt-decode](https://www.npmjs.com/package/jwt-decode)

---

## Authentication Architecture

> **Important Note regarding NextAuth.js**:  
> The original assignment references NextAuth.js. Because this implementation uses **React + Vite** rather than Next.js, NextAuth.js is not used directly (NextAuth.js requires a Next.js server runtime). Google OAuth is implemented using a modern, Vite-compatible authentication architecture powered by `@react-oauth/google`.

### Flow Overview
1. **Google OAuth Button**: Initiates standard Google OAuth authentication flow.
2. **Token Extraction**: Decodes the returned credential using `jwt-decode` to extract the user's name, email, and Google profile avatar.
3. **Session Persistence**: Saves authentication state safely to `localStorage` through `AuthContext`.
4. **Route Guarding**: `ProtectedRoute` monitors authentication state and redirects unauthorized visitors to `/login`.
5. **Instant Review Mode**: For testing without configuring a live Google Cloud Console OAuth Client ID, a 1-click **Instant Demo Sign In** is provided on the login page.

---

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Sidebar.jsx           # Black floating sidebar & mobile drawer
│   │   ├── Navbar.jsx            # Search, notifications, and user avatar dropdown
│   │   └── DashboardLayout.jsx   # Layout container with mobile responsiveness
│   │
│   ├── dashboard/
│   │   ├── DashboardCard.jsx     # Reusable pastel statistics card
│   │   ├── StatsGrid.jsx         # 4-column responsive statistics grid
│   │   ├── ActivitiesChart.jsx   # Recharts LineChart (Guest vs User)
│   │   ├── ProductsChart.jsx     # Recharts Pie/Donut chart & legend
│   │   ├── ScheduleCard.jsx      # Schedule list with colored accent borders
│   │   └── AvatarGroup.jsx       # Decorative avatar groups
│   │
│   └── common/
│       ├── Loading.jsx           # Smooth loading skeleton/spinner
│       └── ProtectedRoute.jsx    # Route protection guard
│
├── pages/
│   ├── Login.jsx                 # Screen 1: Branded login page
│   └── Dashboard.jsx             # Screen 2: Analytics dashboard
│
├── context/
│   └── AuthContext.jsx           # Authentication provider & state
│
├── services/
│   └── api.js                    # Axios data fetching service
│
├── data/
│   └── dashboardData.js          # Static mock data sources
│
├── routes/
│   └── AppRoutes.jsx             # Application route declarations
│
├── App.jsx                       # Root app with GoogleOAuthProvider & AuthProvider
├── main.jsx                      # Vite entry point
└── index.css                     # Tailwind directives & custom styles
```

---

## Installation & Setup

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### 1. Clone & Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
*(Optional)* Add your Google OAuth Client ID to `.env`:
```env
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here.apps.googleusercontent.com
```
> Note: If you don't supply a client ID, you can still test using the built-in 1-Click Demo Login on the login screen.

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for Production
```bash
npm run build
```

---

## Deployment

### Deploy to Vercel
1. Push this repository to GitHub.
2. Go to [Vercel](https://vercel.com) and import the repository.
3. Framework Preset: **Vite**.
4. Set Environment Variables if applicable: `VITE_GOOGLE_CLIENT_ID`.
5. Click **Deploy**.

### Deploy to Netlify
1. Create a `_redirects` file in the `public/` folder with:
   ```
   /*    /index.html   200
   ```
2. Run `npm run build`.
3. Set publish directory to `dist`.
4. Deploy!

---

## License
MIT
=======
# Board-Dashboard
>>>>>>> 92b3d1db1eab33e39863a8aadda232c7b9ded607
