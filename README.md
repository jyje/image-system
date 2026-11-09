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

## Static gallery preview

Run `node scripts/gallery.mjs site` to build the English and Korean pages from the same catalog. Open `dist/gallery/index.html` for English or `dist/gallery/ko/index.html` for Korean. To preview language navigation locally, serve `dist/gallery/` over HTTP. When an image has multiple files, choose a format or size from its menu. **Copy URL** copies the selected file's `raw.githubusercontent.com` URL.

GitHub Pages serves the generated files from the root of `gh-pages`. Build with `IMAGE_SYSTEM_RAW_REF=$(git rev-parse HEAD) node scripts/gallery.mjs site` from an already pushed source commit so the published Raw URLs point to that exact snapshot. Publish only the contents of `dist/gallery/` to `gh-pages`.

The responsive grid is adapted from [Through The Lens](https://github.com/Vojislav77/gallery-website). Its MIT notice is in [LICENSE.template](site/LICENSE.template).

- [GOAL.md](GOAL.md) defines the project and its success criteria.
- [PLAN.md](PLAN.md) tracks the path from the starter gallery to a generation pilot.
- [docs/](docs/README.md) covers curation, review, and reference projects.
- [catalog/catalog.json](catalog/catalog.json) is the source of truth for the gallery.
