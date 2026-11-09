# Plan

[English](PLAN.md) / [한국어](PLAN-ko.md)

| Decision | Initial choice |
| --- | --- |
| Maintenance | Version palettes, styles, recipes, and assets together in Git |
| Gallery | Generate English and Korean Markdown from the same catalog |
| Reuse | Keep approved files and previews together. Refer to the file directly or copy it into the project that needs it |
| Starter design | Use the profiles' shared red-bean accent `#680C2C`. Start with two palettes, two styles, and two original SVG samples |
| Implementation | Use Node.js 22 built-ins and run CI without an install step |
| Language | English primary documentation with Korean translations. Use `README.md` for English and `README-ko.md` for Korean |

## Work sequence

- [x] Define the project goal and success criteria, and review public design systems.
- [x] Set up versioned palettes, styles, recipes, and samples, with a gallery build and check.
- [ ] Pick the next real image needed by one of jyje's projects. Search the existing samples and recipes first.
- [ ] Make a candidate if needed, check its placement, and register the approved file and recipe. If comparing candidates helps, vary one condition at a time.
- [ ] In a later task, reuse the file or adapt the recipe. Record the asset or recipe ID and where it was used.

Start with manual generation and the Markdown gallery. Add a script or search feature when a repeated task in this workflow calls for it.
