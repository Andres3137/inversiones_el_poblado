/* ============================================================
   I18N.JS — única fuente de verdad de idioma y moneda.
   Se carga ANTES que main.js / project.js en las 5 páginas.

   Antes había dos sistemas paralelos (el diccionario de main.js y
   el de project.js) que repetían nav/footer/formulario y podían
   divergir. Ahora el estado y el chrome común viven aquí; cada
   página solo añade su vocabulario con EP_I18N.register().

   Estado: localStorage (ep-lang · ep-cur). Se re-aplica al volver
   con el botón atrás (bfcache) y se sincroniza entre pestañas.
   ============================================================ */
(() => {
  "use strict";

  const KEY_LANG = "ep-lang", KEY_CUR = "ep-cur";
  const RATE = 4200;                       // COP por USD (demo)

  /* localStorage puede lanzar (modo privado, file://, cookies bloqueadas).
     Si falla, la web sigue funcionando: solo se pierde la persistencia. */
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* sin persistencia */ } },
  };

  /* ---- Chrome común a TODAS las páginas ---- */
  const SHARED = {
    es: {
      "skip": "Saltar al contenido",
      "nav.home": "Inicio", "nav.territory": "Territorio", "nav.projects": "Proyectos",
      "nav.about": "Nosotros", "nav.contact": "Contacto", "nav.sim": "Simulador",
      "form.name": "Nombre", "form.name.ph": "Tu nombre",
      "form.contact": "Correo o teléfono", "form.contact.ph": "Cómo te contactamos",
      "form.project": "Proyecto de interés", "form.all": "Todo el portafolio",
      "cta.submit": "Solicitar información", "cta.note": "Respondemos con discreción · Sin compromiso",
      "footer.tagline": "Inversión en tierra en el Llano. Parcelaciones campestres en Acacías y Villavicencio.",
      "footer.explore": "Explorar", "footer.finance": "Financiación",
      "footer.copy": "© 2026 Inversiones El Poblado · Meta, Colombia",
      "footer.legal": "Registro y aliado financiero · pendiente",
      "state.dev": "En desarrollo", "state.soon": "Próximamente", "common.study": "En estudio",
    },
    en: {
      "skip": "Skip to content",
      "nav.home": "Home", "nav.territory": "Territory", "nav.projects": "Projects",
      "nav.about": "About us", "nav.contact": "Contact", "nav.sim": "Simulator",
      "form.name": "Name", "form.name.ph": "Your name",
      "form.contact": "Email or phone", "form.contact.ph": "How we reach you",
      "form.project": "Project of interest", "form.all": "The whole portfolio",
      "cta.submit": "Request information", "cta.note": "We reply discreetly · No commitment",
      "footer.tagline": "Land investment in the Llano. Countryside land plots in Acacías and Villavicencio.",
      "footer.explore": "Explore", "footer.finance": "Financing",
      "footer.copy": "© 2026 Inversiones El Poblado · Meta, Colombia",
      "footer.legal": "Registration and financial partner · pending",
      "state.dev": "In development", "state.soon": "Coming soon", "common.study": "Under study",
    },
  };

  /* Vocabulario que añaden las páginas. Se aplica por orden de registro:
     SHARED < chrome de proyecto < diccionario de la página. */
  const extra = { es: {}, en: {} };
  const dict = (l) => Object.assign({}, SHARED[l] || SHARED.es, extra[l] || {});

  const norm = (v, ok, def) => (ok.includes(v) ? v : def);
  let lang = norm(store.get(KEY_LANG), ["es", "en"], "es");
  let cur = norm(store.get(KEY_CUR), ["cop", "usd"], "cop");

  const fmt = (cop) => {
    const v = cur === "usd" ? Math.round(cop / RATE) : Math.round(cop);
    return "$" + v.toLocaleString(cur === "usd" ? "en-US" : "es-CO");
  };

  const applyLang = () => {
    const d = dict(lang);
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const v = d[el.getAttribute("data-i18n")];
      if (v != null) el.innerHTML = v;
    });
    document.querySelectorAll("[data-i18n-ph]").forEach((el) => {
      const v = d[el.getAttribute("data-i18n-ph")];
      if (v != null) el.setAttribute("placeholder", v);
    });
    document.documentElement.setAttribute("lang", lang);
    document.querySelectorAll("[data-lang-label]").forEach((el) => {
      el.textContent = lang === "en" ? "English" : "Español";
    });
    document.dispatchEvent(new CustomEvent("ep:lang", { detail: lang }));
  };

  const applyCur = () => {
    document.querySelectorAll("[data-cop]").forEach((el) => {
      el.textContent = fmt(parseFloat(el.dataset.cop) || 0);
    });
    document.querySelectorAll("[data-cur-unit]").forEach((el) => {
      el.textContent = cur === "usd" ? "USD" : "COP";
    });
    document.querySelectorAll("[data-currency-toggle]").forEach((b) => {
      b.innerHTML = cur === "usd"
        ? 'COP<span aria-hidden="true"> / </span><b>USD</b>'
        : '<b>COP</b><span aria-hidden="true"> / </span>USD';
    });
    document.dispatchEvent(new CustomEvent("ep:cur", { detail: cur }));
  };

  const render = () => { applyLang(); applyCur(); };

  /* Cambio con fundido corto (lo pinta base.css con html[data-switching]) */
  const swap = (fn) => {
    const root = document.documentElement;
    root.setAttribute("data-switching", "");
    fn();
    setTimeout(() => root.removeAttribute("data-switching"), 200);
  };

  const setLang = (v) => { lang = v; store.set(KEY_LANG, v); swap(applyLang); };
  const setCur = (v) => { cur = v; store.set(KEY_CUR, v); swap(applyCur); };

  /* Delegación: da igual cuántos toggles haya (navbar + menú móvil) ni
     cuándo aparezcan; también sobrevive a que se reescriba su innerHTML. */
  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-lang-toggle]")) setLang(lang === "es" ? "en" : "es");
    else if (e.target.closest("[data-currency-toggle]")) setCur(cur === "cop" ? "usd" : "cop");
  });

  /* Volver con el botón atrás restaura la página desde bfcache SIN re-ejecutar
     el JS: si el idioma cambió en otra página, hay que re-aplicarlo aquí. */
  window.addEventListener("pageshow", (e) => {
    if (!e.persisted) return;
    const l = norm(store.get(KEY_LANG), ["es", "en"], "es");
    const c = norm(store.get(KEY_CUR), ["cop", "usd"], "cop");
    if (l === lang && c === cur) return;
    lang = l; cur = c; render();
  });

  /* Otra pestaña cambió la preferencia */
  window.addEventListener("storage", (e) => {
    if (e.key === KEY_LANG) { lang = norm(e.newValue, ["es", "en"], "es"); applyLang(); }
    else if (e.key === KEY_CUR) { cur = norm(e.newValue, ["cop", "usd"], "cop"); applyCur(); }
  });

  window.EP_I18N = {
    RATE,
    get lang() { return lang; },
    get cur() { return cur; },
    t: (key) => dict(lang)[key],
    format: fmt,
    /* Añade vocabulario y repinta. Lo llaman main.js, project.js y las páginas. */
    register(d) {
      if (!d) return;
      Object.assign(extra.es, d.es || {});
      Object.assign(extra.en, d.en || {});
      applyLang();
    },
  };

  render();
})();
