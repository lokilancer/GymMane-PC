<div align="center">

# GymMane PC

**A PC-friendly workout journal inspired by GymMane**

[🌐 Open Website](https://lokilancer.github.io/GymMane-PC/) · [📦 Source Code](https://github.com/lokilancer/GymMane-PC) · [⬆️ Original Project](https://github.com/InlitX/GymMane)

![Status](https://img.shields.io/badge/status-prototype-blue)
![Platform](https://img.shields.io/badge/platform-Web%20%7C%20Windows-2ea44f)

</div>

---

## About

GymMane PC is a web and Windows desktop starter adaptation of **GymMane by InlitX**. It is designed to make workout logging available on a computer, with local data storage and offline web-app support.

> **Attribution:** Based on GymMane by InlitX.

## Features

- Log workouts, sets, reps and optional load
- Browse the exercise library and add custom exercises
- Create and reuse workout routines
- Review session history and weekly activity
- Optional rest timer
- Store data locally and export/import JSON backups
- Offline-capable web app
- Electron configuration for Windows installer and portable app builds

## Try it

Visit the **[GymMane PC website](https://lokilancer.github.io/GymMane-PC/)**. Your workout information is stored in your browser on your device; use the backup feature before clearing browser data or moving devices.

## Run locally

Requires Node.js 20 or newer.

```bash
npm install
npm start
```

To build the Windows desktop package on Windows:

```bash
npm run dist:win
```

## Deployment

The web version is published with GitHub Pages using the workflow in `.github/workflows/pages.yml`.

## Project links

| Project | Link |
|---|---|
| Live website | https://lokilancer.github.io/GymMane-PC/ |
| GitHub repository | https://github.com/lokilancer/GymMane-PC |
| Original GymMane | https://github.com/InlitX/GymMane |

## License and credits

This project is an initial functional prototype, not a feature-complete port of the Android app. Please read the repository's license and additional attribution notes before redistributing. The original project is credited to **InlitX**.
