---
name: centered-readme
description: Create or restyle the centered header of the image-system README in English and Korean. Use when changing the project title, logo, tagline, badges, or language navigation.
---

# Centered README

Keep the centered header in `README.md` and `README-ko.md` in sync. Use the same project title, logo, dimensions, badges, and destination links. Localize the tagline, logo alt text, and navigation labels.

```markdown
<div align="center">

# jyje/image-system

<img src="assets/brand/jyje.svg" width="112" height="112" alt="jyje logo">

A reusable image library and generation workflow for a personal design system.

[English](README.md) / [한국어](README-ko.md) / [Gallery](gallery/README.md) / [Docs](docs/README.md)

</div>
```

- Use the repository's original SVG and a relative path so the logo resolves from either README.
- Add a badge only when its workflow, license, or registry entry exists.
- Leave the body below the header left-aligned. Update both README files if the setup commands change.
- Verify local paths and preview the header in Markdown when the change affects layout.
