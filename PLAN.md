# Plan

[English](PLAN.md) / [한국어](PLAN-ko.md)

| Decision | Initial choice |
| --- | --- |
| Maintenance | Version palettes, styles, recipes, and assets together in Git |
| Gallery | Generate English and Korean Markdown from the same catalog |
| Starter design | Use the profiles' shared red-bean accent `#680C2C`. Start with two palettes, two styles, and two original SVG samples |
| Implementation | Use Node.js 22 built-ins and run CI without an install step |
| Language | English primary documentation with Korean translations. Use `README.md` for English and `README-ko.md` for Korean |

## Work sequence

- [x] Define the project goal and success criteria, and review public design systems.
- [x] Set up versioned palettes, styles, recipes, and samples, with a gallery build and check.
- [ ] Place the samples in an actual empty state and on a document or presentation cover. Review the background, accent prominence, and style.
- [ ] Generate three candidates per condition for the same subject and recipe. In the first experiment, vary the color instructions and use of a reference image one at a time. Record color, composition, style, and fit.
- [ ] Apply promising recipes to other subjects. Record four approved assets, two in-context placements, and two examples of reuse.
- [ ] If the manual workflow repeats, choose a generation tool and automate recipe input and result import.
- [ ] If browsing becomes difficult as the approved collection grows, add a static gallery with filters for use case, palette, style, and aspect ratio.

Run the first generation experiment manually. Set the tool, budget, and permitted use of reference images before running it. Record the date, conditions, and selection result.

Set up release automation and deployment once the publication scope and asset licenses are clear.
