# [kwwala.github.io](https://kwwala.github.io)

a modern, single-page portfolio website for [kwwala](https://github.com/imkwwala) featuring an interactive tab-based interface with sections for personal info, editing portfolio, music, and socials.

## features

- **tab-based navigation** – seamlessly switch between home, editing, music, and socials sections
- **youtube sync** – automatically synchronizes editing content from youtube playlists
- **responsive design** – optimized for all device sizes with smooth animations
- **type-safe** – built with typescript for robust code quality
- **ci/cd ready** – automated deployment via github actions with fallback support

## tech stack

- **frontend framework:** react 19 with typescript
- **build tool:** vite
- **styling:** tailwind 4
- **package manager:** bun
- **icons:** react-icons
- **deployment:** github pages + github actions

## prerequisites

- [bun](https://bun.sh) (v1.0 or higher)
- [git](https://git-scm.com)

## getting started

### 1. clone the repository

```bash
git clone https://github.com/kwwala/kwwala.github.io.git
cd kwwala.github.io
```

### 2. install dependencies

```bash
bun install
```

### 3. start development server

```bash
bun dev
```

### 4. open in browser

navigate to `http://localhost:5173` to see your changes in real-time with hot module replacement.

## available commands

| command                | description                                   |
| ---------------------- | --------------------------------------------- |
| `bun dev`              | start development server with hot reload      |
| `bun run build`        | build for production (outputs to `dist/`)     |
| `bun run lint`         | run eslint to check code quality              |
| `bun run sync:editing` | sync editing portfolio from youtube playlists |
| `bun install`          | install all dependencies                      |

## project structure

```
src/
├── app/
│   ├── components/      # react components (tabs, panels)
│   ├── constants/       # configuration and constants
│   ├── data/            # content data and snapshots
│   └── hooks/           # custom react hooks
├── assets/              # images and static assets
├── app.tsx              # main application component
├── main.tsx             # entry point
└── index.css            # global styles
```

## deployment

the project automatically deploys via github actions:

- **on push:** deploys on every push to the `main` branch
- **scheduled:** daily deployment at ≈12:00 utc (≈09:00 brt)
- **fallback:** if the youtube sync fails, deployment uses the previous snapshot as fallback

the site is currently hosted on [github pages](https://pages.github.com/).

## license

this project is open source and available under the mit license.
