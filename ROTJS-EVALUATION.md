# ROT.js Integration Evaluation — v1.0

**Status:** Technical evaluation only; no implementation authorized by this document.
**Scope:** Derelict Salvagers after Increment 1 verification.
**Reviewed:** Existing src/engine.js, package.json, approved Foundation v0.2; ROT.js upstream documentation and published package.

## Findings
- Current shortestPath uses breadth-first search on a small 10x9 orthogonal grid. It is adequate for movement and the known-route oxygen estimate. **Retain**; replacing it now adds complexity without a demonstrated benefit.
- Current reveal exposes the surrounding 3x3 neighborhood. ROT.js FOV could improve line-of-sight and occlusion, but changes the player's information and must be explicitly designed and tested. **Defer**.
- Current createRun(seed) changes only the bulkhead row (two layouts), while rooms and salvage coordinates remain almost identical. This is the most meaningful replayability limitation. **Evaluate ROT.js map generation first**.
- Existing action costs, machinery rules, cargo, save version, and PixiJS renderer remain authoritative and should not be replaced by ROT.js.
- ROT.js package `rot-js` v2.2.1 is BSD-3-Clause licensed, has zero runtime dependencies, and exposes map, FOV, pathfinding, and RNG modules. Include required license notices if adopted.

## Recommended next increment (proposal; requires approval)
1. Preserve a recoverable checkpoint and complete Increment 1 verification, including save/resume and offline behavior, before expanding gameplay.
2. In a separate, testable generator module, prototype deterministic spaceship-shaped layouts using a ROT.js generator as a starting point, not an unmodified dungeon.
3. Adapt rooms/corridors into plausible compartments; preserve single dock entry and meaningful bulkhead/terminal alternatives.
4. Validate reachable dock, machinery, salvage, return route, and feasible oxygen budget; reject invalid seeds and retry deterministically.
5. Test multiple seeds, regeneration determinism, action-cost fairness, and save/reload. Compare against the current implementation before deciding to adopt.
6. Integrate only after approval and successful tests. No PixiJS or rules-engine rewrite.

## Explicit exclusions
Do not install ROT.js, modify package.json, replace current maps, or change deployed gameplay as part of this evaluation.

## References
- https://github.com/ondras/rot.js
- https://ondras.github.io/rot.js/manual/
- https://www.npmjs.com/package/rot-js
