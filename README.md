# Space Company - Web Port (Vite + React + TS)

This repository contains the full modern port of the **Space Company** incremental game, migrated from older pure JS/HTML/CSS structure to a modern stack: **React**, **Vite**, **Zustand**, **Tailwind CSS**, and **TypeScript**.

## How to Run

1. Navigate to the `web-app` directory:
   ```bash
   cd web-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```
5. Run tests:
   ```bash
   npm run test
   ```

## Migration Map

The original source logic has been refactored into modular TypeScript files:

- **State Management & UI Variables**:
  - `variable.js` & `ui/*.js`  -> `web-app/src/store/gameStore.ts` (Zustand)
  - Resources from `data/resourceData.js` -> `web-app/src/lib/resources.ts`
- **Core Game Logic**:
  - `core.js` & `game.js` (tick loop & energy calculations) -> `web-app/src/lib/engine.ts` & `web-app/src/hooks/useGameLoop.ts`
- **User Interface**:
  - `index.html` & Bootstrap CSS -> `web-app/src/components/Dashboard.tsx`, `Sidebar.tsx`, `ResourceView.tsx`, `BuildingView.tsx` with **Tailwind CSS**.
- **Tests**:
  - Validated game loop mechanics via **Vitest** in `web-app/src/lib/engine.test.ts`.

---

### Original README below:

# Overview:
Space Company is a science-fiction incremental game where you start from humble beginnings on Earth, working your way up to travelling between star systems and building Dyson Spheres and pretty much colonising the entire galaxy(ies?)

Development has stopped, however, several projects have been created based on this you may wish to try.

# Derived projects from members in the community
- https://play.google.com/store/apps/details?id=com.freddecgames.ngsc Mobile Port by Freddec
- https://ngspacecompany.freddecgames.com/ V1 Web uptaken by Freddec
- https://ngsc.freddecgames.com/ V2 Web Freddec
- https://github.com/migue1s/SpaceCompanyNative Mobile Port by migue1s
- https://github.com/SpiderGamin/SpaceCompany-Desktop Desktop Application by SpiderGamin
- 
# Former Plans for the Future
- Check https://www.reddit.com/r/SpaceCompany/wiki/futureplans
- When loading game, the tab you left on is the tab you now start on
- Random Events
- [Change UI from bootstrap to my own]