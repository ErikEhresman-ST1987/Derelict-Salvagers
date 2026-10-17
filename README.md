# Derelict Salvagers

A compact, turn-based science-fiction salvage roguelike. Explore abandoned spacecraft, recover equipment and critical repair components, and decide when to leave safely rather than risk one more room.

## Project status
**Planning approved; Increment 1 source committed, not yet verified or deployed.** The [Goal Box v1.0](GOAL-BOX.md) and [Project Foundation v0.2](FOUNDATION.md) are approved. [Increment 1 contract](INCREMENT-1.md) is approved for implementation. A working game, deployment, offline support, and real-device testing must not be assumed until separately verified.

## Intended game
- One operator on a visible, discoverable grid with turn-based oxygen costs.
- Environmental obstacles and machinery alternatives instead of combat.
- Salvage limited by tool power, oxygen, and cargo space.
- A return-to-shuttle decision; each derelict is single-entry.
- Ship repairs, optional upgrades, emergency retrieval, and an eventual escape-or-failure conclusion.
- 20–40-minute target for a complete run, with save/resume and replayable derelicts.

## First implementation
One complete small derelict expedition: dock, explore, interact with a bulkhead or terminal, collect salvage, return and extract, with save/resume. This is intentionally narrower than the mature game. See [Increment 1](INCREMENT-1.md) for boundaries and acceptance tests.

## Technology direction
PixiJS v8 for the physical map; HTML/CSS for interface; plain JavaScript for independent authoritative game rules; versioned local JSON state; static hosting and offline-capable local assets. Exact dependency bundling, hosted deployment, and touch performance require verification.

## Development discipline
Goal Box → Foundation → Smallest Meaningful Implementation → Verify → Real Use → Learn → Next Increment.

- Keep game rules independent from rendering and UI.
- Never describe untested behavior as verified.
- Preserve recoverable commits before risky changes.
- Validate generated maps and saves.
- Test on actual mobile devices before approving the next increment.
- Do not automatically expand scope after a successful increment.

## Project documents
- [Approved Goal Box v1.0](GOAL-BOX.md)
- [Approved Project Foundation v0.2](FOUNDATION.md)
- [Approved Increment 1 contract](INCREMENT-1.md)

## Repository
Default branch: `main`. Initial baseline: [ae3b9f5](https://github.com/ErikEhresman-ST1987/Derelict-Salvagers/commit/ae3b9f538661cfa02b542bdf6def0cd4509fb3a7).

No account, backend, subscription, combat system, or real-time timer is planned.

## Running the current development build
Requires Node.js 22 and npm. Run `npm install`, `npm test`, and `npm run dev`; then open the local address printed by Vite. `npm run build` creates static files in `dist/`. The exact pinned PixiJS and Vite packages still require successful install/build verification. No hosted URL is yet confirmed.

**Current limitations:** The source contains a small first-expedition rules engine, PixiJS tile renderer, basic HTML controls, autosave, and initial rules tests. It is not a verified complete Increment 1. Browser integration, offline caching, deployment, and real-device playtests remain outstanding. The full game's repair/upgrade/rescue systems are not included.
