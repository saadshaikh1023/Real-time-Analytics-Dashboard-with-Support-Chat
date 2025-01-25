# Analytics Dashboard and Support Chat Architecture

## Overview

This project is a real-time analytics dashboard with a support chat feature, built using Next.js 14, TypeScript, and Tailwind CSS. The application provides real-time data visualization, user activity tracking, and a support chat interface.

## Key Components

1. **Dashboard**
   - ActiveUsersChart
   - ActivityMetricsChart
   - LiveUserCounter
   - ActivityFeed
   - ConnectionStatus
   - UserSimulator

2. **Support Chat**
   - ChatInterface

3. **Authentication**
   - NextAuth.js integration

4. **Shared Components**
   - ThemeToggle (for dark/light mode)
   - LoadingPage

## Technology Stack

- **Frontend**: Next.js 14 (React), TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js
- **State Management**: React Hooks (useState, useEffect)
- **Real-time Communication**: Mock Socket (simulated WebSocket)
- **UI Components**: Custom components based on shadcn/ui

## Architecture Overview

```mermaid title="Application Architecture" type="diagram"
graph TD
    A[Client Browser] -->|HTTP/WebSocket| B[Next.js Server]
    B -->|Server-Side Rendering| C[React Components]
    B -->|API Routes| D[NextAuth.js]
    B -->|Mock Socket| E[Simulated Real-time Data]
    C -->|Client-Side Rendering| F[Dashboard]
    C -->|Client-Side Rendering| G[Support Chat]
    F -->|Real-time Updates| E
    G -->|Real-time Updates| E
    D -->|Authentication| H[User Session]
