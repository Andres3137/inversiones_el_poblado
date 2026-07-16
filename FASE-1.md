# FASE 1 — Navbar · Hero · Confianza
### Implementación + decisiones de estudio · Inversiones El Poblado

Primera etapa construida siguiendo `/design` (tokens, tipografía, spacing, grid, motion, componentes, color). Nos detenemos aquí para revisión conjunta antes de continuar.

---

## Archivos
```
index.html                 # Navbar + Hero + Confianza (semántico, SEO, JSON-LD)
styles/tokens.css          # tokens --ep-* (de /design/tokens.json)
styles/base.css            # reset, tipografía de marca, layout, grano, reveal, a11y
styles/components.css      # Navbar · Buttons · Hero · Confianza · marcador MP
js/main.js                 # navbar truncate · reveal · count-up · slot de video (MP-01)
```

## Cómo ver
```
# desde la raíz del proyecto
python -m http.server 8099
# abrir http://localhost:8099/index.html
```

---

## Decisiones de estudio (y su motivo)

### 1. Stack: estático artesanal (HTML + CSS vars + JS mínimo)
**Motivo:** control pixel-exacto del design system, render garantizado sin toolchain frágil, máximo rendimiento (sin framework) y SEO. Los tokens `--ep-*` mapean 1:1 con `tokens.json`. Migrable a Next/React por componentes cuando el sitio crezca.

### 2. Tipografía — sustitutos libres de las familias licenciadas
El sistema define Canela/Reckless (display), Söhne (sans), Söhne Mono (mono) — **de pago**. Para el MVP se usan equivalentes libres (Google Fonts) que respetan la *intención*:
- **Display/serif íntima → Fraunces** (serif de alto contraste, pesos finos, óptico) ≈ Canela.
- **Sans/UI → Inter** ≈ Söhne.
- **Mono → Space Mono** ≈ Söhne Mono.
Sustituir por las licenciadas es cambiar solo las variables `--ep-font-*`.

### 3. Dirección de arte del Hero — editorial asimétrico (mejora documentada)
**Problema:** no hay foto premium horizontal; la mejor imagen (`llanerita_arbol-atardecer-reflejo`) es **vertical** y de ~1.2 MP.
**Solución:**
- **Desktop:** hero **asimétrico** — texto monumental a la izquierda + **panel de imagen enmarcado** (4:5, `elev-3`, grade cálido, grano, Ken Burns lento) a la derecha. Mostrar la foto *enmarcada y más pequeña* convierte su baja resolución/verticalidad en una decisión editorial intencional (se ve premium, no limitada).
- **Móvil:** la foto vertical va **a sangre de fondo** — el formato retrato es **ideal** para pantallas verticales. La limitación se vuelve ventaja.
- El panel es el **slot del video** (swap MP-01) sin tocar layout.

### 4. Mejora de UX — recorte del Hero en viewports cortos
**Detectado en QA visual:** con títulos a escala máxima, en pantallas bajas (~640px) el Hero **recortaba los CTAs y el chip**.
**Corregido:** título acotado `clamp(2.5rem,5.2vw,4.5rem)`, paddings del hero con `clamp` por `vh`, márgenes reducidos. Ahora CTAs y chip quedan visibles sin scroll en viewports estándar. *(Motivo: el CTA nunca debe caer bajo el fold en el hero.)*

### 5. Retiro de la cota `msnm` → dato de inversión
El sistema nació con narrativa de altitud (Medellín). Al reanclar a los Llanos, se retira `msnm`. En su lugar, el **chip del hero** comunica la oportunidad real ("Etapa temprana · 4 proyectos · precios de lanzamiento") — honesto, sin inventar cifras.

### 6. Sin inventar datos — marcadores MATERIAL PENDIENTE
- Cifras reales usadas: **04 proyectos**, **02 municipios** (Acacías, Villavicencio) con count-up.
- Cifras faltantes (**trayectoria**, **valorización %**) se muestran como `—` con badge **MP-02** visible en modo dev.
- El Hero (imagen/video) lleva badge **MP-01**.
- Los badges se activan con `html[data-dev="true"]`. Para **vista cliente**, cambiar a `data-dev="false"` en `index.html`.

---

