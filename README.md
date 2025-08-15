# Game Hub

A modern game discovery application built with React, TypeScript, and the latest UI technologies.

## Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS v4
- **Data Fetching**: TanStack Query (React Query)
- **Routing**: React Router v7
- **State Management**: Zustand
- **Package Manager**: Bun
- **Icons**: Lucide React & React Icons

## Features

- 🎮 Browse and search games
- 🌓 Dark/Light mode toggle
- 📱 Responsive design
- ♾️ Infinite scrolling
- 🔍 Advanced filtering (genre, platform, sorting)
- 📊 Game ratings and screenshots
- 🎬 Game trailers
- ⚡ Fast loading with optimized caching

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (latest version)
- RAWG API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd game-hub
```

2. Install dependencies:
```bash
bun install
```

3. Create a `.env.local` file and add your RAWG API key:
```env
VITE_API_KEY=your_rawg_api_key_here
VITE_API_BASE_URL=https://api.rawg.io/api
```

4. Start the development server:
```bash
bun run dev
```

The application will be available at `http://localhost:3000`.

## Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run build:staging` - Build for staging environment
- `bun run preview` - Preview production build
- `bun run lint` - Run ESLint
- `bun run lint:fix` - Fix ESLint issues
- `bun run type-check` - Run TypeScript type checking

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   └── ...             # Application components
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── services/           # API services
├── entities/           # TypeScript interfaces
├── lib/                # Utility functions
├── assets/             # Static assets
└── globals.css         # Global styles
```

## UI Components

This project uses [shadcn/ui](https://ui.shadcn.com/) for UI components, which provides:

- Accessible and customizable components
- Built on Radix UI primitives
- Styled with Tailwind CSS
- Full TypeScript support
- Copy-paste component architecture

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a pull request

## License

This project is licensed under the MIT License.