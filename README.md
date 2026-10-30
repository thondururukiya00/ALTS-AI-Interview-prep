# ALTS — AI Interview Preparation Assistant

> **Intelligent 4-Stage Campus & Corporate Hiring Assessment System**  
> Characterized by high-contrast typography, violet-indigo developer tokens (`#7033ff` / `#8c5cff`), 1.4rem friendly rounded corners, stationary fixed navigation, and a multi-stage anti-cheat proctoring engine.

---

## Overview

**ALTS** is an autonomous web application designed for calibrated technical hiring assessments. It simulates real-world enterprise evaluation pipelines across four distinct sequential stages with difficulty scaling from fundamentals to algorithmic complexity:

1. **Stage I — Quantitative & Logical Aptitude**: Progressive multiple-choice deduction (Easy ➔ Medium ➔ Hard).
2. **Stage II — Dialectical & Group Discussion**: Voice-enabled argumentation and critical analysis.
3. **Stage III — Technical Architecture & Code**: In-browser real-time execution IDE supporting syntax and data structures.
4. **Stage IV — Behavioral & Leadership**: Autonomous examiner simulation evaluating communication and team fit.

---

## Key Features

* **Developer Token System**:
  - Clean light/dark mode variants (`#fdfdfd` light mode, sleek `#1a1b1e` / `#222327` charcoal dark mode).
  - High-contrast typography pairing **Plus Jakarta Sans** for UI and **IBM Plex Mono** for code/scores.
  - Smooth, friendly `1.4rem` rounded corners (`--radius: 1.4rem`).
  - Vibrant violet-indigo primary highlights (`#7033ff` / `#8c5cff`).

* **Stationary Viewport Sidebar**:
  - `position: fixed` left navigation that remains completely still while the assessment area scrolls cleanly.
  - Live proctor telemetry widget and candidate dossier indicator.

* **Anti-Cheat Proctoring Enclave (`proctoring.html` & `script.js`)**:
  - Floating PIP webcam feed with biometric face detection simulation.
  - Strict fullscreen enforcement, tab-switching/blur detection, and right-click restriction.
  - 3-strike infraction termination protocol with Web Audio API alerts and audit logs.

* **Authentication & Guarding (`login.html`)**:
  - Institutional login and account registration with password confirmation and client-side validation.
  - 1-click Quick Demo Login for instant evaluation.
  - Auth guard automatically routes unauthenticated visitors to login first.

* **Interactive Component System (`components.html`)**:
  - Dedicated design system library showcasing metric cards, stationary sidebar, developer data table, and UI controls.

---

## Project Structure

```
├── login.html           # Candidate authentication portal (Login / Register / Demo)
├── login.css            # Auth styling with light/dark developer tokens
├── index.html           # System landing masthead
├── hero.css             # Masthead layout & hero styling
├── dashboard.html       # Candidate assessment console (Protected)
├── styles.css           # Central dashboard layout & stationary sidebar
├── components.html      # Developer design system & component library
├── components.css       # Analytics grid, sidebar & table components
├── colors.css           # Global CSS variables & light/dark tokens
├── proctoring.html      # Anti-cheat surveillance enclave & audit console
├── proctoring.css       # Monochrome video styling & strike matrix
├── aptitude.html        # Stage I: Quantitative Aptitude
├── gd.html              # Stage II: Dialectical & Group Discussion
├── tech.html            # Stage III: Technical & Coding IDE
├── hr.html              # Stage IV: Behavioral & Leadership Interview
├── result.html          # Final evaluation dossier & score breakdown
├── dashboard.js         # Dynamic DOM data hydration & set rotation
├── script.js            # Proctoring engine, auth logic & modals
├── data.json            # Assessment configuration & candidate metadata
└── server.js            # Lightweight Node.js static server
```

---

## Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/) (v16.0 or higher)

### Installation & Launch

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/<your-username>/<your-repo-name>.git
   cd <your-repo-name>
   ```

2. **Start the Local Server**:
   ```bash
   node server.js
   ```

3. **Open in Browser**:
   Open [http://localhost:8080/](http://localhost:8080/) — you will land on the **Login Page** first.
   - Click **"Quick Demo Login"** to jump directly into the dashboard.

---

## Tech Stack

* **Markup & Semantics**: HTML5 (Accessible, semantic layout shells)
* **Styling**: Modern CSS3 (CSS Grid, Flexbox, CSS Custom Properties, Dark Mode via `data-theme`)
* **Fonts**: [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) & [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono)
* **Logic**: Vanilla ES6+ JavaScript (`async/await`, `localStorage`, `Web Audio API`, `MediaDevices.getUserMedia`)
* **Backend**: Node.js `http` module (Zero third-party npm dependencies required)

---

## License

MIT License &copy; 2026 ALTS Engineering.
