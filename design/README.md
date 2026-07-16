# /design — Handoff "El Umbral"
### Inversiones El Poblado · Sistema de diseño v1.0

Documentación de diseño para construir la web. **Aún no hay código de interfaz** — esto es la fuente de verdad que cualquier desarrollador debe seguir.

## Índice
| Archivo | Contenido |
|---|---|
| `01-design-system.md` | Filosofía, principios, tipografía, color, espaciado, grid, iconografía, reglas |
| `02-motion.md` | Curvas, duraciones, scroll, hover, reveal, parallax, umbral, a11y |
| `03-components.md` | Definición de todos los componentes + referencias 21st.dev |
| `04-copywriting.md` | Voz, léxico de marca, copy por umbral, microcopy ES/EN |
| `05-photo-direction.md` | Tratamiento de imagen: color, luz, encuadre, grano, ratios |
| `06-user-journey.md` | Arco de 5 umbrales, audiencia, conversión, mapa de coherencia |
| `tokens.json` | Design tokens (primitive → semantic → component + theme por umbral) |

## Cómo usar este handoff
1. Leer `01` y `06` primero: entienden el ADN y el arco.
2. Consumir `tokens.json` en el sistema (CSS vars / Tailwind theme / Style Dictionary). **Los componentes usan `semantic`, nunca `primitive`.**
3. Construir cada componente según `03`, aplicando motion de `02`.
4. Texto e imagen: seguir `04` y `05` al pie.
5. Antes de cada PR, pasar el **gate anti-genérico** de `01 §7`.

## ADN en una línea
*Un umbral hacia un lugar reservado, donde el patrimonio asciende.*
**Altitud** organiza · **pertenencia** emociona · **rigor cálido** convence.

## Regla de oro
Si un competidor pudiera copiar la captura sin la narrativa de umbrales y pertenencia → todavía no es suficientemente propio.
