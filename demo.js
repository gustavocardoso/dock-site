const demo = document.querySelector(".demo");
const themes = demo.querySelector(".themes");
const description = demo.querySelector(".theme-description");
const captions = {
  graphite: "Graphite — Dark and translucent.",
  nocturne: "Nocturne — Deep violet with a defined edge.",
  lagoon: "Lagoon — Deep teal with a soft sheen.",
  porcelain: "Porcelain — A light bar with dark widgets.",
  orbit: "Orbit — Floating icons and widgets, no bar behind them.",
};

function updateTheme() {
  const selected = themes.querySelector(":checked").value;
  demo.dataset.theme = selected;
  description.textContent = captions[selected];
}

themes.addEventListener("change", updateTheme);
window.addEventListener("pageshow", updateTheme);
updateTheme();
themes.hidden = false;

const strip = demo.querySelector(".apps");
const apps = Array.from(strip.children);
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

strip.addEventListener("pointermove", (event) => {
  if (event.pointerType === "touch" || reducedMotion.matches) return;

  const { left, width } = strip.getBoundingClientRect();
  const gap = parseFloat(getComputedStyle(strip).columnGap);
  const iconWidth = (width - gap * (apps.length - 1)) / apps.length;
  apps.forEach((app, index) => {
    const center = left + index * (iconWidth + gap) + iconWidth / 2;
    const distance = Math.abs(event.clientX - center) / iconWidth;
    const scale = 1 + 0.43 * Math.exp(-2.2 * distance ** 2);
    app.style.setProperty("--scale", scale.toFixed(3));
  });
});

function resetMagnification() {
  apps.forEach((app) => app.style.removeProperty("--scale"));
}

strip.addEventListener("pointerleave", resetMagnification);
strip.addEventListener("pointercancel", resetMagnification);
reducedMotion.addEventListener("change", resetMagnification);
