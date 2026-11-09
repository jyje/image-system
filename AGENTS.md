# AGENTS.md

Read [GOAL.md](GOAL.md) for intent and [PLAN.md](PLAN.md) for current scope. Use hyphens in prose where a dash is needed.

- Edit `catalog/catalog.json` and `gallery/assets/` together. Keep published palette, style, recipe, and asset IDs stable. Give changes to their design a new version.
- Rebuild and check with `node scripts/gallery.mjs build` and `node scripts/gallery.mjs check`. Treat `gallery/README.md` as generated output.
- Keep private references, raw batches, and notes in `temp/`. Verify reuse rights before adding image files or references to the catalog.
- Update both README entry points when changing setup commands.

## Project skills

The skill files live in `.claude/skills/`. The relative `.agents` symlink points to `.claude`.

- [pilot-workflow](.claude/skills/pilot-workflow/SKILL.md) for curation, generation experiments, and gallery updates.
- [centered-readme](.claude/skills/centered-readme/SKILL.md) for changes to the bilingual README header.
- [git-commit-helper](.claude/skills/git-commit-helper/SKILL.md) for commit messages, staged reviews, and authorized local commits.
