# AGENTS.md

Read [GOAL.md](GOAL.md) for intent and [PLAN.md](PLAN.md) for current scope. Use hyphens in prose where a dash is needed.

- Optimize for the owner's projects. Keep approved assets directly usable as files and add automation only where repeated work warrants it.
- Edit `catalog/catalog.json` and `gallery/assets/` together. Keep published palette, style, recipe, and asset IDs stable. Give changes to their design a new version.
- Rebuild and check with `node scripts/gallery.mjs build` and `node scripts/gallery.mjs check`. Treat both gallery READMEs as generated output.
- Keep private references, raw batches, and notes in `temp/`. Verify reuse rights before adding image files or references to the catalog.

## Documentation language

- Write primary documentation and asset descriptions in English. Provide Korean as the companion translation.
- In every directory with a README, use `README.md` for English and `README-ko.md` for Korean. Link the two versions and list English first. Keep `README-en.md` absent.
- Write the English version first, then update the corresponding Korean version in the same change. Link to the matching language when a translated page exists.

## Project skills

The skill files live in `.claude/skills/`. The relative `.agents` symlink points to `.claude`.

- [pilot-workflow](.claude/skills/pilot-workflow/SKILL.md) for curation, generation experiments, and gallery updates.
- [centered-readme](.claude/skills/centered-readme/SKILL.md) for changes to the bilingual README header.
- [git-commit-helper](.claude/skills/git-commit-helper/SKILL.md) for commit messages, staged reviews, and authorized local commits.
