/* ============================================================
   NAV.JS — menú fullscreen móvil. Compartido por la landing y
   las páginas de proyecto (una sola fuente).
   El panel es translúcido con blur: el video sigue vivo detrás.
   Solo alterna un atributo en <html>; toda la transición es CSS
   (opacity/transform), nada costoso.
   ============================================================ */
(() => {
  "use strict";
  const root = document.documentElement;
  const burger = document.querySelector("[data-nav-toggle]");
  const menu = document.querySelector("[data-menu]");
  if (!burger || !menu) return;

  const links = [...menu.querySelectorAll(".ep-menu__link, .ep-menu__cta")];
  let lastFocus = null;

  const isOpen = () => root.hasAttribute("data-menu-open");

  const open = () => {
    lastFocus = document.activeElement;
    root.setAttribute("data-menu-open", "");
    document.body.style.overflow = "hidden";
    burger.setAttribute("aria-expanded", "true");
    burger.setAttribute("aria-label", "Cerrar menú");
    menu.setAttribute("aria-hidden", "false");
  };

  const close = () => {
    root.removeAttribute("data-menu-open");
    document.body.style.overflow = "";
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Abrir menú");
    menu.setAttribute("aria-hidden", "true");
  };

  burger.addEventListener("click", () => (isOpen() ? (close(), lastFocus?.focus?.()) : open()));

  // Navegar cierra el menú: la transición de salida y el scroll suave conviven
  links.forEach((l) => l.addEventListener("click", close));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen()) { close(); burger.focus(); }
  });

  // Si se cruza a escritorio con el menú abierto, no dejar el scroll bloqueado
  const wide = window.matchMedia("(min-width: 1024px)");
  const onWide = (e) => { if (e.matches && isOpen()) close(); };
  wide.addEventListener ? wide.addEventListener("change", onWide) : wide.addListener(onWide);
})();
