# Game Hub

A modern game discovery application built with React, TypeScript, and the latest UI technologies.

## Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7
- **UI Components**: Base UI + shadcn
- **Styling**: Tailwind CSS v4
- **Data Fetching**: TanStack Query
- **Routing**: TanStack Router
- **URL State Management**: nuqs
- **HTTP Client**: ky
- **Package Manager**: Bun
- **Linting/Formatting**: Biome
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- RAWG API key

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd game-hub
```

1. Install dependencies:

```bash
bun install
```

1. Create a `.env.local` file and add your RAWG API key:

```env
VITE_API_KEY=your_rawg_api_key_here
VITE_API_BASE_URL=https://api.rawg.io/api
```

1. Start the development server:

```bash
bun run dev
```

The application will be available at `http://localhost:3000`.
