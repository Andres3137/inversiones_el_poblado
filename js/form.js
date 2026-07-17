/* ============================================================
   FORM.JS — estructura del formulario, lista para conectar.
   Compartido por la landing y las páginas de proyecto.

   ESTADO: NO envía nada todavía (por diseño).
   Recoge, valida y arma el payload; el envío está detrás de un
   único punto de conexión: sendLead().

   ── Cómo conectarlo cuando llegue el momento ──────────────────
   A · EmailJS
       1. Añadir el SDK antes de este archivo:
          <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
       2. Rellenar EP_FORM.emailjs con las claves reales.
   B · Backend propio
       1. Poner EP_FORM.endpoint = "https://tu-api/leads" (POST JSON).
   Con cualquiera de los dos rellenado, el formulario empieza a
   enviar solo. No hay que tocar nada más.
   ============================================================ */
(() => {
  "use strict";

  // ---- Único punto de configuración ----
  const EP_FORM = {
    endpoint: null,                    // B · backend propio: "https://…/leads"
    emailjs: { serviceId: null, templateId: null, publicKey: null },  // A · EmailJS
  };

  const form = document.querySelector("[data-form]");
  if (!form) return;

  const btn = document.querySelector("[data-form-submit]");
  const note = document.querySelector("[data-form-note]");
  if (!btn || !note) return;

  /* La nota vuelve a su texto por diccionario, no por copia: si se cachea
     el textContent inicial se restaura en el idioma que hubiera al cargar. */
  const noteReset = () => window.EP_I18N?.t("cta.note") ?? note.textContent;
  const isEn = () => document.documentElement.lang === "en";
  const T = {
    missing: () => (isEn() ? "Please add your name and a way to reach you." : "Falta tu nombre y cómo contactarte."),
    sending: () => (isEn() ? "Sending…" : "Enviando…"),
    ok: () => (isEn() ? "Thank you. We'll be in touch shortly." : "Gracias. Te contactamos muy pronto."),
    fail: () => (isEn() ? "It didn't go through. Please try again in a moment." : "No se pudo enviar. Inténtalo de nuevo en un momento."),
    pending: () => (isEn()
      ? "Demo form — not connected yet. Your data was not sent."
      : "Formulario de demostración — aún sin conectar. Tus datos no se enviaron."),
  };

  const say = (msg, tone) => {
    note.textContent = msg;
    note.dataset.tone = tone || "";
  };

  const payload = () => {
    const d = Object.fromEntries(new FormData(form).entries());
    return {
      nombre: (d.nombre || "").trim(),
      contacto: (d.contacto || "").trim(),
      proyecto: d.proyecto || "",
      mensaje: (d.mensaje || "").trim(),
      // Contexto útil para el asesor
      origen: location.pathname.split("/").pop() || "index.html",
      idioma: document.documentElement.lang || "es",
      moneda: localStorage.getItem("ep-cur") || "cop",
      enviadoEn: new Date().toISOString(),
    };
  };

  /* Único punto de envío. Hoy no hay canal configurado → no envía.
     Devuelve "pending" para que la UI lo diga con honestidad. */
  const sendLead = async (data) => {
    const { endpoint, emailjs: cfg } = EP_FORM;

    if (endpoint) {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("HTTP " + res.status);
      return "sent";
    }

    if (cfg.serviceId && cfg.templateId && cfg.publicKey && window.emailjs) {
      await window.emailjs.send(cfg.serviceId, cfg.templateId, data, { publicKey: cfg.publicKey });
      return "sent";
    }

    return "pending";   // sin canal configurado
  };

  const submit = async () => {
    const data = payload();
    if (!data.nombre || !data.contacto) { say(T.missing(), "warn"); return; }

    btn.disabled = true;
    say(T.sending(), "");
    try {
      const result = await sendLead(data);
      if (result === "pending") {
        say(T.pending(), "warn");
        console.info("[EP_FORM] Sin canal configurado. Payload listo:", data);
      } else {
        say(T.ok(), "ok");
        form.reset();
      }
    } catch (err) {
      say(T.fail(), "warn");
      console.error("[EP_FORM] Falló el envío:", err);
    } finally {
      btn.disabled = false;
      setTimeout(() => say(noteReset(), ""), 6000);
    }
  };

  btn.addEventListener("click", submit);
  form.addEventListener("submit", (e) => { e.preventDefault(); submit(); });
})();
