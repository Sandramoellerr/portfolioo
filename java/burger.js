const burger = document.querySelector(".burger");
const nav = document.querySelector("nav");

burger.addEventListener("click", () => {
  burger.classList.toggle("active");
  nav.classList.toggle("active");
});

// dropdown under "Karrierer & Erfaring"
const dropdown = document.querySelector(".dropdown");
const dropdownToggle = document.querySelector(".dropdown-toggle");

function setDropdown(open) {
  dropdown.classList.toggle("open", open);
  dropdownToggle.setAttribute("aria-expanded", open);
}

dropdownToggle.addEventListener("click", () => {
  setDropdown(!dropdown.classList.contains("open"));
});

// lukker menuen ved klik udenfor eller på Escape
document.addEventListener("click", (e) => {
  if (!dropdown.contains(e.target)) setDropdown(false);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") setDropdown(false);
});
