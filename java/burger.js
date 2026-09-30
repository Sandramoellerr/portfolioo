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

// ---------- 2. DROPDOWN under "Karriere & erfaring" ----------
const dropdown = document.querySelector(".dropdown");
const dropdownToggle = document.querySelector(".dropdown-toggle");

// åbner eller lukker undermenuen (open = true/false)
// aria-expanded fortæller skærmlæsere om menuen er åben
function setDropdown(open) {
  dropdown.classList.toggle("open", open);
  dropdownToggle.setAttribute("aria-expanded", open);
}

// klik på "Karriere & erfaring" skifter mellem åben og lukket
dropdownToggle.addEventListener("click", () => {
  setDropdown(!dropdown.classList.contains("open"));
});

// lukker menuen ved klik udenfor den
document.addEventListener("click", (e) => {
  if (!dropdown.contains(e.target)) setDropdown(false);
});

// lukker menuen når man trykker på Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") setDropdown(false);
});
