# Derelict Salvagers — Project Foundation v0.2

**Status:** Approved. **Governing authority:** [Goal Box v1.0](GOAL-BOX.md).

## Direction
Browser-based, offline-capable, local-first, turn-based game. PixiJS renders the physical grid world; HTML/CSS owns informational and touch controls. Native JavaScript modules implement deterministic game rules independent of renderer. Static hosting is preferred; no account/backend. The first meaningful implementation is **one complete salvage expedition**, not the full escape-or-failure run.

## Ownership and extension
| Concern | Authoritative owner |
| --- | --- |
| Legal actions, turns, oxygen, failure, extraction | Game rules/state |
| Layout creation and reachability validation | Generator |
| Movement and known return routes | Navigation |
| Doors, machinery, hazards | Interaction rules |
| Cargo, ship repairs, upgrades | Progression rules |
| Save validation, migration and recovery | Persistence |
| Scene and graphical effects | PixiJS renderer |
| HUD, panels and controls | HTML/CSS |
| Input-to-action dispatch | Controller |
| Definitions and tuning | Configuration |

**Invariant:** UI and PixiJS request actions and display resulting state; neither owns or mutates gameplay facts. Renderer recreation must not alter the game. Future progression and rescue systems extend the same authoritative state and transition contract.

## Generation and fairness
Use constrained reproducible layouts, then validate initial reachability, machinery connections, available routes, and salvage placement. A generated region must start viable; player decisions may still cause failure. The first slice proves a small valid derelict before regional generation.

## Persistence and offline
Save versioned semantic JSON, not PixiJS objects or transient effects. Validate before loading; preserve a last-valid checkpoint; handle storage failures and incompatible saves without silent overwrite. Prefer localStorage while saves remain modest; measure before committing long term. Bundle runtime and assets locally; verify offline behavior on target devices. JSON export/restore is a mature requirement, not required in the first slice.

## Graphics and mobile
Portrait-first phone layout with deliberate tablet/desktop adaptation. Keep map usable at touch scale; no requirement for particles or elaborate animation. Use small proof assets and the approved Create → Approve → Lock Canonical → Prepare → Verify → Implement pipeline before production artwork.

## Verification
Automated deterministic rules tests plus browser integration and actual iPhone/iPad play. Verify invalid moves, turn costs, return routes, machinery, cargo, generation, save/reload, renderer reconstruction, offline loading, and deployment. Distinguish implemented, activated, verified, played, and evaluated.

## Recovery and gates
Dedicated repository `ErikEhresman-ST1987/Derelict-Salvagers`, branch `main`. Initial recoverable commit `ae3b9f538661cfa02b542bdf6def0cd4509fb3a7`. Hosting/Pages and real-device PixiJS behavior remain unverified. Before expanding, check deployed revision and preserve a recoverable checkpoint.

## First slice and exclusions
See [Increment 1](INCREMENT-1.md): one docking-to-extraction expedition with movement, oxygen, one bulkhead/terminal choice, salvage, cargo, return estimate, and save/resume. Exclude regional scans, full repairs, upgrades, rescue, multi-deck layouts, combat, and full-run pacing until later approved increments.

## Change control
This Foundation records approved ownership and extension boundaries. Adjustments to these boundaries or material gameplay scope require explicit review; numerical balance values remain provisional.

---

## Appendix A — Approved governing Goal Box v1.0 (embedded reference)

### Derelict Salvagers — Goal Box v1.0

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
