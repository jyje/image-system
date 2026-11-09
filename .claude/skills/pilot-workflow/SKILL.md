---
name: pilot-workflow
description: Run the image-system curation pilot. Use when planning a new image use case, comparing generation candidates, or adding and reviewing reusable gallery assets.
---

# Image-system pilot workflow

1. Read `GOAL.md` and `PLAN.md` at the repository root. Turn the current goal into an image brief with a use case, target size, composition, and space for surrounding text. Read `docs/curation.md` for approval criteria.
2. Look for an existing asset or recipe in `gallery/README.md` and `catalog/catalog.json`. For a new recipe, start with the catalog's `defaultPalette` unless the target context calls for another palette. Pin the selected palette, style, and recipe IDs. Preserve existing IDs when adding a revision.
3. For a generation experiment, record the model, prompt, reference and its permitted use, and any settings the tool exposes. Compare candidates by changing one condition at a time. Keep private references and raw candidates under `temp/`. Confirm scope and any cost before running a paid tool.
4. Review the actual placement, color roles, crop, contrast, and alt text. Put reviewed files in `gallery/assets/` and record their recipe, source, and reuse terms in `catalog/catalog.json`. Use `sample` for comparison assets, `approved` after review, and `archived` for assets removed from the active gallery.
5. From the repository root, rebuild the gallery and run its offline check.

   ```sh
   node scripts/gallery.mjs build
   node scripts/gallery.mjs check
   ```

6. Record the result in `PLAN.md` or the experiment notes. Mark only completed work. Cite asset or recipe IDs in the notes for downstream reuse. Report which comparisons were run and which approvals are still pending.
