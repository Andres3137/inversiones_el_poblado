/* ============================================================
   PROJECT.JS — comportamientos compartidos de las páginas de proyecto.
   Mismo lenguaje de motion que la landing. Vanilla, sin dependencias.
   i18n = diccionario común (chrome/labels) + diccionario por página
   (window.EP_PAGE_I18N). Respeta prefers-reduced-motion.
   ============================================================ */
(() => {
  "use strict";
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const root = document.documentElement;

  /* --- Loader cinematográfico (curtain reveal) --- */
  const loader = document.querySelector("[data-loader]");
  if (loader) {
    if (reduce) { loader.remove(); root.classList.add("ep-ready"); }
    else {
      root.classList.add("ep-loading");
      const MIN = 900, t0 = performance.now();
      let done = false;
      const finish = () => {
        if (done) return; done = true;
        const wait = Math.max(0, MIN - (performance.now() - t0));
        setTimeout(() => {
          loader.classList.add("is-done");
          root.classList.add("ep-ready");
          setTimeout(() => root.classList.remove("ep-loading"), 80);
          setTimeout(() => loader.remove(), 900);
        }, wait);
      };
      if (document.readyState === "complete") finish();
      else window.addEventListener("load", finish, { once: true });
      setTimeout(finish, 2200);
    }
  }

  /* --- Navbar: truncating al hacer scroll --- */
  const nav = document.querySelector("[data-nav]");
  if (nav) {
    const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* --- Barra de progreso de lectura --- */
  const bar = document.querySelector("[data-progress]");
  if (bar && !reduce) {
    let ticking = false;
    const update = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0).toFixed(2) + "%";
      ticking = false;
    };
    const onScroll = () => { if (!ticking) { requestAnimationFrame(update); ticking = true; } };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();
  }

  /* --- Reveal al entrar en viewport --- */
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
    }, { threshold: 0.16, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach((el) => io.observe(el));
  }

  /* --- Hero del proyecto: reveal escalonado --- */
  const heroRise = document.querySelectorAll(".pp-hero .ep-rise");
  if (heroRise.length) {
    if (reduce) heroRise.forEach((el) => el.classList.add("is-in"));
    else window.requestAnimationFrame(() => {
      heroRise.forEach((el, i) => setTimeout(() => el.classList.add("is-in"), 120 + i * 110));
    });
  }

  /* --- Hero: video de fondo opcional (data-hero-video) --- */
  const heroVideo = document.querySelector("[data-hero-video]");
  if (heroVideo && !reduce) {
    const src = heroVideo.getAttribute("data-src");
    if (src) {
      const slow = parseFloat(heroVideo.dataset.slow || "1");
      heroVideo.querySelector("source")?.setAttribute("src", src);
      heroVideo.hidden = false; heroVideo.load();
      const setRate = () => { if (slow !== 1) heroVideo.playbackRate = slow; };
      heroVideo.addEventListener("loadedmetadata", setRate, { once: true });
      heroVideo.addEventListener("playing", () => heroVideo.classList.add("is-live"), { once: true });
      const tryPlay = () => heroVideo.play?.().then(setRate).catch(() => {});
      if (heroVideo.readyState >= 2) tryPlay();
      else heroVideo.addEventListener("canplay", tryPlay, { once: true });
    }
  }

  /* --- Parallax sutil --- */
  const paras = document.querySelectorAll("[data-parallax]");
  if (!reduce && paras.length && "requestAnimationFrame" in window) {
    let ticking = false;
    const update = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      paras.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        const center = r.top + r.height / 2;
        const p = Math.max(-1, Math.min(1, (center - vh / 2) / vh));
        const speed = parseFloat(el.dataset.speed || "1");
        el.style.transform = "translate3d(0," + (p * -30 * speed).toFixed(1) + "px,0)";
      });
      ticking = false;
    };
    const onScroll = () => { if (!ticking) { requestAnimationFrame(update); ticking = true; } };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();
  }

  /* --- Galería: lightbox --- */
  const shots = [...document.querySelectorAll("[data-shot]")];
  const lb = document.querySelector("[data-lightbox]");
  if (shots.length && lb) {
    const lbImg = lb.querySelector("[data-lb-img]");
    const srcs = shots.map((s) => s.querySelector("img")?.getAttribute("src") || s.dataset.full);
    const alts = shots.map((s) => s.querySelector("img")?.getAttribute("alt") || "");
    let idx = 0;
    const show = (i) => { idx = (i + srcs.length) % srcs.length; lbImg.src = srcs[idx]; lbImg.alt = alts[idx]; };
    const open = (i) => { show(i); lb.classList.add("is-open"); document.body.style.overflow = "hidden"; };
    const close = () => { lb.classList.remove("is-open"); document.body.style.overflow = ""; };
    shots.forEach((s, i) => s.addEventListener("click", () => open(i)));
    lb.querySelector("[data-lb-close]")?.addEventListener("click", close);
    lb.querySelector("[data-lb-prev]")?.addEventListener("click", (e) => { e.stopPropagation(); show(idx - 1); });
    lb.querySelector("[data-lb-next]")?.addEventListener("click", (e) => { e.stopPropagation(); show(idx + 1); });
    lb.addEventListener("click", (e) => { if (e.target === lb) close(); });
    document.addEventListener("keydown", (e) => {
      if (!lb.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") show(idx - 1);
      else if (e.key === "ArrowRight") show(idx + 1);
    });
  }

  /* --- FAQ: acordeón (altura animada) --- */
  document.querySelectorAll("[data-qa]").forEach((qa) => {
    const q = qa.querySelector(".pp-qa__q");
    const a = qa.querySelector(".pp-qa__a");
    if (!q || !a) return;
    q.setAttribute("aria-expanded", "false");
    q.addEventListener("click", () => {
      const open = qa.hasAttribute("data-open");
      if (open) { a.style.height = a.scrollHeight + "px"; requestAnimationFrame(() => { a.style.height = "0px"; }); qa.removeAttribute("data-open"); q.setAttribute("aria-expanded", "false"); }
      else { qa.setAttribute("data-open", ""); q.setAttribute("aria-expanded", "true"); a.style.height = a.scrollHeight + "px";
        a.addEventListener("transitionend", function te() { if (qa.hasAttribute("data-open")) a.style.height = "auto"; a.removeEventListener("transitionend", te); }); }
    });
  });

  /* --- Dropdown personalizado (idéntico a la landing) --- */
  const selects = [...document.querySelectorAll("[data-select]")];
  selects.forEach((sel) => {
    const btn = sel.querySelector("[data-select-btn]");
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
    opts.forEach((o, i) => { o.addEventListener("click", () => choose(o)); o.addEventListener("mousemove", () => setActive(i)); });
    btn.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") { e.preventDefault(); if (!sel.hasAttribute("data-open")) open(); else setActive(activeIdx + (e.key === "ArrowDown" ? 1 : -1)); }
      else if (e.key === "Enter" || e.key === " ") { e.preventDefault(); sel.hasAttribute("data-open") ? choose(opts[activeIdx]) : open(); }
      else if (e.key === "Escape") close();
    });
    document.addEventListener("click", (e) => { if (!sel.contains(e.target)) close(); });
  });
  const syncSelects = () => selects.forEach((sel) => {
    const cur = sel.querySelector(".ep-select__opt.is-selected");
    const valEl = sel.querySelector("[data-select-value]");
    if (cur && valEl) valEl.textContent = cur.textContent.trim();
  });

  /* --- i18n: chrome común (nav/footer/labels) + diccionario de página --- */
  const SHARED = {
    es: {
      "skip": "Saltar al contenido",
      "nav.home": "Inicio", "nav.territory": "Territorio", "nav.projects": "Proyectos", "nav.about": "Nosotros", "nav.contact": "Contacto", "nav.cta": "Solicitar información",
      "crumb.back": "Volver al portafolio",
      "sec.summary": "Resumen ejecutivo", "sec.gallery": "Galería", "sec.plan": "Masterplan", "sec.features": "Características",
      "sec.why": "Por qué invertir", "sec.process": "Proceso de compra", "sec.location": "Ubicación", "sec.faq": "Preguntas frecuentes",
      "sec.related": "Otros proyectos",
      "gallery.note": "Fotografías del proyecto y su entorno. Material de referencia.",
      "plan.tag": "Plano · demo", "plan.legendTitle": "Distribución general",
      "process.title": "Un proceso claro, <em>sin letra pequeña.</em>",
      "step1.h": "Conversación inicial", "step1.p": "Nos cuentas qué buscas. Te compartimos disponibilidad, precios y proyección — con discreción.",
      "step2.h": "Visita guiada", "step2.p": "Recorremos el proyecto contigo, lote a lote, para que elijas con los pies en la tierra.",
      "step3.h": "Reserva del lote", "step3.p": "Apartas tu lote con un acuerdo claro. Definimos plan de pago a tu medida.",
      "step4.h": "Escrituración", "step4.p": "Formalizamos la compra con acompañamiento jurídico de principio a fin.",
      "cta.title": "Solicita información de <em>este proyecto.</em>",
      "cta.lead": "Te compartimos disponibilidad, precios y proyección de valorización — con discreción y sin compromiso.",
      "form.name": "Nombre", "form.name.ph": "Tu nombre", "form.contact": "Correo o WhatsApp", "form.contact.ph": "Cómo te contactamos",
      "form.project": "Proyecto de interés", "form.all": "Todo el portafolio",
      "form.msg": "Mensaje", "form.msg.ph": "Cuéntanos qué buscas (opcional)",
      "cta.submit": "Solicitar información", "cta.note": "Respondemos con discreción · Sin compromiso",
      "related.title": "Otros proyectos del portafolio", "card.go": "Ver proyecto",
      "footer.tagline": "Inversión en tierra en el Llano. Parcelaciones campestres en Acacías y Villavicencio.",
      "footer.explore": "Explorar", "footer.request": "Solicitar información",
      "footer.copy": "© 2026 Inversiones El Poblado · Meta, Colombia", "footer.legal": "Registro y aliado financiero · pendiente",
      "state.dev": "En desarrollo", "state.soon": "Próximamente", "common.demo": "Cifras de referencia · demo"
    },
    en: {
      "skip": "Skip to content",
      "nav.home": "Home", "nav.territory": "Territory", "nav.projects": "Projects", "nav.about": "About us", "nav.contact": "Contact", "nav.cta": "Request information",
      "crumb.back": "Back to portfolio",
      "sec.summary": "Executive summary", "sec.gallery": "Gallery", "sec.plan": "Masterplan", "sec.features": "Features",
      "sec.why": "Why invest", "sec.process": "Buying process", "sec.location": "Location", "sec.faq": "FAQ",
      "sec.related": "Other projects",
      "gallery.note": "Photographs of the project and its surroundings. Reference material.",
      "plan.tag": "Plan · demo", "plan.legendTitle": "General layout",
      "process.title": "A clear process, <em>no fine print.</em>",
      "step1.h": "First conversation", "step1.p": "You tell us what you're after. We share availability, prices and projections — discreetly.",
      "step2.h": "Guided visit", "step2.p": "We walk the project with you, lot by lot, so you choose with your feet on the ground.",
      "step3.h": "Lot reservation", "step3.p": "You reserve your lot with a clear agreement. We set a payment plan to fit you.",
      "step4.h": "Deeds", "step4.p": "We formalize the purchase with legal guidance from start to finish.",
      "cta.title": "Request information about <em>this project.</em>",
      "cta.lead": "We share availability, prices and appreciation projections — discreetly and with no commitment.",
      "form.name": "Name", "form.name.ph": "Your name", "form.contact": "Email or WhatsApp", "form.contact.ph": "How we reach you",
      "form.project": "Project of interest", "form.all": "The whole portfolio",
      "form.msg": "Message", "form.msg.ph": "Tell us what you're after (optional)",
      "cta.submit": "Request information", "cta.note": "We reply discreetly · No commitment",
      "related.title": "Other projects in the portfolio", "card.go": "View project",
      "footer.tagline": "Land investment in the Llano. Countryside land plots in Acacías and Villavicencio.",
      "footer.explore": "Explore", "footer.request": "Request information",
      "footer.copy": "© 2026 Inversiones El Poblado · Meta, Colombia", "footer.legal": "Registration and financial partner · pending",
      "state.dev": "In development", "state.soon": "Coming soon", "common.demo": "Reference figures · demo"
    }
  };
  const PAGE = window.EP_PAGE_I18N || { es: {}, en: {} };
  const dictFor = (lang) => Object.assign({}, SHARED[lang] || SHARED.es, PAGE[lang] || {});

  const applyLang = (lang) => {
    const dict = dictFor(lang);
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const v = dict[el.getAttribute("data-i18n")];
      if (v != null) el.innerHTML = v;
    });
    document.querySelectorAll("[data-i18n-ph]").forEach((el) => {
      const v = dict[el.getAttribute("data-i18n-ph")];
      if (v != null) el.setAttribute("placeholder", v);
    });
    root.setAttribute("lang", lang);
    const b = document.querySelector("[data-lang-label]");
    if (b) b.textContent = lang === "en" ? "English" : "Español";
    syncSelects();
  };

  /* --- Moneda (COP / USD) — factor fijo demo --- */
  const RATE = 4200;
  const applyCur = (cur) => {
    document.querySelectorAll("[data-cop]").forEach((el) => {
      const cop = parseFloat(el.dataset.cop) || 0;
      el.textContent = cur === "usd" ? "$" + Math.round(cop / RATE).toLocaleString("en-US") : "$" + cop.toLocaleString("es-CO");
    });
    document.querySelectorAll("[data-cur-unit]").forEach((el) => { el.textContent = cur === "usd" ? "USD" : "COP"; });
    const b = document.querySelector("[data-currency-toggle]");
    if (b) b.innerHTML = cur === "usd" ? 'COP<span aria-hidden="true"> / </span><b>USD</b>' : '<b>COP</b><span aria-hidden="true"> / </span>USD';
  };

  const swap = (fn) => { root.setAttribute("data-switching", ""); fn(); setTimeout(() => root.removeAttribute("data-switching"), 200); };

  let lang = localStorage.getItem("ep-lang") || "es";
  let cur = localStorage.getItem("ep-cur") || "cop";
  applyLang(lang); applyCur(cur);

  document.querySelector("[data-lang-toggle]")?.addEventListener("click", () => {
    lang = lang === "es" ? "en" : "es"; localStorage.setItem("ep-lang", lang); swap(() => applyLang(lang));
  });
  document.querySelector("[data-currency-toggle]")?.addEventListener("click", () => {
    cur = cur === "cop" ? "usd" : "cop"; localStorage.setItem("ep-cur", cur); swap(() => applyCur(cur));
  });
})();
