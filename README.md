# [kwwala.github.io](https://kwwala.github.io)

A modern, single-page portfolio website for [Kwwala](https://github.com/imkwwala) featuring an interactive tab-based interface with sections for personal info, editing portfolio, music, and socials.

## Features

- **Tab-based Navigation** – Seamlessly switch between Home, Editing, Music, and Socials sections
- **YouTube Sync** – Automatically synchronizes editing content from YouTube playlists
- **Responsive Design** – Optimized for all device sizes with smooth animations
- **Dark Theme** – Retro-inspired design with scanline effects
- **Type-Safe** – Built with TypeScript for robust code quality
- **CI/CD Ready** – Automated deployment via GitHub Actions with fallback support

## Tech Stack

- **Frontend Framework:** React 19 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS 4
- **Package Manager:** Bun
- **Icons:** react-icons
- **Deployment:** GitHub Pages + GitHub Actions

## Prerequisites

- [Bun](https://bun.sh) (v1.0 or higher)
- Git

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/imkwwala/kwwala.github.io.git
cd kwwala.github.io
```

### 2. Install dependencies

```bash
bun install
```

### 3. Start development server

```bash
bun dev
```

### 4. Open in browser

Navigate to `http://localhost:5173` to see your changes in real-time with hot module replacement.

## Available Commands

| Command                | Description                                   |
| ---------------------- | --------------------------------------------- |
| `bun dev`              | Start development server with hot reload      |
| `bun run build`        | Build for production (outputs to `dist/`)     |
| `bun run lint`         | Run ESLint to check code quality              |
| `bun run sync:editing` | Sync editing portfolio from YouTube playlists |
| `bun install`          | Install all dependencies                      |

## Project Structure

```
src/
├── app/
│   ├── components/      # React components (tabs, panels)
│   ├── constants/       # Configuration and constants
│   ├── data/            # Content data and snapshots
│   └── hooks/           # Custom React hooks
├── assets/              # Images and static assets
├── App.tsx              # Main application component
├── main.tsx             # Entry point
└── index.css            # Global styles
```

## Deployment

The project automatically deploys via GitHub Actions:

- **On Push:** Deploys on every push to the `main` branch
- **Scheduled:** Daily deployment at ≈12:00 UTC (≈09:00 BRT)
- **Fallback:** If YouTube sync fails, deployment uses the previous snapshot as fallback

The site is hosted on [GitHub Pages](https://pages.github.com/).

## License

This project is open source and available under the MIT License.
