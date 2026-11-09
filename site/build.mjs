import assert from "node:assert/strict";
import { copyFileSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { assetFiles } from "../scripts/asset-files.mjs";

const dist = fileURLToPath(new URL("../dist/", import.meta.url));
const template = new URL("gallery.html", import.meta.url);
const brandDirectory = new URL("../assets/brand/", import.meta.url);
const logoFilename = /^jyje-([1-9]\d*)x([1-9]\d*)\.png$/;

const copy = {
  en: {
    title: "Image System",
    description: "A collection of illustrations and brand assets.",
    languages: "Languages",
    brandLabel: "Brand",
    brandTitle: "jyje logo",
    logoPreviews: "PNG size previews",
    openFile: "Open file",
    filePicker: "Image format and size",
    approved: "Approved images",
    sample: "Comparison samples",
    sampleNote: "These images are for style comparison.",
    empty: "No images are available yet.",
    copyButton: "Copy URL",
    copied: "Raw URL copied.",
    manual: "Copy the selected URL.",
    templateCredit: "Gallery template",
  },
  ko: {
    title: "Image System",
    description: "일러스트레이션과 브랜드 이미지 모음입니다.",
    languages: "언어",
    brandLabel: "브랜드",
    brandTitle: "jyje 로고",
    logoPreviews: "PNG 크기별 미리보기",
    openFile: "파일 열기",
    filePicker: "이미지 형식과 크기",
    approved: "승인 이미지",
    sample: "비교용 샘플",
    sampleNote: "스타일을 비교하기 위한 이미지입니다.",
    empty: "표시할 이미지가 아직 없습니다.",
    copyButton: "URL 복사",
    copied: "Raw URL을 복사했습니다.",
    manual: "선택된 URL을 복사하세요.",
    templateCredit: "갤러리 템플릿",
  },
};

function escapeHtml(value) {
  const entities = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" };
  return value.replace(/[&<>"]/g, (character) => entities[character]);
}

function findLogoSizes() {
  const logos = [];
  for (const entry of readdirSync(brandDirectory, { withFileTypes: true })) {
    const match = logoFilename.exec(entry.name);
    if (!entry.isFile() || !match) continue;

    const width = Number(match[1]);
    const height = Number(match[2]);
    const png = readFileSync(new URL(entry.name, brandDirectory));
    assert(
      png.length >= 24 && png.subarray(0, 8).toString("hex") === "89504e470d0a1a0a"
        && png.toString("ascii", 12, 16) === "IHDR"
        && png.readUInt32BE(16) === width && png.readUInt32BE(20) === height,
      `${entry.name}: PNG dimensions must match its filename`,
    );
    logos.push({ file: entry.name, width, height });
  }
  return logos.sort((a, b) => a.width - b.width || a.height - b.height);
}

function renderActions(rawBase, directory, files, labels) {
  const rawUrl = (file) => new URL(file, new URL(directory, rawBase)).href;
  const id = `${files[0]}-file`;
  const groups = Map.groupBy(files, (file) => extname(file).slice(1).toUpperCase());
  const options = [...groups].map(([format, variants]) => `<optgroup label="${format}">
        ${variants.map((file) => `<option value="assets/${file}" data-raw="${rawUrl(file)}">${file}</option>`).join("\n        ")}
      </optgroup>`).join("\n      ");
  const picker = files.length === 1
    ? `<code id="${id}">${files[0]}</code>`
    : `<select id="${id}" aria-label="${labels.filePicker}">
      ${options}
    </select>`;
  return `<div class="actions">
    ${picker}
    <button type="button" aria-describedby="${id}" data-copy="${rawUrl(files[0])}" data-copied="${labels.copied}" data-manual="${labels.manual}">${labels.copyButton}</button>
    <input type="url" aria-label="GitHub Raw URL" readonly hidden>
    <span class="copy-status" role="status"></span>
  </div>`;
}

function renderCard(asset, catalog, language, labels, rawBase) {
  const recipe = catalog.recipes[asset.recipe];
  const [width, height] = recipe.size;
  const metadata = [catalog.palettes[recipe.palette].name, catalog.styles[recipe.style].name, `${width} × ${height}`];
  return `<article class="photo-card" data-asset>
    <a class="photo-wrapper" href="assets/${asset.file}" data-preview>
      <img class="photo-img" src="assets/${asset.file}" width="${width}" height="${height}" alt="${escapeHtml(asset.alt[language])}" loading="lazy">
    </a>
    <div class="photo-caption">
      <p class="index-label">${escapeHtml(catalog.useCases[recipe.useCase][language])}</p>
      <h3>${escapeHtml(asset.title)}</h3>
      <p class="metadata">${escapeHtml(metadata.join(" · "))}</p>
      ${renderActions(rawBase, "gallery/assets/", assetFiles(asset), labels)}
    </div>
  </article>`;
}

function renderPage(markup, catalog, visible, logoSizes, language, labels, rawBase) {
  const sections = [];
  for (const status of ["approved", "sample"]) {
    const assets = visible.filter((asset) => asset.status === status);
    if (!assets.length) continue;
    sections.push(`<section class="collection" aria-labelledby="${status}-heading">
      <div class="section-heading">
        <h2 id="${status}-heading">${labels[status]}</h2>
        ${status === "sample" ? `<p>${labels.sampleNote}</p>` : ""}
      </div>
      <div class="gallery-grid">
        ${assets.map((asset) => renderCard(asset, catalog, language, labels, rawBase)).join("\n        ")}
      </div>
    </section>`);
  }

  const logoSteps = logoSizes.map(({ file, width, height }) => {
    const size = width === height ? `${width} px` : `${width} × ${height} px`;
    return `<li><a href="assets/${file}" data-logo-size>
          <img src="assets/${file}" width="${width}" height="${height}" alt="">
          <span>${size}</span>
        </a></li>`;
  });
  const values = {
    ...labels,
    language,
    home: language === "en" ? "index.html" : "ko.html",
    englishCurrent: language === "en" ? ' aria-current="page"' : "",
    koreanCurrent: language === "ko" ? ' aria-current="page"' : "",
    collection: sections.join("\n    ") || `<p>${labels.empty}</p>`,
    logoSteps: logoSteps.length
      ? `<ul class="logo-steps" aria-label="${labels.logoPreviews}">\n        ${logoSteps.join("\n        ")}\n      </ul>`
      : "",
    brandActions: renderActions(rawBase, "assets/brand/", ["jyje.svg", ...logoSizes.map(({ file }) => file)], labels),
  };
  return markup.replace(/\{\{(\w+)\}\}/g, (_, key) => values[key]);
}

export function buildSite(catalog, assetsUrl) {
  const rawRef = process.env.IMAGE_SYSTEM_RAW_REF ?? "main";
  assert(rawRef === "main" || /^[a-f0-9]{40}$/.test(rawRef), "IMAGE_SYSTEM_RAW_REF must be main or a full Git commit SHA");
  const rawBase = `https://raw.githubusercontent.com/jyje/image-system/${rawRef}/`;
  const visible = Object.values(catalog.assets).filter((asset) => asset.status !== "archived");
  const markup = readFileSync(template, "utf8");
  const logoSizes = findLogoSizes();
  mkdirSync(dist, { recursive: true });
  const staging = mkdtempSync(join(dist, ".gallery-"));
  const output = join(dist, "gallery");

  try {
    const assets = join(staging, "assets");
    mkdirSync(assets);
    for (const file of ["jyje.svg", ...logoSizes.map((logo) => logo.file)]) {
      copyFileSync(new URL(file, brandDirectory), join(assets, file));
    }
    for (const file of visible.flatMap(assetFiles)) {
      copyFileSync(new URL(file, assetsUrl), join(assets, file));
    }
    for (const file of ["gallery.css", "gallery.js", "LICENSE.template"]) {
      copyFileSync(new URL(file, import.meta.url), join(staging, file));
    }
    for (const [language, file] of [["en", "index.html"], ["ko", "ko.html"]]) {
      writeFileSync(join(staging, file), renderPage(markup, catalog, visible, logoSizes, language, copy[language], rawBase));
    }
    writeFileSync(join(staging, ".nojekyll"), "");

    rmSync(output, { recursive: true, force: true });
    renameSync(staging, output);
  } finally {
    rmSync(staging, { recursive: true, force: true });
  }

  console.log("Built dist/gallery/index.html and dist/gallery/ko.html.");
}
