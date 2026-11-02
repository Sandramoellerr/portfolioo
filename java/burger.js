// ==========================================================
// BURGER.JS – menuen (bruges på alle sider)
// 1. Burgermenuen på mobil
// 2. Dropdown under "Karriere & erfaring"
// ==========================================================

// ---------- 1. BURGERMENU ----------
// Når man trykker på burgeren, får både burgeren og nav'en klassen "active".
// CSS'en (generel.css) viser så menuen og laver stregerne om til et kryds.
const burger = document.querySelector(".burger");
const nav = document.querySelector("nav");

burger.addEventListener("click", () => {
  burger.classList.toggle("active");
  nav.classList.toggle("active");
});

// ---------- 2. DROPDOWNS ("Karriere & erfaring" og "Multimediedesign studiet") ----------
const dropdowns = document.querySelectorAll(".dropdown");

// åbner eller lukker en undermenu (open = true/false)
// aria-expanded fortæller skærmlæsere om menuen er åben
function setDropdown(dropdown, open) {
  dropdown.classList.toggle("open", open);
  dropdown.querySelector(".dropdown-toggle").setAttribute("aria-expanded", open);
}

dropdowns.forEach((dropdown) => {
  // klik på knappen skifter mellem åben og lukket – og lukker de andre
  dropdown.querySelector(".dropdown-toggle").addEventListener("click", () => {
    const open = !dropdown.classList.contains("open");
    dropdowns.forEach((andre) => setDropdown(andre, false));
    setDropdown(dropdown, open);
  });
});

// lukker menuerne ved klik udenfor dem
document.addEventListener("click", (e) => {
  dropdowns.forEach((dropdown) => {
    if (!dropdown.contains(e.target)) setDropdown(dropdown, false);
  });
});

// lukker menuerne når man trykker på Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") dropdowns.forEach((dropdown) => setDropdown(dropdown, false));
});