## Sistema aplicado (checklist)
- **Tokens:** color, spacing, radios, sombras, tipografía, motion — todo vía `--ep-*`.
- **Tipografía:** display/serif/sans/mono con sus roles; overline mono uppercase + tracking; título display fino.
- **Grid/spacing:** contenedor `content-max`, márgenes `clamp`, ritmo de sección `space-10→12`.
- **Motion:** navbar truncate (`dur-base`), reveal con stagger (`ease-revelado`), count-up ascendente (`ease` cúbico), Ken Burns, cue de scroll. **`prefers-reduced-motion` respetado** en todo.
- **Componentes:** Navbar (truncating+blur), Buttons (`primary`/`ghost` con subrayado que crece), Statistics (dato tallado + count-up), chip, marcador MP.
- **Color:** 90% neutro cálido · acento cobre · verde reservado a dato positivo.

## Accesibilidad / SEO / Rendimiento
- Semántica: `header/nav/main/section`, `h1` único, `aria-label`, skip-link, `figure/figcaption`.
- Focus visible con anillo cobre (token). `alt` descriptivo en foto del hero; imágenes decorativas `alt=""`.
- `prefers-reduced-motion` desactiva parallax/Ken Burns/animación de cue y hace count-up instantáneo.
- SEO: `lang=es`, title/description, canonical, Open Graph, JSON-LD `RealEstateAgent`.
- Rendimiento: sin framework; `fetchpriority=high` en hero; fuentes con `display=swap` + preconnect.

## Cómo sustituir el video del Hero (MP-01)
1. Copiar el video a `assets/villas-del-poblado/videos/hero.mp4`.
2. En `index.html`, en `<video data-hero-video>` poner `data-src="assets/villas-del-poblado/videos/hero.mp4"` y en `<source src="...">`.
3. `js/main.js` lo activa (mute, loop, `playbackRate` 0.6 = slow) y reemplaza la imagen. La foto queda como poster/fallback.

---

## Estado
✅ Navbar · ✅ Hero (imagen premium + slot de video) · ✅ Confianza.
QA visual desktop realizado (capturas compartidas). Responsive por media queries estándar (`<1024` = columna única + foto a sangre).

**Pendiente de tu revisión antes de continuar** con el resto del sitio (Quiénes somos → Proyectos → …).

---

# HERO v2 — dirección editorial (revista de arquitectura)

Elevación visual del Hero. **Sin tocar** arquitectura, narrativa, wireframe, tokens, colores, flujo ni otros componentes. Solo Hero + refinamiento tipográfico.

## Referencias 21st.dev estudiadas (principios, no copia)
- **Classy Hero** (`jatin-yadav05`) — tipografía elegante, contención cromática.
- **Lumina Interactive List** (`haik-kashiyani`) — *quiet luxury*, numeración editorial, exclusividad.
- **Experience Hero** (`haik-kashiyani`) — narrative apertures, un solo CTA con propósito.
- **Minimalist Hero Fashion** (`kokonutd`) / **Hero Minimalism** (`lyanchouss`) — espacio negativo dominante, animación mínima.
- **Responsive Hero Banner** (`saifyxpro`) — imagen cinematográfica + serif + fade suave.

## Principios aplicados
- **Índice editorial** `01 — LA TIERRA` (eyebrow mono + regla) — reemplaza el motivo de cota, ata al sistema de secciones.
- **Titular contenido** (no llena pantalla) con **roman + itálica** en la misma frase — ritmo de revista.
- **Asimetría real:** la imagen es una **lámina montada** (passe-partout) que ocupa una **columna derecha de altura completa y sangra al borde**.
- **Grade unificador** de la foto (leve desat. + contraste + tinte cálido + grano) → oculta el color amateur, crea "un solo mundo". La limitación se vuelve decisión.
- **Profundidad por capas:** tinte base → imagen → gradientes → vignette → caption → hairline → ordinal vertical.
- **Caption editorial** honesto (`META, COLOMBIA / atardecer llanero`) y **hairline vertical** de estructura.
- **Espacio negativo** amplio; un CTA primario + un enlace discreto.

