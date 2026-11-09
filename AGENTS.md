# AGENTS.md

Read [GOAL.md](GOAL.md) for intent and [PLAN.md](PLAN.md) for current scope. Use hyphens in prose where a dash is needed.

- Edit `catalog/catalog.json` and `gallery/assets/` together. Keep published palette, style, recipe, and asset IDs stable. Give changes to their design a new version.
- Rebuild and check with `node scripts/gallery.mjs build` and `node scripts/gallery.mjs check`. Treat `gallery/README.md` as generated output.
- Keep private references, raw batches, and notes in `temp/`. Verify reuse rights before adding image files or references to the catalog.
- Update both README entry points when changing setup commands.
