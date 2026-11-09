<div align="center">

# jyje/image-system

<img src="assets/brand/jyje.svg" width="112" height="112" alt="jyje logo">

A reusable image library and generation workflow for a personal design system.

[English](README.md) / [한국어](README-ko.md) / [Gallery](gallery/README.md) / [Docs](docs/README.md)

</div>

Use this repository to make and reuse images for jyje's own projects. Look in the gallery first. Use the image file directly if it fits, or adapt its palette, style, and recipe when you need a new image.

The default accent is the red-bean tone `#680C2C` shared by `jyje/profile` and `jyje/profile-2`.

## Quick start

Browse the [gallery](gallery/README.md) on GitHub or in a Markdown preview. It includes two original SVG specimens for comparing candidate directions. The gallery separates specimens from approved assets.

Use Node.js 22 to rebuild and check the gallery. These commands use only Node.js built-ins.

```sh
node scripts/gallery.mjs build
node scripts/gallery.mjs check
```

- [GOAL.md](GOAL.md) defines the project and its success criteria.
- [PLAN.md](PLAN.md) tracks the path from the starter gallery to a generation pilot.
- [docs/](docs/README.md) covers curation, review, and reference projects.
- [catalog/catalog.json](catalog/catalog.json) is the source of truth for the gallery.
