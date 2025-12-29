# GearGuard - Modern CMMS Platform

> Industrial maintenance management system built for the Odoo x Adani Hackathon

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

<!-- Live Demo buttons -->
[View Demo Video](#) · [Report Bug](#) · [Request Feature](#)

<!-- Hero screenshot -->
![Dashboard Hero](./docs/dashboard-hero.png)

<!-- Demo GIF -->
![Demo GIF](./docs/demo.gif)

## Problem Statement
Industrial maintenance is often plagued by:
*   **Reactive Chaos**: Waiting for machines to break instead of preventing it.
*   **Manual Drudgery**: Error-prone data entry and spreadsheet limitations.
*   **Poor UX**: Complex, outdated software that requires weeks of training.

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
*   **Smart Notifications**: (Simulated) Immediate alerts for status changes and overdue tasks.
*   **Automated Logic**: "Scrap" requests automatically decommission equipment in the backend.
*   **Preventive Scheduling**: Calendar integration for recurring maintenance tasks.

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

## Screenshots

### Dashboard
<!-- Add screenshot of dashboard here -->
![Dashboard](./docs/ss-dashboard.png)

### Kanban Board
<!-- Add screenshot of kanban board here -->
![Kanban](./docs/ss-kanban.png)

### Analytics
<!-- Add screenshot of reports page here -->
![Analytics](./docs/ss-analytics.png)

### Equipment Management
<!-- Add screenshot of equipment list here -->
![Equipment](./docs/ss-equipment.png)

## Quick Start

```bash
# Clone
git clone https://github.com/yourusername/gearguard.git

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
    git clone https://github.com/yourusername/gearguard.git
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
*   **Technician**: `tech@gearguard.com` / `Password123!`

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

## Contributing
1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## Team
*   **[Your Name]** - *Full Stack Developer* - [GitHub](https://github.com/)
*   **[Member 2]** - *Frontend Engineer* - [GitHub](https://github.com/)
*   **[Member 3]** - *Backend Engineer* - [GitHub](https://github.com/)

## License
Distributed under the MIT License. See `LICENSE` for more information.

## Acknowledgments
*   Built for the **Odoo x Adani Hackathon**.
*   Special thanks to [Mentors/Organizers].
