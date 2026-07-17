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

  /* --- Parallax sutil --- */
  const paras = document.querySelectorAll("[data-parallax]");
  if (!reduce && paras.length && "requestAnimationFrame" in window) {
    let ticking = false;
    // En móvil la deriva es la mitad: menos movimiento, más elegancia
    const amp = () => (window.innerWidth <= 1023 ? 14 : 30);
    const update = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const a = amp();
      paras.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        const center = r.top + r.height / 2;
        const p = Math.max(-1, Math.min(1, (center - vh / 2) / vh));
        const speed = parseFloat(el.dataset.speed || "1");
        el.style.transform = "translate3d(0," + (p * -a * speed).toFixed(1) + "px,0)";
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

  /* --- Visor de planos: zoom, desplazamiento y pantalla completa ---
     Un plano se lee acercándose. Todo con transform (nunca width/height):
     escala y desplazamiento en una sola matriz, compuesta por la GPU.      */
  const viewer = document.querySelector("[data-viewer]");
  const planOpen = document.querySelector("[data-plan-open]");
  if (viewer && planOpen) {
    const stage = viewer.querySelector("[data-viewer-stage]");
    const img = viewer.querySelector("[data-viewer-img]");
    const pct = viewer.querySelector("[data-viewer-pct]");
    const MAX = 6;
    let scale = 1, fit = 1, x = 0, y = 0, natural = { w: 0, h: 0 };

    const apply = (eased) => {
      img.classList.toggle("is-eased", !!eased);
      img.style.transform = `translate(-50%,-50%) translate(${x}px,${y}px) scale(${scale})`;
      pct.textContent = Math.round((scale / fit) * 100) + "%";
      viewer.querySelector("[data-viewer-out]").disabled = scale <= fit * 1.01;
      if (eased) setTimeout(() => img.classList.remove("is-eased"), 380);
    };

    // Encaja el plano completo en pantalla: ese encuadre es el 100%
    const fitToStage = () => {
      const r = stage.getBoundingClientRect();
      if (!natural.w || !natural.h) return;
      fit = Math.min((r.width - 48) / natural.w, (r.height - 140) / natural.h);
      scale = fit; x = 0; y = 0;
      apply(false);
    };

    // Limita el desplazamiento para que el plano no se pierda fuera de vista
    const clamp = () => {
      const r = stage.getBoundingClientRect();
      const w = natural.w * scale, h = natural.h * scale;
      const mx = Math.max(0, (w - r.width) / 2), my = Math.max(0, (h - r.height) / 2);
      x = Math.min(mx, Math.max(-mx, x));
      y = Math.min(my, Math.max(-my, y));
    };

    const zoomTo = (next, cx, cy) => {
      const r = stage.getBoundingClientRect();
      const px = (cx ?? r.width / 2) - r.width / 2;
      const py = (cy ?? r.height / 2) - r.height / 2;
      const k = next / scale;
      x = px - (px - x) * k;   // el punto bajo el cursor se queda quieto
      y = py - (py - y) * k;
      scale = next;
      clamp(); apply(true);
    };
    const step = (f) => zoomTo(Math.min(MAX * fit, Math.max(fit, scale * f)));

    const open = () => {
      const src = planOpen.dataset.planSrc;
      const cap = planOpen.dataset.planCap || "";
      viewer.querySelector("[data-viewer-cap]").innerHTML = cap;
      img.alt = planOpen.dataset.planAlt || "";
      const load = () => {
        natural = { w: img.naturalWidth, h: img.naturalHeight };
        img.style.width = natural.w + "px";
        fitToStage();
      };
      if (img.getAttribute("src") !== src) {
        img.addEventListener("load", load, { once: true });
        img.src = src;
      } else load();
      viewer.classList.add("is-open");
      viewer.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      viewer.querySelector("[data-viewer-close]").focus();
    };
    const close = () => {
      if (document.fullscreenElement) document.exitFullscreen?.();
      viewer.classList.remove("is-open");
      viewer.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      planOpen.focus();
    };

    planOpen.addEventListener("click", open);
    viewer.querySelector("[data-viewer-close]").addEventListener("click", close);
    viewer.querySelector("[data-viewer-in]").addEventListener("click", () => step(1.5));
    viewer.querySelector("[data-viewer-out]").addEventListener("click", () => step(1 / 1.5));
    viewer.querySelector("[data-viewer-reset]").addEventListener("click", () => fitToStage());
    viewer.querySelector("[data-viewer-full]").addEventListener("click", () => {
      if (document.fullscreenElement) document.exitFullscreen?.();
      else viewer.requestFullscreen?.().catch(() => {});
    });

    // Rueda = zoom sobre el cursor
    stage.addEventListener("wheel", (e) => {
      e.preventDefault();
      const r = stage.getBoundingClientRect();
      zoomTo(Math.min(MAX * fit, Math.max(fit, scale * (e.deltaY < 0 ? 1.12 : 1 / 1.12))),
             e.clientX - r.left, e.clientY - r.top);
    }, { passive: false });

    // Arrastre con puntero (ratón y táctil)
    let drag = null;
    stage.addEventListener("pointerdown", (e) => {
      if (e.button !== 0 && e.pointerType === "mouse") return;
      drag = { px: e.clientX, py: e.clientY };
      stage.setPointerCapture(e.pointerId);
      stage.classList.add("is-panning");
    });
    stage.addEventListener("pointermove", (e) => {
      if (!drag) return;
      x += e.clientX - drag.px; y += e.clientY - drag.py;
      drag = { px: e.clientX, py: e.clientY };
      clamp(); apply(false);
    });
    const endDrag = () => { drag = null; stage.classList.remove("is-panning"); };
    stage.addEventListener("pointerup", endDrag);
    stage.addEventListener("pointercancel", endDrag);
    stage.addEventListener("dblclick", (e) => {
      const r = stage.getBoundingClientRect();
      if (scale > fit * 1.05) fitToStage();
      else zoomTo(fit * 2.5, e.clientX - r.left, e.clientY - r.top);
    });

    // Pellizco en táctil
    const pts = new Map();
    let pinch = 0;
    stage.addEventListener("pointerdown", (e) => pts.set(e.pointerId, e));
    stage.addEventListener("pointermove", (e) => {
      if (!pts.has(e.pointerId)) return;
      pts.set(e.pointerId, e);
      if (pts.size !== 2) return;
      drag = null;
      const [a, b] = [...pts.values()];
      const d = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
      if (pinch) {
        const r = stage.getBoundingClientRect();
        zoomTo(Math.min(MAX * fit, Math.max(fit, scale * (d / pinch))),
               (a.clientX + b.clientX) / 2 - r.left, (a.clientY + b.clientY) / 2 - r.top);
      }
      pinch = d;
    });
    const dropPt = (e) => { pts.delete(e.pointerId); if (pts.size < 2) pinch = 0; };
    stage.addEventListener("pointerup", dropPt);
    stage.addEventListener("pointercancel", dropPt);

    window.addEventListener("resize", () => { if (viewer.classList.contains("is-open")) fitToStage(); });
    document.addEventListener("keydown", (e) => {
      if (!viewer.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      else if (e.key === "+" || e.key === "=") step(1.5);
      else if (e.key === "-") step(1 / 1.5);
      else if (e.key === "0") fitToStage();
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

  /* --- Ubicación: Google Maps listo para conectar ---
     Se activa SOLO si [data-map] trae lat y lng reales. Sin coordenadas
     no se pinta ningún mapa (nada ficticio): manda la fotografía y se
     muestra el aviso de pendiente. El iframe se inyecta aquí, no en el
     HTML, para no pedir nada a Google mientras no haya coordenadas.     */
  const mapEl = document.querySelector("[data-map]");
  if (mapEl) {
    const { lat, lng, zoom, label } = mapEl.dataset;
    const ok = lat && lng && !isNaN(parseFloat(lat)) && !isNaN(parseFloat(lng));
    if (ok) {
      const q = encodeURIComponent(`${lat},${lng}`);
      const z = zoom || "15";
      const iframe = document.createElement("iframe");
      iframe.loading = "lazy";
      iframe.referrerPolicy = "no-referrer-when-downgrade";
      iframe.title = label || "Ubicación del proyecto";
      iframe.allowFullscreen = true;
      iframe.src = `https://www.google.com/maps?q=${q}&z=${z}&output=embed`;
      mapEl.appendChild(iframe);
      mapEl.classList.add("is-live");
      document.querySelector("[data-map-pending]")?.remove();
    }
  }

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

  /* --- Vocabulario de las páginas de proyecto ---
     El estado (idioma, moneda, persistencia, toggles) vive en i18n.js.
     Aquí va lo que comparten las 4 páginas de proyecto; encima se registra
     el diccionario propio de cada una (window.EP_PAGE_I18N), que manda.   */
  window.EP_I18N.register({
    es: {
      "crumb.back": "Volver al portafolio",
      "sec.summary": "Resumen ejecutivo", "sec.gallery": "Galería", "sec.plan": "Masterplan", "sec.features": "Características",
      "sec.why": "Por qué invertir", "sec.process": "Proceso de compra", "sec.location": "Ubicación", "sec.faq": "Preguntas frecuentes",
      "sec.related": "Otros proyectos",
      "gallery.note": "Fotografías del proyecto y su entorno. Material de referencia.",
      "plan.tag": "Plano · demo", "plan.legendTitle": "Distribución general",
      "plan.open": "Ampliar plano", "viewer.fit": "Ajustar",
      "loc.pending": "Mapa interactivo · pendiente de coordenadas reales",
      "process.title": "Un proceso claro, <em>sin letra pequeña.</em>",
      "step1.h": "Conversación inicial", "step1.p": "Nos cuentas qué buscas. Te compartimos disponibilidad, precios y proyección — con discreción.",
      "step2.h": "Visita guiada", "step2.p": "Recorremos el proyecto contigo, lote a lote, para que elijas con los pies en la tierra.",
      "step3.h": "Reserva del lote", "step3.p": "Apartas tu lote con un acuerdo claro. Definimos plan de pago a tu medida.",
      "step4.h": "Escrituración", "step4.p": "Formalizamos la compra con acompañamiento jurídico de principio a fin.",
      "cta.title": "Solicita información de <em>este proyecto.</em>",
      "cta.lead": "Te compartimos disponibilidad, precios y proyección de valorización — con discreción y sin compromiso.",
      "form.msg": "Mensaje", "form.msg.ph": "Cuéntanos qué buscas (opcional)",
      "related.title": "Otros proyectos del portafolio", "card.go": "Ver proyecto",
      "common.demo": "Cifras de referencia · demo"
    },
    en: {
      "crumb.back": "Back to portfolio",
      "sec.summary": "Executive summary", "sec.gallery": "Gallery", "sec.plan": "Masterplan", "sec.features": "Features",
      "sec.why": "Why invest", "sec.process": "Buying process", "sec.location": "Location", "sec.faq": "FAQ",
      "sec.related": "Other projects",
      "gallery.note": "Photographs of the project and its surroundings. Reference material.",
      "plan.tag": "Plan · demo", "plan.legendTitle": "General layout",
      "plan.open": "Enlarge plan", "viewer.fit": "Fit",
      "loc.pending": "Interactive map · pending real coordinates",
      "process.title": "A clear process, <em>no fine print.</em>",
      "step1.h": "First conversation", "step1.p": "You tell us what you're after. We share availability, prices and projections — discreetly.",
      "step2.h": "Guided visit", "step2.p": "We walk the project with you, lot by lot, so you choose with your feet on the ground.",
      "step3.h": "Lot reservation", "step3.p": "You reserve your lot with a clear agreement. We set a payment plan to fit you.",
      "step4.h": "Deeds", "step4.p": "We formalize the purchase with legal guidance from start to finish.",
      "cta.title": "Request information about <em>this project.</em>",
      "cta.lead": "We share availability, prices and appreciation projections — discreetly and with no commitment.",
      "form.msg": "Message", "form.msg.ph": "Tell us what you're after (optional)",
      "related.title": "Other projects in the portfolio", "card.go": "View project",
      "common.demo": "Reference figures · demo"
    }
  });

  /* El diccionario propio de la página se registra después: manda sobre lo anterior. */
  window.EP_I18N.register(window.EP_PAGE_I18N);

  /* El dropdown pinta el texto de la opción elegida: refrescarlo al traducir. */
  document.addEventListener("ep:lang", syncSelects);
})();