## Tipografía (aprobada: Newsreader + Inter Tight)
- **Display/serif → Newsreader** (serif de revista, optical sizing, itálica elegante; sin decoración excesiva) ≈ patrimonio/arquitectura.
- **Sans → Inter Tight** (neutra, limpia, compacta). **Mono → Space Mono**.
- Cambio solo en las variables `--ep-font-*` y el `<link>` de fuentes. Sustituye a Fraunces (que leía "trendy/IA").

## Microinteracciones (elegantes)
- **Reveal por máscara**: titular asciende con `clip-path`; eyebrow/lead/CTA/ledger/lámina en cascada (una vez, al cargar).
- **Parallax de puntero** muy leve en la imagen (≤10px, solo desktop `pointer:fine`).
- Cue de scroll animado. **Todo** respeta `prefers-reduced-motion` (reveals y parallax se desactivan).

## Mejoras de UX detectadas y corregidas
- **Colisión lámina ↔ navbar** en viewports cortos → la lámina pasó de "centrada" a **columna de altura completa bajo la navbar** (`top:clamp(76px,11vh,120px); bottom:space-8`).
- **Cue solapando el ledger** en pantallas bajas → cue oculto en `max-height:820px`.

## QA visual (desktop)
Verificado en navegador: eyebrow+índice, Newsreader roman/itálica, lámina graduada sin colisión, hairline, ordinal, ledger (`Etapa temprana` / `04 proyectos`), confianza con cifras en Newsreader. Capturas compartidas. Responsive por media queries (`<1024` = foto vertical a sangre de fondo + contenido apilado).

---

# HERO v3 — capa de producto premium (Linear/Vercel/Raycast, con nuestra identidad)

Eleva v2 de "editorial bien hecho" a **sensación de producto de estudio internacional**, sin tocar arquitectura/narrativa/tokens/colores/flujo.

## Principios extraídos de 21st.dev (reinterpretados, no copiados)
Los heroes premium NO usan blobs de color; usan: **lienzo oscuro + una sola luz ambiental contenida**, **grid finísimo enmascarado**, **paneles con borde de luz y profundidad real**, **UI flotante en capas Z**, **viñeta + grano**, **reveals con blur**, microdetalle (**border-beam**, dot de estado), y **espacio negativo dominante**. Referencias vistas: Dark Horizon Glow, Background Grid Beam, Border Beam (magicui), Aurora/Glow (como ejemplo de lo que *evitar*: neón/arcoíris).

## Aplicado (con identidad El Poblado — cobre, sin neón/azul)
- **Lienzo de profundidad:** grid cálido al 5% enmascarado con radial + **glow ambiental cobre único** (bajo, con drift lento). Reemplaza el fondo plano; ancla la imagen a la composición.
- **Panel-producto:** la lámina ahora tiene **borde de luz** (`inset 0 1px highlight`), **glow propio** detrás y **border-beam cobre** que recorre el marco (microdetalle). Deja de ser "foto puesta al lado".
- **Card flotante (capa Z):** `EN OBRA · Vías, redes y energía en ejecución` — dato honesto, superpuesto a la esquina del panel con `backdrop-filter`. Aporta layering real.
- **Dot de estado pulsante** en el eyebrow. **Tipografía respira** (line-height mayor, más aire).
- **Motion elegante:** reveals con **blur-in** escalonado, **parallax multicapa** (glow/grid/panel a distintas profundidades = sensación 3D), glow con drift, border-beam. Todo respeta `prefers-reduced-motion`.
- Limpieza: el filtro de blur se retira por JS al terminar (no deja capa de compositing).

## Nota de herramienta
El screenshot de pantalla completa del navegador **no compone capas GPU** (elementos con `filter`/`backdrop-filter`/`mask`) → aparecían "en blanco" en la captura aunque el DOM confirma render correcto (opacity 1, sobre el resto). Verificado por **inspección de DOM en vivo + capturas `zoom`** (que sí renderizan): eyebrow con dot, titular Newsreader, panel con **border-beam cobre**, caption, card flotante, ledger. En navegador real del cliente se ve completo.

---

# HERO v4 — portada editorial (dirección de arte, no efectos)  ← ACTUAL

Corrección de rumbo: v3 derivó a estética Magic-UI (glow, grid, border-beam) = "demo de componentes". v4 **elimina todos los efectos** y busca dirección de arte de **revista de arquitectura**. Sistema/arquitectura/narrativa/tokens/colores intactos.

