# kwwala homepage

Single-page personal homepage for Kwwala (`@imkwwala`) built with Vite + React + TypeScript + Tailwind + Bun.

## Scripts

- `bun install`
- `bun dev`
- `bun run build`
- `bun run lint`
- `bun run sync:editing`

## Auto Sync for Editing Playlist

The `editing` section is generated from a public YouTube playlist snapshot:

- Default playlist ID: `PLlwe9mu279CgLWky8z6HyxXBYaNrifyfi`
- Source file used by the app: `src/app/data/generated/editing.snapshot.json`
- Sync script: `scripts/sync-editing-from-youtube.ts`

### GitHub Actions behavior

The deploy workflow syncs the snapshot:

- on every push to `main`
- daily at `12:00 UTC` (`09:00 BRT`)

If YouTube sync fails (quota/network/key), deployment continues and keeps the
previous snapshot as fallback.

### Google Cloud setup (YouTube Data API v3)

1. Create a project in Google Cloud Console.
2. Enable **YouTube Data API v3**.
3. Create an API key in **APIs & Services > Credentials**.
4. Restrict the key:
   - `API restrictions`: YouTube Data API v3
   - `Application restrictions`: optional (if no fixed IP, keep unrestricted)
5. In GitHub repository settings:
   - `Settings > Secrets and variables > Actions > Secrets`
   - Add `YOUTUBE_API_KEY`
6. Optional repo variable:
   - `Settings > Secrets and variables > Actions > Variables`
   - Add `YOUTUBE_PLAYLIST_ID` (if omitted, default playlist is used)
