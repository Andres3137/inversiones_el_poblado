# Componentes — "El Umbral"
### Inversiones El Poblado · v1.0

Definición de comportamiento (sin código). Cada componente hereda `tokens.json` + reglas de `01-design-system.md` + `02-motion.md`.

**Theming por umbral:** un atributo `data-umbral="ascender|descubrir|pertenecer|invertir|permanecer"` reasigna los tokens semánticos (frío→cálido, voz tipográfica activa) sin tocar el componente.

**Referencias 21st.dev:** se toma el *patrón de interacción*, se redefine con tokens propios. Ninguno se usa tal cual.

---

## Navbar
- **Regla:** minimalista, transparente sobre hero; *truncating* al scroll (compacta + fondo `bg-base/85` + blur + borde inferior 1px `border`).
- **Contenido:** logo (sello de curva de nivel) · navegación · toggle **ES/EN** · selector **COP/USD** (único uso de `radius-pill`).
- **Estados:** top → transparente; scrolled → blur + padding menor (altura 80px → 64px); link hover → subrayado cobre que crece.
- **Motion:** `--ep-dur-base` `--ep-ease-standard`.
- **21st ref:** `Northstrix/truncating-navbar` + `aceternity/floating-navbar`. Fusionados sin la cápsula flotante genérica.

## Hero
- **Regla:** una idea. Titular `fs-display-1` display; foto a sangre (`bleed-max`) con tratamiento de marca; cota `msnm` en columna de anotación que cuenta al entrar; composición **asimétrica**, aire dominante.
- **Prohibido:** titular centrado + 2 botones + gradiente.
- **Variantes:** `hero-exterior` (Ascender, frío) · `hero-umbral` (con admisión) · `hero-cumbre` (Permanecer).
- **Motion:** parallax `parallax-ratio`; texto revela `ease-revelado` con stagger.
- **21st ref:** `jatin-yadav05/classy-hero` + `aceternity/container-scroll-animation`.

## Buttons
- **Variantes:** `primary` (cobre sobre carbón, sereno, `radius-md`, magnético) · `secondary` (borde 1px→cobre) · `ghost` (texto + subrayado que crece) · `invite` (CTA ceremonial).
- **Copy:** verbos de acceso ("Solicitar acceso"), nunca "Enviar".
- **Anatomía:** padding `space-3`/`space-5`; `fs-body`; altura 48px (táctil ≥44px).
- **Estados:** hover → magnético ≤6px + borde cobre; press → escala 0.98 `dur-instant`; focus → `elev-focus`; disabled → opacidad .38.
- **21st ref:** `motion-primitives/magnetic` + `ui-layouts/button-magnetic` (solo la física magnética, atenuada).

## Inputs
- **Regla:** underline editorial (línea inferior 1px `border`→cobre), **no** caja pesada.
- **Label:** mono uppercase micro, asciende (float) al foco — micro-metáfora de ascenso.
- **Anatomía:** `radius-sm`; texto `fs-body`; padding vertical `space-3`.
- **Estados:** focus → línea cobre + label sube `ease-ascenso`; error → línea `danger` + caption mono; filled → label arriba.
- **21st ref:** `hero_ui/heroui-input` / `reui/base-input` (base a11y y estados; redefinido a underline + label ascendente).

## Cards (base)
- **Regla:** borde de curva de nivel (1px `border`), sin sombra pesada. En cálido: `surface-warm` + `elev-warm`. Cota mono en esquina superior (columna de anotación).
- **Anatomía:** `radius-md`; padding `space-5`; gap interno `space-3`.
- **Estados:** hover → borde cobre + `translateY(-4px)` `dur-fast` + reveal de contenido secundario.
- **21st ref:** `YoucefBnm/reveal-on-hover`.

## Property Cards
- **Regla:** curaduría editorial, no catálogo. Foto tratada (ratio 4:5); dato clave tallado (valorización en `success`, renta USD) en mono; cota `msnm` de la propiedad; etiqueta "acceso privado" cuando aplique.
- **Estados:** default (sereno) → hover (zoom imagen 2–3% + reveal dato + swipe de galería) → focus (borde cobre).
- **Anatomía:** `radius-md`; imagen radius top; gap `space-3`; `elev-1`.
- **21st ref:** `lukacho/image-swiper` + `lavikatiyar/card-3` + `YoucefBnm/reveal-on-hover`.

