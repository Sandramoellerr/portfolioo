// ==========================================================
// LAES-MERE.JS – "Læs mere"-knappen (bruges på karriere-siden, kun mobil)
// Knappen viser/skjuler den lange tekst. CSS'en står i karrirer-erfarring.css.
// ==========================================================

// finder alle "Læs mere"-knapper på siden (så den kan genbruges flere steder)
document.querySelectorAll(".laes-mere-knap").forEach(function (knap) {
  // aria-controls i HTML'en fortæller hvilken tekst knappen hører til
  const indhold = document.getElementById(knap.getAttribute("aria-controls"));

  knap.addEventListener("click", function () {
    // klassen "aaben" viser teksten (se CSS'en)
    const aaben = indhold.classList.toggle("aaben");
    knap.setAttribute("aria-expanded", aaben);
    knap.textContent = aaben ? "Læs mindre" : "Læs mere";
  });
});
