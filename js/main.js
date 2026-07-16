/* ============================================================
   Fase 1 — motion & comportamiento (vanilla, sin dependencias)
   Respeta prefers-reduced-motion.
   ============================================================ */
(() => {
  "use strict";
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const root = document.documentElement;

  /* --- Loader cinematográfico (curtain reveal) --- */
  const loader = document.querySelector("[data-loader]");
  if (loader) {
    if (reduce) {
      loader.remove();
      root.classList.add("ep-ready");
    } else {
      root.classList.add("ep-loading");
      const MIN = 1150; // nunca se siente lento, pero deja completar la línea
      const t0 = performance.now();
      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        const wait = Math.max(0, MIN - (performance.now() - t0));
        setTimeout(() => {
          loader.classList.add("is-done");     // cortina sube + marca asciende
          root.classList.add("ep-ready");        // página aparece
          setTimeout(() => root.classList.remove("ep-loading"), 80);
          setTimeout(() => loader.remove(), 900);
        }, wait);
      };
      if (document.readyState === "complete") finish();
      else window.addEventListener("load", finish, { once: true });
      // Salvaguarda: si load tarda, no bloquear más de 2.4s
      setTimeout(finish, 2400);
    }
  }

  /* --- Navbar: truncating al hacer scroll --- */
  const nav = document.querySelector("[data-nav]");
  if (nav) {
    const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* --- Reveal al entrar en viewport (una sola vez, con stagger) --- */
  const reveals = document.querySelectorAll(".ep-reveal, .ep-scene-in");
  if (reduce || !("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("is-in"));
  } else {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const delay = Number(el.dataset.delay || 0);
        setTimeout(() => el.classList.add("is-in"), delay);
        obs.unobserve(el);
      });
    }, { threshold: 0.18, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach((el) => io.observe(el));
  }

  /* --- Count-up de estadísticas (asciende al entrar) --- */
  const nums = document.querySelectorAll("[data-count]");
  const runCount = (el) => {
    const target = parseFloat(el.dataset.count);
    const dur = 1100, pad = el.dataset.pad === "true";
    if (reduce) { el.textContent = pad ? String(target).padStart(2, "0") : target; return; }
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);           // easeOutCubic (ascenso)
      const val = Math.round(target * eased);
      el.textContent = pad ? String(val).padStart(2, "0") : val;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if (nums.length) {
    const io2 = new IntersectionObserver((entries, obs) => {
      entries.forEach((e) => { if (e.isIntersecting) { runCount(e.target); obs.unobserve(e.target); } });
    }, { threshold: 0.6 });
    nums.forEach((n) => io2.observe(n));
  }

  /* --- Hero: reveal editorial escalonado (una vez, al cargar) --- */
  const heroRise = document.querySelectorAll(".ep-hero .ep-rise");
  if (heroRise.length) {
    if (reduce) {
      heroRise.forEach((el) => el.classList.add("is-in"));
    } else {
      // la lámina entra al final; el texto asciende línea a línea
      window.requestAnimationFrame(() => {
        heroRise.forEach((el, i) => {
          const isPlate = el.classList.contains("ep-hero__plate");
          const delay = isPlate ? 200 : 120 + i * 110;
          setTimeout(() => el.classList.add("is-in"), delay);
        });
      });
    }
  }

  /* --- Proyectos: índice interactivo con preview que cambia --- */
  const projList = document.querySelector("[data-projects]");
  const projPrev = document.querySelector("[data-preview]");
  if (projList && projPrev) {
    const pImg = projPrev.querySelector("[data-preview-img]");
    const pCap = projPrev.querySelector("[data-preview-cap]");
    const rows = [...projList.querySelectorAll(".ep-project")];
    // preload
    rows.forEach((r) => { const i = new Image(); i.src = r.dataset.img; });
    let current = null;
    const activate = (row) => {
      if (!row || row === current) return;
      current = row;
      rows.forEach((r) => r.classList.toggle("is-active", r === row));
      projPrev.classList.add("is-swapping");
      const swap = () => {
        pImg.src = row.dataset.img;
        pCap.innerHTML = row.dataset.name + " <b>· " + row.dataset.loc + "</b>";
        projPrev.classList.remove("is-swapping");
      };
      if (reduce) swap();
      else setTimeout(swap, 200);
    };
    rows.forEach((r) => {
      r.addEventListener("pointerenter", () => activate(r));
      r.addEventListener("focus", () => activate(r));
      r.addEventListener("click", () => activate(r));
    });
  }

  /* --- Hero: video de fondo (MP-01, temporal) ---
     Se activa solo sin prefers-reduced-motion. Cuando reproduce, se funde
     por encima de la fotografía (poster). Si autoplay falla, queda la foto.  */
  const heroVideo = document.querySelector("[data-hero-video]");
  if (heroVideo && !reduce) {
    const src = heroVideo.getAttribute("data-src");
    if (src) {
      const slow = parseFloat(heroVideo.dataset.slow || "1");
      heroVideo.querySelector("source")?.setAttribute("src", src);
      heroVideo.hidden = false;
      heroVideo.load();
      const setRate = () => { if (slow !== 1) heroVideo.playbackRate = slow; };
      heroVideo.addEventListener("loadedmetadata", setRate, { once: true });
      heroVideo.addEventListener("playing", () => heroVideo.classList.add("is-live"), { once: true });
      const tryPlay = () => heroVideo.play?.().then(setRate).catch(() => {});
      if (heroVideo.readyState >= 2) tryPlay();
      else heroVideo.addEventListener("canplay", tryPlay, { once: true });
    }
  }

  /* --- Parallax sutil: la imagen deriva mientras el contenido recorre.
     Solo en imágenes preparadas (sobredimensionadas), respeta reduced-motion. --- */
  const paras = document.querySelectorAll("[data-parallax]");
  if (!reduce && paras.length && "requestAnimationFrame" in window) {
    let ticking = false;
    const update = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      paras.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;   // fuera de vista: no calcular
        const center = r.top + r.height / 2;
        const p = Math.max(-1, Math.min(1, (center - vh / 2) / vh));
        const speed = parseFloat(el.dataset.speed || "1");
        el.style.transform = "translate3d(0," + (p * -34 * speed).toFixed(1) + "px,0)";
      });
      ticking = false;
    };
    const onScroll = () => { if (!ticking) { requestAnimationFrame(update); ticking = true; } };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();
  }

  /* --- Territorio: stack fotográfico vivo ---
     Con el progreso de scroll de la sección, cada foto asciende/desciende y
     cambia de escala a distinto ritmo. Muy sutil, nunca un carrusel.
     Solo desktop (>=960px) y sin prefers-reduced-motion.                    */
  const stackEl = document.querySelector("[data-terr-stack]");
  const wide = window.matchMedia("(min-width: 960px)");
  if (stackEl && !reduce && wide.matches) {
    const section = stackEl.closest(".ep-terr");
    const cards = [...stackEl.querySelectorAll(".ep-terr__card")].map((el) => ({
      el, ty: parseFloat(el.dataset.ty || "0"), sc: parseFloat(el.dataset.sc || "0"),
    }));
    let ticking = false;
    const update = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const rect = section.getBoundingClientRect();
      const dist = Math.max(section.offsetHeight - vh, 1);
      const p = Math.max(0, Math.min(1, -rect.top / dist));
      cards.forEach((c) => {
        c.el.style.transform =
          "translate3d(0," + (c.ty * p).toFixed(1) + "px,0) scale(" + (1 + c.sc * p).toFixed(3) + ")";
      });
      ticking = false;
    };
    const onScroll = () => { if (!ticking) { requestAnimationFrame(update); ticking = true; } };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();
  }

  /* --- Dropdown personalizado (reemplaza <select> nativo) --- */
  const selects = [...document.querySelectorAll("[data-select]")];
  selects.forEach((sel) => {
    const btn = sel.querySelector("[data-select-btn]");
    const list = sel.querySelector("[data-select-list]");
    const valEl = sel.querySelector("[data-select-value]");
    const input = sel.querySelector("[data-select-input]");
    const opts = [...sel.querySelectorAll(".ep-select__opt")];
    let activeIdx = Math.max(0, opts.findIndex((o) => o.classList.contains("is-selected")));
    const open = () => { sel.setAttribute("data-open", ""); btn.setAttribute("aria-expanded", "true"); setActive(activeIdx); };
    const close = () => { sel.removeAttribute("data-open"); btn.setAttribute("aria-expanded", "false"); };
    const setActive = (i) => { activeIdx = (i + opts.length) % opts.length; opts.forEach((o, k) => o.classList.toggle("is-active", k === activeIdx)); };
    const choose = (o) => {
      opts.forEach((x) => { x.classList.remove("is-selected"); x.setAttribute("aria-selected", "false"); });
      o.classList.add("is-selected"); o.setAttribute("aria-selected", "true");
      valEl.textContent = o.textContent.trim(); if (input) input.value = o.dataset.value || o.textContent.trim();
      close(); btn.focus();
    };
    btn.addEventListener("click", (e) => { e.stopPropagation(); sel.hasAttribute("data-open") ? close() : open(); });
    opts.forEach((o, i) => {
      o.addEventListener("click", () => choose(o));
      o.addEventListener("mousemove", () => setActive(i));
    });
    btn.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") { e.preventDefault(); if (!sel.hasAttribute("data-open")) open(); else setActive(activeIdx + (e.key === "ArrowDown" ? 1 : -1)); }
      else if (e.key === "Enter" || e.key === " ") { e.preventDefault(); sel.hasAttribute("data-open") ? choose(opts[activeIdx]) : open(); }
      else if (e.key === "Escape") close();
    });
    document.addEventListener("click", (e) => { if (!sel.contains(e.target)) close(); });
  });
  // Reaplica el texto visible del valor tras un cambio de idioma
  const syncSelects = () => selects.forEach((sel) => {
    const cur = sel.querySelector(".ep-select__opt.is-selected");
    const valEl = sel.querySelector("[data-select-value]");
    if (cur && valEl) valEl.textContent = cur.textContent.trim();
  });

  /* --- i18n (ES / EN) — sin recargar, recuerda elección --- */
  const I18N = {
    es: {
      "skip": "Saltar al contenido",
      "nav.home": "Inicio", "nav.territory": "Territorio", "nav.projects": "Proyectos", "nav.about": "Nosotros", "nav.contact": "Contacto", "nav.cta": "Solicitar información",
      "hero.mast": "Parcelaciones campestres en el Meta",
      "hero.title": "La tierra es la inversión<br />que <em>no deja de crecer.</em>",
      "hero.lead": "Parcelaciones campestres en Acacías y Villavicencio. Tu lote propio, en una zona que apenas comienza a valorizarse.",
      "hero.cta1": "Solicitar información", "hero.cta2": "Ver los proyectos",
      "terr.title": "La tierra del Llano, <em>vista de cerca.</em>",
      "terr.lead": "Un corredor de piedemonte entre Acacías y Villavicencio: agua, horizonte y suelo fértil. Lo recorremos lote a lote.",
      "terr.d1": "Proyectos en el corredor", "terr.d2": "Municipios con presencia", "terr.d3": "Valorización proyectada", "common.study": "En estudio",
      "terr.n1k": "Crecimiento del Meta", "terr.n1v": "Uno de los departamentos con mayor dinámica de desarrollo del país: obra vial, agroindustria y turismo en expansión.",
      "terr.n2k": "Cercanía a Villavicencio", "terr.n2v": "La capital del Llano a pocos minutos: servicios, comercio y salud al lado de la tranquilidad del campo.",
      "terr.n3k": "Acceso por vías principales", "terr.n3v": "Conexión directa al corredor Bogotá–Villavicencio–Acacías, la columna vertebral del piedemonte.",
      "terr.n4k": "Entrar temprano", "terr.n4v": "El mayor recorrido de valorización ocurre en las primeras etapas, cuando el precio aún es de tierra.",
      "terr.n5k": "Infraestructura instalada", "terr.n5v": "Vías internas, energía y redes que se ejecutan etapa por etapa. Obra real que sostiene el valor.",
      "terr.n6k": "Naturaleza y tranquilidad", "terr.n6v": "Horizonte abierto, agua y aire limpio. Un lugar para invertir y, con el tiempo, para habitar.",
      "origin.title": "Conocemos la tierra del Llano porque <em>es la nuestra.</em>",
      "origin.p1": "Inversiones El Poblado desarrolla parcelaciones campestres en Acacías y Villavicencio: lotes con vías, redes y energía, pensados para quien invierte temprano en una región que apenas empieza a valorizarse.",
      "origin.pk1": "Experiencia", "origin.pv1": "Un equipo local que vive y construye en el territorio, con años acompañando inversiones en el Meta.",
      "origin.pk2": "Acompañamiento", "origin.pv2": "Te guiamos de principio a fin: elección del lote, escrituración y proceso de inversión, sin letra pequeña.",
      "origin.pk3": "Infraestructura", "origin.pv3": "Vías internas, redes de energía y agua instaladas etapa por etapa. Obra real, verificable.",
      "origin.pk4": "Valorización", "origin.pv4": "Cercanía a Villavicencio y desarrollo vial en marcha: una zona con recorrido de plusvalía por delante.",
      "origin.mk1": "Región", "origin.mk2": "Proyectos", "origin.mk3": "Municipios",
      "port.title": "Cuatro proyectos. Una misma <em>tierra que crece.</em>",
      "port.note": "Cifras de referencia para visualizar el proyecto. Se sustituyen por los datos definitivos del cliente.",
      "serv.water": "Agua", "serv.power": "Energía", "serv.roads": "Vías internas", "serv.gas": "Gas natural", "serv.gate": "Portería", "serv.roadsWork": "Vías en obra", "serv.access": "Acceso", "serv.design": "En diseño",
      "spec.lots": "Lotes proyectados", "spec.area": "Área por lote", "spec.from": "Precio desde · demo", "spec.phase": "Fase actual", "spec.opening": "Apertura estimada",
      "val.appr": "Valorización +", "val.entry": "Precio de entrada", "val.list": "Lista privada",
      "state.dev": "En desarrollo", "state.soon": "Próximamente",
      "p1.loc": "Acacías · Proyecto principal", "p1.desc": "La parcelación insignia. Lotes con vías, redes y energía instaladas, casas ya construidas y una comunidad que empieza a habitar la tierra.", "p1.valt": "Zona en consolidación, con vías y servicios ya instalados. Proyección de ejemplo.", "p1.cta": "Explorar Villas del Poblado",
      "p2.desc": "Naturaleza abierta a minutos de la ciudad. Un entorno de potreros, agua y horizonte para quien busca campo con plusvalía urbana cercana.", "p2.valt": "Cercanía a Villavicencio con precio de campo. Proyección de ejemplo.", "p2.cta": "Ver disponibilidad",
      "p3.desc": "Infraestructura en marcha: vías compactadas, maquinaria en obra y portales de acceso. La etapa temprana, donde el valor apenas comienza.", "p3.valt": "Etapa temprana: el momento de mayor recorrido. Proyección de ejemplo.", "p3.cta": "Conocer proyecto",
      "p4.desc": "El próximo capítulo. Un proyecto en definición para quienes quieran entrar desde el primer trazo, cuando el precio es apenas una promesa.", "p4.valt": "Acceso anticipado a la primera etapa antes del lanzamiento.", "p4.cta": "Unirme a la lista", "p4.phasev": "Diseño",
      "cta.title": "Solicita acceso al <em>portafolio privado.</em>", "cta.lead": "Te compartimos disponibilidad, precios y proyección de valorización de cada proyecto — con discreción.",
      "form.name": "Nombre", "form.name.ph": "Tu nombre", "form.contact": "Correo o WhatsApp", "form.contact.ph": "Cómo te contactamos", "form.project": "Proyecto de interés", "form.all": "Todo el portafolio",
      "cta.submit": "Solicitar información", "cta.note": "Respondemos con discreción · Sin compromiso",
      "footer.tagline": "Inversión en tierra en el Llano. Parcelaciones campestres en Acacías y Villavicencio.",
      "footer.explore": "Explorar", "footer.request": "Solicitar información", "footer.copy": "© 2026 Inversiones El Poblado · Meta, Colombia", "footer.legal": "Registro y aliado financiero · pendiente"
    },
    en: {
      "skip": "Skip to content",
      "nav.home": "Home", "nav.territory": "Territory", "nav.projects": "Projects", "nav.about": "About us", "nav.contact": "Contact", "nav.cta": "Request information",
      "hero.mast": "Countryside land plots in the Meta region",
      "hero.title": "Land is the investment<br />that <em>keeps on growing.</em>",
      "hero.lead": "Countryside land plots in Acacías and Villavicencio. Your own lot, in an area just beginning to appreciate.",
      "hero.cta1": "Request information", "hero.cta2": "See the projects",
      "terr.title": "The land of the Llano, <em>up close.</em>",
      "terr.lead": "A foothill corridor between Acacías and Villavicencio: water, horizon and fertile soil. We walk it lot by lot.",
      "terr.d1": "Projects in the corridor", "terr.d2": "Municipalities with presence", "terr.d3": "Projected appreciation", "common.study": "Under study",
      "terr.n1k": "Growth of the Meta", "terr.n1v": "One of the country's most dynamic regions: road works, agribusiness and tourism all expanding.",
      "terr.n2k": "Close to Villavicencio", "terr.n2v": "The capital of the Llano just minutes away: services, retail and healthcare beside the calm of the countryside.",
      "terr.n3k": "Access via main roads", "terr.n3v": "Direct connection to the Bogotá–Villavicencio–Acacías corridor, the backbone of the foothills.",
      "terr.n4k": "Entering early", "terr.n4v": "The greatest appreciation happens in the first stages, when the price is still that of raw land.",
      "terr.n5k": "Installed infrastructure", "terr.n5v": "Internal roads, power and utilities delivered stage by stage. Real work that sustains value.",
      "terr.n6k": "Nature and calm", "terr.n6v": "Open horizon, water and clean air. A place to invest and, in time, to live.",
      "origin.title": "We know the land of the Llano because <em>it is our own.</em>",
      "origin.p1": "Inversiones El Poblado develops countryside land plots in Acacías and Villavicencio: lots with roads, utilities and power, designed for those who invest early in a region just starting to appreciate.",
      "origin.pk1": "Experience", "origin.pv1": "A local team that lives and builds in the territory, with years supporting investments in the Meta region.",
      "origin.pk2": "Guidance", "origin.pv2": "We guide you from start to finish: choosing the lot, deeds and the investment process — no fine print.",
      "origin.pk3": "Infrastructure", "origin.pv3": "Internal roads, power and water networks installed stage by stage. Real, verifiable work.",
      "origin.pk4": "Appreciation", "origin.pv4": "Close to Villavicencio with road development underway: an area with real upside ahead.",
      "origin.mk1": "Region", "origin.mk2": "Projects", "origin.mk3": "Municipalities",
      "port.title": "Four projects. One same <em>land that grows.</em>",
      "port.note": "Reference figures to visualize the project. To be replaced with the client's final data.",
      "serv.water": "Water", "serv.power": "Power", "serv.roads": "Internal roads", "serv.gas": "Natural gas", "serv.gate": "Gatehouse", "serv.roadsWork": "Roads in progress", "serv.access": "Access", "serv.design": "In design",
      "spec.lots": "Projected lots", "spec.area": "Area per lot", "spec.from": "Price from · demo", "spec.phase": "Current phase", "spec.opening": "Estimated opening",
      "val.appr": "Appreciation +", "val.entry": "Entry price", "val.list": "Private list",
      "state.dev": "In development", "state.soon": "Coming soon",
      "p1.loc": "Acacías · Flagship project", "p1.desc": "The flagship development. Lots with roads, utilities and power installed, homes already built and a community starting to inhabit the land.", "p1.valt": "Consolidating area, with roads and services already installed. Example projection.", "p1.cta": "Explore Villas del Poblado",
      "p2.desc": "Open nature minutes from the city. A setting of pastures, water and horizon for those seeking country land with nearby urban upside.", "p2.valt": "Close to Villavicencio at country prices. Example projection.", "p2.cta": "Check availability",
      "p3.desc": "Infrastructure underway: compacted roads, machinery at work and access portals. The early stage, where value is just beginning.", "p3.valt": "Early stage: the moment with the most upside. Example projection.", "p3.cta": "Discover project",
      "p4.desc": "The next chapter. A project in definition for those who want to enter from the first line, when the price is still just a promise.", "p4.valt": "Early access to the first stage before launch.", "p4.cta": "Join the list", "p4.phasev": "Design",
      "cta.title": "Request access to the <em>private portfolio.</em>", "cta.lead": "We share availability, prices and appreciation projections for each project — discreetly.",
      "form.name": "Name", "form.name.ph": "Your name", "form.contact": "Email or WhatsApp", "form.contact.ph": "How we reach you", "form.project": "Project of interest", "form.all": "The whole portfolio",
      "cta.submit": "Request information", "cta.note": "We reply discreetly · No commitment",
      "footer.tagline": "Land investment in the Llano. Countryside land plots in Acacías and Villavicencio.",
      "footer.explore": "Explore", "footer.request": "Request information", "footer.copy": "© 2026 Inversiones El Poblado · Meta, Colombia", "footer.legal": "Registration and financial partner · pending"
    }
  };

  const applyLang = (lang) => {
    const dict = I18N[lang] || I18N.es;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const v = dict[el.getAttribute("data-i18n")];
      if (v != null) el.innerHTML = v;
    });
    document.querySelectorAll("[data-i18n-ph]").forEach((el) => {
      const v = dict[el.getAttribute("data-i18n-ph")];
      if (v != null) el.setAttribute("placeholder", v);
    });
    document.documentElement.setAttribute("lang", lang);
    const b = document.querySelector("[data-lang-label]");
    if (b) b.textContent = lang === "en" ? "English" : "Español";
    syncSelects();
  };

  /* --- Moneda (COP / USD) — factor fijo demo --- */
  const RATE = 4200; // COP por USD (temporal)
  const applyCur = (cur) => {
    document.querySelectorAll("[data-cop]").forEach((el) => {
      const cop = parseFloat(el.dataset.cop) || 0;
      el.textContent = cur === "usd" ? "$" + Math.round(cop / RATE).toLocaleString("en-US") : "$" + cop.toLocaleString("es-CO");
    });
    document.querySelectorAll("[data-cur-unit]").forEach((el) => { el.textContent = cur === "usd" ? "USD" : "COP"; });
    const b = document.querySelector("[data-currency-toggle]");
    if (b) b.innerHTML = cur === "usd" ? 'COP<span aria-hidden="true"> / </span><b>USD</b>' : '<b>COP</b><span aria-hidden="true"> / </span>USD';
  };

  const swap = (fn) => {
    root.setAttribute("data-switching", "");
    fn();
    setTimeout(() => root.removeAttribute("data-switching"), 200);
  };

  let lang = localStorage.getItem("ep-lang") || "es";
  let cur = localStorage.getItem("ep-cur") || "cop";
  applyLang(lang); applyCur(cur);

  document.querySelector("[data-lang-toggle]")?.addEventListener("click", () => {
    lang = lang === "es" ? "en" : "es"; localStorage.setItem("ep-lang", lang); swap(() => applyLang(lang));
  });
  document.querySelector("[data-currency-toggle]")?.addEventListener("click", () => {
    cur = cur === "cop" ? "usd" : "cop"; localStorage.setItem("ep-cur", cur); swap(() => applyCur(cur));
  });

  /* --- Scroll-spy: enlace activo según la sección visible --- */
  const navLinks = [...document.querySelectorAll(".ep-nav__link")];
  const spyIds = ["inicio", "territorio", "proyectos", "nosotros", "contacto"];
  const spySections = spyIds.map((id) => document.getElementById(id)).filter(Boolean);
  if (spySections.length && "IntersectionObserver" in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const href = "#" + e.target.id;
        navLinks.forEach((l) => l.classList.toggle("is-active", l.getAttribute("href") === href));
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    spySections.forEach((s) => spy.observe(s));
  }
})();