## Principio rector
El lujo viene del **vacío y la composición**, no de efectos. *Si el usuario nota el efecto, es demasiado fuerte.* El usuario debe recordar **la fotografía y el mensaje**.

## Eliminado (respecto a v3)
- Grid de fondo visible · glow ambiental cobre · border-beam · card flotante · dot pulsante · parallax multicapa · reveal con blur.

## Composición v4 (estudiada desde 21st.dev: Classy Hero, Minimalist Hero, Hero Minimalism, Lumina, Minimalist Hero Fashion)
- **Fondo silencioso:** carbón sólido, sin textura ni luz generada.
- **Fotografía protagonista:** ocupa la **mitad derecha a altura completa**, sin marco/matte/beam; **se disuelve en el carbón por su borde izquierdo** (integrada a la composición, no "puesta al lado"). Grade cálido filmico sutil + grano. Caption editorial en mono.
- **Tipografía respirando:** eyebrow-masthead arriba, mensaje anclado abajo, **gran vacío en medio** (`justify-content:space-between` a altura de viewport). Newsreader roman + itálica.
- **Adornos al mínimo:** una regla fina en el eyebrow, un `border-top` en el ledger. Nada más.

## Motion (casi invisible)
- Reveal silencioso (solo opacity + 14px, sin blur ni máscara).
- Imagen con **respiración** ultra-lenta (scale 1.03→1.09 en 24s) — apenas perceptible. Sin parallax.
- `prefers-reduced-motion` respetado.

## Móvil
Fotografía **a sangre = portada**; degradado inferior para legibilidad; texto anclado abajo. El formato vertical de la foto es ideal para portrait.

## QA
Verificado por `zoom` (el screenshot completo no compone el `mix-blend` del grano + animación): masthead quieto, Newsreader, ledger, y **la fotografía protagonista fundiéndose con el fondo**. Lectura editorial, silenciosa. En navegador real se ve completo.

---

# HERO v5 — portada de marca (fotografía a sangre)  ← ACTUAL

Salida del "lenguaje IA reconocible". Diagnóstico del usuario: los tells que quedaban eran **la serif de alto contraste** (Newsreader/Playfair-family) y la **composición 50/50 texto|imagen**. v5 elimina ambos.

## Dirección de arte (por qué se siente premium, estudiado en 21st.dev)
Un solo foco · contraste de escala · **grotesca, no serif glossy** · anclaje asimétrico · fotografía como mundo entero · silencio. Referencias: Minimalist Hero Fashion, Hero Minimalism, Classy Hero, Minimalist Hero.

## Cambios
- **Tipografía → una sola grotesca: Schibsted Grotesk** (limpia, de marca, no es Inter-default). Fuera Newsreader (serif = tell #1) y el uso de mono en el hero.
- **Composición → portada fotográfica a sangre completa.** La foto ES el hero (móvil y desktop). Fuera el split 50/50 (tell #2).
- **Grade fílmico fuerte + grano + scrim** convierten la baja resolución en decisión de cine (no defecto). Masthead arriba, mensaje abajo-izquierda, **2/3 de cielo vacío** = silencio. Caption editorial abajo-derecha.
- **Copper reducido a un susurro** (folio + acento del titular). **Motion:** solo un fade-up al cargar; nada en loop.
- Eliminado definitivamente: glow, grid, border-beam, card flotante, dot pulsante, parallax, respiración, reveal con blur, serif, mono en hero.

## Bug corregido (raíz)
`.ep-mp{position:relative}` (marcador MATERIAL PENDIENTE) **sobrescribía** el `position:absolute` de elementos ya posicionados. En v2–v4 no se notó porque el fondo estaba `display:none` en desktop; en v5 (fondo a sangre) rompía el layout (hero angosto y altísimo). Fix: `.ep-mp` ya no fuerza `position`; el ancla la da cada elemento (los estáticos como las celdas de stats declaran su `position` aparte). Se añadió versionado `?v=` a CSS/JS para evitar caché durante iteración.

## QA
Verificado por DOM + screenshot: hero = viewport completo, foto a sangre, **titular en grotesca** ("La tierra es la inversión que *no deja de crecer.*"), masthead, lead, CTAs, caption. Portada de marca, no colección de efectos.
