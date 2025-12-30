# GearGuard - Modern CMMS Platform

> Industrial maintenance management system built for the Odoo x Adani Hackathon


## Problem Statement
**Objective**: Develop a maintenance management system that allows a company to track its 
assets (machines, vehicles, computers) and manage maintenance requests for those assets. 
**Core Philosophy**: The module must seamlessly connect Equipment (what is broken), Teams 
(who fix it), and Requests (the work to be done). 

## Solution
GearGuard transforms maintenance into a streamlined, digital workflow. It connects teams, technicians, and equipment in one platform, enabling **predictive maintenance** and **automated resource management**.

## Why GearGuard?

| Feature | Traditional CMMS | GearGuard |
| :--- | :--- | :--- |
| **User Interface** | Clunky, dated forms | Modern, Drag-and-Drop Kanban |
| **Onboarding** | Weeks of training | Zero-training intuitive UI |
| **Assignments** | Manual entry | Intelligent Auto-Mapping |
| **Updates** | Creating tickets manually | Real-time Status Sync |

## Key Features
*   **Intelligent Resource Mapping**: Auto-assigns the correct Team and Technician based on the selected Equipment.
*   **Kanban Workflow**: Interactive drag-and-drop board for managing maintenance request lifecycles.
*   **Smart Analytics**: Real-time insights into Preventive vs. Corrective maintenance ratios.
*   **Dynamic Toast Notifications**: Real-time pop-up alerts for status changes, new assets, and critical updates.
*   **Advanced Filtering**: Filter equipment by Department/Team and Status with a modern popover UI.
*   **Preventive Scheduling**: Full Calendar view with monthly summaries and status color-coding.
*   **Automated Logic**: "Scrap" requests automatically decommission equipment in the backend.

## Tech Stack

### Frontend
*   **Framework**: React (Vite)
*   **Styling**: Tailwind CSS, PostCSS
*   **State/Interactions**: @dnd-kit (Kanban), Recharts (Analytics), Axios
*   **Icons**: React Icons (FontAwesome/Material)

### Backend
*   **Runtime**: Node.js
*   **Framework**: Express.js
*   **Database**: SQLite (Dev) / Compatible with PostgreSQL
*   **ORM**: Sequelize


## Quick Start

```bash
# Clone
git clone https://github.com/Krishna9891/GearGuard-OdooHackathon.git

# Backend (Terminal 1)
cd gearguard-backend && npm install && npm run dev

# Frontend (Terminal 2)
cd gearguard-frontend && npm install && npm run dev
```

## Getting Started

### Prerequisites
*   Node.js (v18 or higher)
*   npm (v9 or higher)

### Installation
1.  **Clone the repo**
    ```bash
    git clone https://github.com/Krishna9891/GearGuard-OdooHackathon.git
    cd gearguard
    ```

2.  **Setup Backend**
    ```bash
    cd gearguard-backend
    npm install
    # Database seeds automatically on first run
    npm run dev
    ```

3.  **Setup Frontend**
    ```bash
    cd ../gearguard-frontend
    npm install
    npm run dev
    ```

### Demo Credentials
*   **Admin**: `admin@gearguard.com` / `Password123!`
*   **Technician**: `mitch@gearguard.com` / `Password123!`

## Project Structure

```
gearguard/
├── gearguard-backend/      # Node.js Express API
│   ├── src/
│   │   ├── controllers/    # Business logic
│   │   ├── models/         # Sequelize schemas
│   │   └── routes/         # API endpoints
│   └── database.sqlite     # Local DB
│
├── gearguard-frontend/     # React Application
│   ├── src/
│   │   ├── components/     # Reusable UI (Cards, Inputs)
│   │   ├── pages/          # Application Views
│   │   └── services/       # API integration
│   └── index.css           # Tailwind imports
│
└── docs/                   # Documentation assets
```

## Design System
We follow a strict dark-mode-first design system.
[View Design Documentation](./gearguard-design-system.md)

## Security Features
*   **JWT Authentication**: Secure stateless session management.
*   **Bcrypt Hashing**: Industry-standard password encryption.
*   **Role-Based Access Control (RBAC)**: Distinct permissions for Admins vs Technicians.
*   **Input Sanitization**: Prevention of basic injection attacks via Sequelize.

## Testing
Backend model tests are available.
```bash
cd gearguard-backend
npm test
```

## Deployment
*   **Frontend**: Ready for Vercel/Netlify (Build command: `npm run build`).
*   **Backend**: Ready for Render/Heroku (Start command: `npm start`).

## API Documentation
API endpoints are documented in the codebase. Key routes:
*   `GET /api/requests` - Fetch all tickets
*   `POST /api/auth/login` - User authentication
*   `PATCH /api/requests/:id/stage` - Update ticket status

## Roadmap
*   [ ] Mobile App for on-site technicians
*   [ ] IoT Sensor Integration for auto-triggering requests
*   [ ] PDF Report Export

