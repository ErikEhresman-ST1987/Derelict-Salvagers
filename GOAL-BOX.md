# Derelict Salvagers — Goal Box v1.0

**Status:** Approved. **Authority:** Governs mature gameplay destination. **Approval:** 2026-10-16.

## Purpose
Create a replayable, single-player, turn-based sci-fi salvage roguelike. A lone operator, stranded aboard a disabled vessel, explores derelict ships, retrieves components, repairs long-range propulsion, and escapes. The central decision is **explore one more room or retreat safely with current salvage**.

## Intended experience
- A complete escape-or-failure run targeting 20–40 minutes, with save/resume.
- Visible grid exploration; manual movement and tap-to-move over known safe paths.
- Partial pre-entry scans and selectable, single-entry derelicts.
- Procedurally varied, validated layouts and meaningful interconnected machinery situations.
- Environmental hazards, damaged bulkheads, limited terminal circuits, and comprehensible choices; no combat.
- Oxygen as a turn/action budget; inspection is free. Visible known-route return cost and projected reserve.
- Tool energy and size-limited cargo; common scrap and critical repair components.
- Salvage-vessel hub for repairs, maintenance, and optional within-run cutting, oxygen, and cargo upgrades.
- One emergency retrieval per run, requiring a known passable route, with limited retained cargo.
- Fair initial region viability, recoverable setbacks, possible run-ending mistakes, and reproducible generation.

## Design requirements
Game rules must remain independent of rendering; interface must be touch-first, responsive, readable, and calm. Offline-first and local-first with versioned saves and no accounts/backend. Gameplay actions must have predictable costs and outcomes. Return travel must not teleport or avoid normal costs.

## Success criteria
A player can complete a full run, succeed or fail understandably, and resume an interrupted run. Exploration, machinery, salvage selection, retreat, and upgrades create consequential choices. Procedural runs differ in situations, not just corridor arrangement. Real play should approach the 20–40-minute target. Rules, saves, generation, offline behavior, and touch controls must be verified.

## Explicit non-goals
Combat/enemies, real-time timers, crew, multiple decks, elaborate crafting or engineering simulation, permanent between-run upgrades, accounts, monetization, and large scripted campaigns.

## Provisional tuning
Five selectable derelicts and approximately three expeditions per successful run; move 1 oxygen/tile; terminal 1; cut 2 plus tool power; salvage 1; rescue retains roughly two normal cargo spaces. All quantities subject to playtesting.

## Change control
This Goal Box describes the mature destination, **not the first increment**. Material changes require approval. See [Foundation](FOUNDATION.md) and [Increment 1 contract](INCREMENT-1.md).
