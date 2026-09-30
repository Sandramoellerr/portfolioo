// ==========================================================
// LIGHTBOX.JS – åbner billederne i fuld størrelse (bruges på fotografi-siden)
// Man kan klikke på et billede, bladre med pilene og lukke igen.
// CSS'en står i fotografi.css under "9. LIGHTBOX".
// ==========================================================

const dialog = document.querySelector(".lightbox"); // <dialog> nederst i fotografi.html
const bigImg = dialog.querySelector("img"); // det store billede inde i lightboxen
const photos = [...document.querySelectorAll(".photo")]; // alle billeder i magasinet
let current = 0; // nummeret på det billede der vises lige nu

// viser billede nr. i – og starter forfra når man når enden
function show(i) {
  current = (i + photos.length) % photos.length;
  const img = photos[current].querySelector("img");
  bigImg.src = img.src;
  bigImg.alt = img.alt;
  if (!dialog.open) dialog.showModal();
}

// klik på et billede (eller Enter/mellemrum med tastaturet) åbner det
photos.forEach((fig, i) => {
  fig.addEventListener("click", () => show(i));
  fig.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      show(i);
    }
  });
});

// knapperne "forrige" og "næste" har data-step="-1" eller data-step="1"
dialog.querySelectorAll("[data-step]").forEach((knap) =>
  knap.addEventListener("click", () => show(current + Number(knap.dataset.step)))
);

// luk-knappen
dialog.querySelector("[data-close]").addEventListener("click", () => dialog.close());

// klik på den mørke baggrund lukker også
dialog.addEventListener("click", (e) => {
  if (e.target === dialog) dialog.close();
});

// pil-tasterne bladrer
dialog.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") show(current + 1);
  if (e.key === "ArrowLeft") show(current - 1);
});
