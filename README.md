# GymMane PC

PC-focused web and Windows desktop starter adaptation of GymMane.

**Attribution:** Based on GymMane by InlitX.

The full source bundle is available in the repository's Releases or as `GymMane-PC-prototype.zip` once uploaded. This is an initial functional prototype, not a feature-complete port of the Android app.

## Features
- Workout logging with sets, reps and optional load
- Exercise library, custom exercises and reusable routines
- Session history and weekly activity overview
- Optional rest timer
- Local storage and JSON backup/restore
- Offline web app support
- Electron configuration for Windows installer and portable EXE

## Build
Requires Node.js 20+. Run `npm install`, then `npm start` for desktop preview or `npm run dist:win` on Windows to package the app.

## GitHub Pages
Repository Settings → Pages → GitHub Actions. The included `pages.yml` workflow deploys the web app from `main`.

Original project: https://github.com/InlitX/GymMane
