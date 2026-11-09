function updateSelection(select) {
  const option = select.selectedOptions[0];
  const asset = select.closest("[data-asset]");
  const preview = asset.querySelector("[data-preview]");
  const image = preview.querySelector("img");
  const actions = select.closest(".actions");

  preview.href = option.value;
  if (image) image.src = option.value;
  for (const step of asset.querySelectorAll("[data-logo-size]")) {
    step.setAttribute("aria-current", String(step.getAttribute("href") === option.value));
  }
  actions.querySelector("button").dataset.copy = option.dataset.raw;
  actions.querySelector("input").hidden = true;
  actions.querySelector('[role="status"]').textContent = "";
}

for (const select of document.querySelectorAll(".actions select")) {
  select.addEventListener("change", () => updateSelection(select));
  updateSelection(select);
}

for (const step of document.querySelectorAll("[data-logo-size]")) {
  step.addEventListener("click", (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const select = step.closest("[data-asset]").querySelector("select");
    select.value = step.getAttribute("href");
    updateSelection(select);
  });
}

document.addEventListener("click", async (event) => {
  const button = event.target.closest("button[data-copy]");
  if (!button) return;

  const actions = button.closest(".actions");
  const url = button.dataset.copy;
  const fallback = actions.querySelector("input");
  const status = actions.querySelector('[role="status"]');

  try {
    await navigator.clipboard.writeText(url);
    if (button.dataset.copy !== url) return;
    fallback.hidden = true;
    status.textContent = button.dataset.copied;
  } catch {
    if (button.dataset.copy !== url) return;
    fallback.value = url;
    fallback.hidden = false;
    fallback.select();
    status.textContent = button.dataset.manual;
  }
});
