import assert from "node:assert/strict";
import { lstatSync, readFileSync, writeFileSync } from "node:fs";

const catalogUrl = new URL("../catalog/catalog.json", import.meta.url);
const galleryUrl = new URL("../gallery/README.md", import.meta.url);
const assetsUrl = new URL("./assets/", galleryUrl);
const versionedId = /^[a-z0-9]+(?:-[a-z0-9]+)*-v[1-9][0-9]*$/;

function requireText(value, label) {
  assert(
    typeof value === "string" && value.trim() && !/[\r\n]/.test(value),
    `${label} must be non-empty text on one line`,
  );
}

function entries(record, label) {
  assert(record && typeof record === "object" && !Array.isArray(record), `${label} must be an object`);
  return Object.entries(record);
}

function versionedEntries(record, label) {
  return entries(record, label).map(([id, value]) => {
    requireText(id, label);
    assert(versionedId.test(id), `${label}: invalid ID ${id}`);
    entries(value, id);
    return [id, value];
  });
}

function validate({ defaultPalette, useCases, palettes, styles, recipes, assets }) {
  for (const [id, name] of entries(useCases, "useCases")) {
    assert(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id) && !/\s/.test(id), `Invalid use case: ${id}`);
    requireText(name, id);
  }

  for (const [id, palette] of versionedEntries(palettes, "palettes")) {
    requireText(palette.name, `${id}.name`);
    const colors = entries(palette.colors, `${id}.colors`);
    assert(Object.hasOwn(palette.colors, "accent"), `${id} needs an accent color`);
    for (const [role, hex] of colors) {
      assert(/^[a-z]+(?:-[a-z]+)*$/.test(role) && !/\s/.test(role), `${id}: invalid role ${role}`);
      assert(typeof hex === "string" && /^#[\dA-Fa-f]{6}$/.test(hex) && hex.length === 7, `${id}: invalid color for ${role}`);
    }
  }
  assert(typeof defaultPalette === "string" && Object.hasOwn(palettes, defaultPalette), "Unknown default palette");

  for (const [id, style] of versionedEntries(styles, "styles")) {
    for (const field of ["name", "direction", "avoid"]) {
      requireText(style[field], `${id}.${field}`);
    }
  }

  for (const [id, recipe] of versionedEntries(recipes, "recipes")) {
    for (const [field, options] of Object.entries({ useCase: useCases, palette: palettes, style: styles })) {
      assert(typeof recipe[field] === "string" && Object.hasOwn(options, recipe[field]), `${id}: unknown ${field} ${recipe[field]}`);
    }
    assert(
      Array.isArray(recipe.size) && recipe.size.length === 2
        && recipe.size.every((dimension) => Number.isSafeInteger(dimension) && dimension > 0),
      `${id}: size must be [width, height] in positive pixels`,
    );
    requireText(recipe.composition, `${id}.composition`);
  }

  for (const [id, asset] of versionedEntries(assets, "assets")) {
    for (const field of ["title", "alt", "source", "rights"]) {
      requireText(asset[field], `${id}.${field}`);
    }
    assert(["sample", "approved", "archived"].includes(asset.status), `${id}: invalid status`);
    assert(typeof asset.recipe === "string" && Object.hasOwn(recipes, asset.recipe), `${id}: unknown recipe ${asset.recipe}`);
    assert(
      ["svg", "png", "jpg", "jpeg", "webp", "avif"].some((ext) => asset.file === `${id}.${ext}`),
      `${id}: file must be named after the asset ID with a supported image extension`,
    );
    const file = lstatSync(new URL(asset.file, assetsUrl), { throwIfNoEntry: false });
    assert(file?.isFile() && file.size > 0, `${id}: missing or empty asset ${asset.file}`);
  }
}

function escapeText(value) {
  return value.replace(/[&<>"'`*_[\]~\\]/g, (character) => `&#${character.codePointAt(0)};`);
}

function renderCard(asset, { recipes, palettes, styles }) {
  const recipe = recipes[asset.recipe];
  const palette = palettes[recipe.palette];
  const style = styles[recipe.style];
  const colors = Object.entries(palette.colors).map(([role, hex]) => `${role} \`${hex}\``);
  const file = `assets/${asset.file}`;

  return [
    `#### ${escapeText(asset.title)}`,
    `<img src="${file}" width="360" alt="${escapeText(asset.alt)}">`,
    [
      `- [이미지 파일](${file}) · ${recipe.size.join(" × ")} px`,
      `- 팔레트 ${escapeText(palette.name)} (\`${recipe.palette}\`) · ${colors.join(" · ")}`,
      `- 스타일 ${escapeText(style.name)} (\`${recipe.style}\`) · ${escapeText(style.direction)}`,
      `- 피할 표현 · ${escapeText(style.avoid)}`,
      `- 레시피 \`${asset.recipe}\` · ${escapeText(recipe.composition)}`,
      `- 제작 출처 · ${escapeText(asset.source)}`,
      `- 재사용 범위 · ${escapeText(asset.rights)}`,
    ].join("\n"),
  ].join("\n\n");
}

function render(catalog) {
  const palette = catalog.palettes[catalog.defaultPalette];
  const sections = [
    "# 이미지 갤러리",
    "<!-- Generated from catalog/catalog.json by scripts/gallery.mjs. -->",
    "[카탈로그](../catalog/catalog.json) · [등록과 검수](../docs/curation.md)",
    `기본 팔레트 ${escapeText(palette.name)} (\`${catalog.defaultPalette}\`) · 강조색 \`${palette.colors.accent}\``,
  ];
  for (const [status, title, empty] of [
    ["approved", "승인 자산", "승인된 이미지가 아직 없습니다."],
    ["sample", "비교용 샘플", "등록된 샘플이 아직 없습니다."],
  ]) {
    sections.push(`## ${title}`);
    const visible = Object.values(catalog.assets).filter((asset) => asset.status === status);
    if (visible.length === 0) {
      sections.push(empty);
    }
    for (const [id, name] of Object.entries(catalog.useCases)) {
      const matching = visible.filter((asset) => catalog.recipes[asset.recipe].useCase === id);
      if (matching.length === 0) continue;
      sections.push(`### ${escapeText(name)}`, ...matching.map((asset) => renderCard(asset, catalog)));
    }
  }
  return `${sections.join("\n\n")}\n`;
}

try {
  const [mode, ...extraArgs] = process.argv.slice(2);
  assert(["build", "check"].includes(mode) && extraArgs.length === 0, "Usage: node scripts/gallery.mjs <build|check>");
  const catalog = JSON.parse(readFileSync(catalogUrl, "utf8"));
  validate(catalog);
  const markdown = render(catalog);

  if (mode === "build") {
    writeFileSync(galleryUrl, markdown);
    console.log("Updated gallery/README.md.");
  } else {
    assert(
      readFileSync(galleryUrl, "utf8") === markdown,
      "Gallery is out of date. Run node scripts/gallery.mjs build.",
    );
    console.log(`Gallery check passed (${Object.keys(catalog.assets).length} assets).`);
  }
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
