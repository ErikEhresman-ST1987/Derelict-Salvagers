# Increment 1 — One Complete Salvage Expedition

**Status:** Approved for implementation. **Parent:** [Goal Box](GOAL-BOX.md) · [Foundation](FOUNDATION.md).

## Player-facing scope
Start at docking point on a small generated derelict; explore unknown grid, move manually or tap along known traversable paths, manage oxygen/tool charges, choose between cutting a bulkhead and using a terminal, collect size-limited salvage, see the shortest known passable return estimate, return physically, and extract. Persist active state across reload. Oxygen depletion causes expedition failure.

## Provisional test values
Approximately 10×10 tiles, 40 oxygen, movement 1/tile, terminal 1, cutting 2 oxygen and 2 tool charges, salvage 1, starting tool power 6, cargo 6 spaces, 3–4 items. These are adjustable test fixtures.

## Out of scope
Regional selection/scans, ship repair economy, upgrades, emergency retrieval, final escape, complex hazards, enemies, audio, elaborate animations, production artwork, and full-run timing.

## Mandatory checks
- Repository and branch identity; recoverable commit; PixiJS source, pinned version, license and local delivery.
- Legal/illegal moves and costs; discovered tiles; stopping auto-path at unknown or obstacles.
- Machinery alternative and route recalculation.
- Salvage and cargo enforcement; docking-only extraction; oxygen failure.
- Seed reproducibility and viable generated maps.
- Save/reload, invalid save handling, renderer rebuild.
- Hosted deployment, offline reload, actual mobile interaction.

## Stop
Stop at a technically verified playable expedition and request real-play evaluation. Do not automatically begin Increment 2. Mark tests not actually run as unverified.
