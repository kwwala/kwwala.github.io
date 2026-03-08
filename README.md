# kwwala homepage

Single-page personal/portfolio homepage for [Kwwala](https://github.com/imkwwala) built with Vite, TypeScript, Tailwind, and Bun.

## Getting Started

1. Clone the repository
2. Install dependencies: `bun install`
3. Start development server: `bun dev`
4. Open `http://localhost:5173` in your browser

## Available Scripts

- `bun install`: Install dependencies
- `bun dev`: Start development server
- `bun run build`: Build for production
- `bun run lint`: Run linter
- `bun run sync:editing`: Sync content

## Deployment

The GitHub Actions workflow automatically deploys on:

- Every push to `main`
- Daily at ≈12:00 UTC (≈09:00 BRT)

If YouTube sync fails, deployment continues using the previous snapshot as fallback.