## Gallery
- **Regla:** scroll inmersivo — imágenes escalan a distintos ritmos, overlay tipográfico que aparece; profundidad cinematográfica; foto a sangre.
- **Motion:** scale on scroll + text fade-in; respeta `reduced-motion`.
- **21st ref:** `ishamsu/immersive-scroll-gallery` + `YoucefBnm/animated-gallery`.

## Statistics
- **Regla:** el **dato tallado** — cifra `fs-data-xl` mono, aislada, anotación técnica al lado, enorme aire. Retícula de arquitecto visible (líneas finas, `radius 0`). Verde ladera SOLO en positivo.
- **Motion:** count-up ascendente `dur-slow` `ease-ascenso`; line-draw de la retícula.
- **21st ref:** `bundui/count-animation` + `hextaui/animated-counter` (motor de conteo; redefinido a "dato como escultura").

## Testimonios — "El Círculo"
- **Regla:** no reseñas — **quiénes ya están dentro.** Cita editorial `font-serif-text` `fs-h3`, tipografía protagonista; transición fade/blur entre voces; pocas, confidenciales; atribución mono discreta; sin card pesada.
- **Anatomía:** medida `editorial-max`; padding `space-9`.
- **21st ref:** `jatin-yadav05/editorial-testimonial` + `jatin-yadav05/minimal-testimonial`.

## CTA — "La Invitación"
- **Regla:** no captura lead, **extiende invitación.** Sección serena, botón `invite`, "Solicitar acceso al portafolio privado", enorme aire, fondo que se entibia, línea de nivel cerrándose en sello.
- **Anatomía:** contenedor `editorial-max` centrado en aire `bleed-max`; padding `space-11`.
- **Motion:** reveal lento `dur-slow`; botón magnético.
- **21st ref:** ninguno encaja → **redefinido desde cero** (botón `invite` + espaciado editorial). Sin caja de newsletter genérica.

## Modales
- **Regla:** velo `bg-overlay .72` + blur leve; panel `surface-1` `radius-lg` `elev-3`; entra con `ease-umbral` (mini-admisión).
- **A11y:** foco atrapado; cierre por Esc/backdrop; retorno de foco al disparador. **Nunca** disparar `alert/confirm` nativos.
- **Motion:** entrada `dur-base` `ease-umbral`; salida `dur-fast`.

## Footer
- **Regla:** cierre cinematográfico, no mapa de sitio denso. Curtain reveal al llegar; **sello de curva de nivel** como firma; tipografía monumental de despedida; legales/registro/aliado en mono discreto; sensación de permanencia.
- **Anatomía:** fondo `bg-inset`; padding `space-12` top; línea superior 1px `border`.
- **Motion:** curtain reveal `ease-umbral` `dur-umbral`; parallax leve.
- **21st ref:** `easemize/motion-footer` (mecánica de reveal; descartados aurora/marquee genéricos).

---

## Inventario de referencias 21st.dev (trazabilidad)
| Componente | Fuente 21st | Qué se toma |
|---|---|---|
| Buttons | motion-primitives/magnetic, ui-layouts/button-magnetic | física magnética |
| Inputs | hero_ui/heroui-input, reui/base-input | base a11y/estados |
| Navbar | Northstrix/truncating-navbar, aceternity/floating-navbar | truncate + hide/reveal |
| Hero | jatin-yadav05/classy-hero, aceternity/container-scroll-animation | hero sobrio + reveal 3D |
| Cards | YoucefBnm/reveal-on-hover | reveal en hover |
| Property Cards | lukacho/image-swiper, lavikatiyar/card-3 | swiper + card real-estate |
| Gallery | ishamsu/immersive-scroll-gallery, YoucefBnm/animated-gallery | scale-on-scroll |
| Statistics | bundui/count-animation, hextaui/animated-counter | count-up |
| Testimonios | jatin-yadav05/editorial-testimonial, minimal-testimonial | editorial + fade/blur |
| Footer | easemize/motion-footer | curtain reveal |

> Nota: todo pick se **redefine** con tokens propios. Ninguno se instala sin re-vestir. Verificar licencia de cada componente antes de usar su código.
