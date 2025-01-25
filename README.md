# Real-time Analytics Dashboard with Support Chat

## Overview

This project is a real-time analytics dashboard with an integrated support chat feature. It's built using Next.js 14, TypeScript, and Tailwind CSS, showcasing real-time data visualization, user activity tracking, and a responsive chat interface.

## Features

- Real-time analytics dashboard
- Interactive charts and metrics
- Live user counter and activity feed
- Dark/Light mode toggle
- Authenticated user access
- Support chat with proactive messaging
- Responsive design for mobile and desktop

## Prerequisites

- Node.js (v14 or later)
- npm or yarn

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/Real-time-Analytics-Dashboard-with-Support-Chat.git
   cd analytics-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following:
   ```
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

- `/src/app`: Next.js 14 app directory
- `/src/components`: React components
- `/src/lib`: Utility functions and mock socket
- `/public`: Static assets

## Key Components

- Dashboard (`/src/app/dashboard/page.tsx`)
- Support Chat (`/src/app/support/page.tsx`)
- ChatInterface (`/src/components/ChatInterface.tsx`)
- ActivityFeed (`/src/components/ActivityFeed.tsx`)
- UserSimulator (`/src/components/UserSimulator.tsx`)

## Authentication

This project uses NextAuth.js for authentication. The sign-in page is located at `/src/app/page.tsx`.

## Customization

- Modify the mock data in `/src/lib/mockSocket.ts` to change the simulated real-time data.
- Adjust the UI components in the `/src/components/ui` directory to match your design preferences.
- Customize the color scheme by modifying the Tailwind configuration in `tailwind.config.js`.


