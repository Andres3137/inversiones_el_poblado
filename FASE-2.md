# FASE 2 — Landing (construcción por bloques)
### Inversiones El Poblado · nivel de estudio

Continuación de FASE-1 (Hero v5 + Confianza). Se mantiene el sistema `/design`, la narrativa concreta y el criterio editorial (dirección de arte > efectos). Cada sección con personalidad, parte del mismo sistema.

## Entregado en este batch
- **Loader cinematográfico** (`loader.css` + JS): fondo carbón, logo centrado, **línea fina que se completa**, la marca asciende, **cortina sube** y la página aparece. ~1.2–1.4s, con salvaguarda a 2.4s. Bloquea scroll durante la carga. **Respeta `prefers-reduced-motion`** (se omite por completo).
- **Logo con protagonismo**: navbar 46px (38px al hacer scroll); **logo grande en el Hero** (junto al mensaje).
- **02 · Quiénes somos** — sección **cálida** (marfil) para contraste tonal con el hero. Manifiesto en grotesca grande con acento cobre + cuerpo + meta (Región/Proyectos/Municipios) + foto (MP-04). Personalidad: statement editorial.
- **03 · Proyectos (índice interactivo)** — **sección estrella**: lista numerada 01–04; al pasar el cursor/foco, la **preview grande cambia** (imagen + caption) y las demás filas se atenúan. Sticky en desktop. Villa Luisa marcada "Próximamente" (MP-05).
- **05 · Invitación (CTA)** — formulario editorial con **inputs underline** + select de proyecto + CTA cobre + WhatsApp. `type="button"`/`onsubmit=return false` (demo, no envía). 
- **Footer** cinematográfico — **wordmark gigante** (`El Poblado`), columnas, legal (MP-08).

## Motion (con intención, no llamativo)
- `.ep-reveal` (IntersectionObserver, una vez) con stagger vía `data-delay`.
- Loader curtain, preview crossfade (200ms), hover de filas, zoom lento de figuras (1.2s), navbar truncate.
- Todo respeta `prefers-reduced-motion`.

## Bugs corregidos en el proceso
1. `.ep-mp{position:relative}` sobrescribía elementos ya posicionados → se eliminó el `position` global (cada host declara el suyo).
2. `body{overflow-x:hidden}` convertía el body en scroller (rompe sticky/scrollTo) → movido a `html{overflow-x:clip}`.
3. Aclarado: `window.scrollTo` + `scroll-behavior:smooth` anima; leer `scrollY` de inmediato da 0 (no era bug de layout).
- Versionado `?v=` en CSS/JS para evitar caché durante iteración.

## Recursos
- Fotos reales como protagonistas (honestidad). Donde falta material → tratamiento editorial + marcador `MATERIAL PENDIENTE` (MP-01…MP-08). **No se insertó imagen IA/stock** (coherencia con el principio de evidencia). Si se desea render conceptual IA temporal marcado, se puede añadir bajo confirmación.

## Pendiente (próximo batch, mismo nivel)
- 04 Villas del Poblado (sección profunda del principal) · 06 El Progreso (evidencia→valorización) · 07 Estadísticas ampliadas · 08 ¿Por qué invertir aquí? · 09 Comparativa · 10 Ubicación (mapa+coordenadas MP-06) · 11 Testimonios (MP-07).

## Estado
Verificado en navegador: loader, hero, confianza, quiénes somos, proyectos interactivo, invitación, footer. Modo dev con marcadores MP (`data-dev="true"`; poner `false` para vista cliente).
