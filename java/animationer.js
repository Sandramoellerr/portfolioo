// ==========================================================
// ANIMATIONER.JS – scroll-animationer (bruges på alle sider)
// 1. Statuslinje øverst, der viser hvor langt man har scrollet
// 2. Indhold toner blidt frem, når man scroller ned til det
// CSS'en står i generel.css under "9. ANIMATIONER".
// Hvis brugeren har slået animationer fra på sin enhed, sker der ingenting.
// ==========================================================

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  // ---------- 1. STATUSLINJE ----------
  const statuslinje = document.createElement("div");
  statuslinje.className = "statuslinje";
  document.body.prepend(statuslinje);

  function opdaterStatuslinje() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    statuslinje.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
  }

  window.addEventListener("scroll", opdaterStatuslinje, { passive: true });
  window.addEventListener("resize", opdaterStatuslinje);
  opdaterStatuslinje();

  // ---------- 2. INDHOLD TONER FREM ----------
  // de ting der animeres – så skal man ikke sætte klasser på i HTML'en
  const udvalg =
    "main h1, main h2, main h3, main h4, main p, main img, main figure, main li, " +
    "main .streg, main blockquote, main [data-glid], footer .footer-kontakt";

  // her animeres der ikke: hero'en og magasinets første opslag har deres egen animation,
  // og rullebåndene kører allerede
  const springOver = ".hero, .scroll-content, .image-track, .spread:first-of-type, dialog, nav";

  const alle = [...document.querySelectorAll(udvalg)].filter((el) => !el.closest(springOver));
  // et element inde i et andet, der allerede animeres (fx et billede i en figure), springes over
  const elementer = alle.filter((el) => !alle.some((andet) => andet !== el && andet.contains(el)));

  // elementer der er skjult lige nu (fx kun vises på mobil) animeres ikke,
  // så de ikke bliver usynlige, når de senere bliver vist
  let venter = elementer.filter((el) => el.getClientRects().length > 0);

  // startpositionen sættes uden overgang, så elementerne ikke først toner ud
  venter.forEach((el) => {
    el.style.transition = "none";
    el.classList.add("reveal");
    if (el.matches("img, figure")) el.classList.add("reveal-billede");
  });
  document.body.offsetHeight; // får browseren til at tegne startpositionen nu
  venter.forEach((el) => (el.style.transition = ""));

  // viser alt, der er nået op i skærmen – også det man er scrollet hurtigt forbi
  function tjek() {
    const graense = window.innerHeight * 0.92;
    const klar = venter.filter((el) => el.getBoundingClientRect().top < graense);
    if (klar.length === 0) return;
    venter = venter.filter((el) => !klar.includes(el));

    // det der dukker op samtidig, kommer frem lidt efter hinanden
    klar.forEach((el, i) => {
      const forsinkelse = Math.min(i, 5) * 90;
      el.style.transitionDelay = `${forsinkelse}ms`;
      el.classList.add("vist");

      // bagefter fjernes klasserne igen, så elementets egne hover-effekter virker som før
      setTimeout(() => {
        el.classList.remove("reveal", "reveal-billede", "vist");
        el.style.transitionDelay = "";
      }, forsinkelse + 1500);
    });
  }

  window.addEventListener("scroll", tjek, { passive: true });
  window.addEventListener("resize", tjek);
  // lidt forsinket, så browseren når at tegne startpositionen og animationen kan ses
  setTimeout(tjek, 60);
}
