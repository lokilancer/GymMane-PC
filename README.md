<div align="center">

# GymMane PC

### Your workout journal, reimagined for desktop.

A PC-focused web and Windows desktop adaptation inspired by GymMane.

<p>
  <a href="https://lokilancer.github.io/GymMane-PC/"><strong>Launch App</strong></a> ·
  <a href="https://github.com/lokilancer/GymMane-PC"><strong>Source Code</strong></a> ·
  <a href="https://github.com/InlitX/GymMane"><strong>Original Project</strong></a>
</p>

[![GitHub stars](https://img.shields.io/github/stars/lokilancer/GymMane-PC?style=for-the-badge&logo=github&label=Star%20this%20project)](https://github.com/lokilancer/GymMane-PC/stargazers)
![Platform](https://img.shields.io/badge/Platform-Web%20%7C%20Windows-2563eb?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Prototype-f59e0b?style=for-the-badge)

</div>

---

## Overview

**GymMane PC** brings essential workout-tracking tools to a desktop-friendly experience. It is an initial functional prototype based on **GymMane by InlitX**, with local data storage and offline web-app support.

> **Credit:** Based on GymMane by InlitX. Please retain the original project's attribution and review the included licensing terms before redistribution.

## Features

| Feature | Description |
|---|---|
| Workout logging | Record exercises, sets, reps and optional load |
| Exercise library | Browse existing exercises and add custom entries |
| Routines | Create and reuse workout routines |
| Progress history | Review previous sessions and weekly activity |
| Rest timer | Optional timer between sets |
| Data ownership | Local browser storage with JSON backup and restore |
| Offline support | Installable, offline-capable web app |
| Desktop packaging | Electron configuration for Windows builds |

## Get started

**[Open GymMane PC](https://lokilancer.github.io/GymMane-PC/)**

Your workout records are stored locally in your browser on your device. Export a backup before clearing browser data or changing devices.

## Run from source

**Requirements:** Node.js 20 or newer.

```bash
npm install
npm start
```

Build the Windows desktop package on Windows:

```bash
npm run dist:win
```

## Deployment

The web application is deployed through GitHub Pages using the workflow in `.github/workflows/pages.yml`.

## Project information

- **Live application:** [lokilancer.github.io/GymMane-PC](https://lokilancer.github.io/GymMane-PC/)
- **Repository:** [lokilancer/GymMane-PC](https://github.com/lokilancer/GymMane-PC)
- **Original project:** [InlitX/GymMane](https://github.com/InlitX/GymMane)

## Support the project

If this project is useful or interesting, please consider giving the repository a ⭐ on GitHub. Your star helps others discover the project.

[![Star on GitHub](https://img.shields.io/badge/⭐%20Star%20this%20repository-GitHub-181717?style=for-the-badge&logo=github)](https://github.com/lokilancer/GymMane-PC/stargazers)

## Credits & licensing

This repository contains an early-stage prototype and is not a feature-complete port of the original Android application. Review `LICENSE` and `ADDITIONAL_TERMS.md` before redistribution. Original project credit: **InlitX**.
