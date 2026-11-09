---
name: git-commit-helper
description: Review staged changes, draft commit messages, and create authorized local commits for image-system using the project's gitmoji conventions. Use when asked to commit, draft commit messages, or review staged changes.
---

# Git Commit Helper

## Commit format

```text
<gitmoji> <type>(<domain>): <imperative title>

<optional body explaining why>
```

Use English for the message. Start the title with a lowercase letter and choose a domain such as `gallery`, `palette`, `brand`, or `skills/pilot-workflow`. For new skills use `feat`. For behavior corrections to skills use `fix`.

| Gitmoji | Type | Use |
| --- | --- | --- |
| 🎉 | `init` | Initial project snapshot |
| ✨ | `feat` | New capability |
| 🛠️ | `fix` | Functional configuration correction |
| 🐛 | `bug` | Bug fix |
| ♻️ | `refactor` | Internal restructuring |
| 🔧 | `chore` | Maintenance |
| 📄 | `docs` | Documentation |
| 📝 | `article` | Article or other written content |
| ✏️ | `typo` | Typo correction |
| 🎨 | `style` | Structure or formatting |
| ⚡ | `perf` | Performance |
| ✅ | `test` | Verification |
| 🔨 | `build` | Build or development scripts |
| ⬆️ | `dep` | Dependency upgrade |
| 🔐 | `security` | Security change |
| 🗑️ | `remove` | Removal or deprecation |
| 🚀 | `release` | Release |
| 🤖 | `ci` | Automated bot commit, such as a Dependabot update |

Example

```text
✨ feat(gallery): group approved images by use case
```

## Workflow

1. Read the repository status, staged diff, and recent history. Scope the commit to the user's request. Keep related catalog, image, and generated gallery changes together. Preserve unrelated staged and unstaged work.
2. Review file paths before staging. Keep credentials, private references, raw batches, local paths, and session metadata out of committed content and messages.
3. Run the checks appropriate to the change. For gallery changes run `node scripts/gallery.mjs check` from the repository root.
4. When authorized to commit, stage explicit paths or hunks, review the staged diff, and run `git diff --cached --check` before committing. Verify the resulting hash, paths, and status. Keep push, release, and history rewriting separate from local commit authorization.
