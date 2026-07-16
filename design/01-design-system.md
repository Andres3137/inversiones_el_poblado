# Sistema de Diseño "El Umbral"
### Inversiones El Poblado — Documento maestro · v1.0

> Handoff para desarrollo. Este archivo define fundamentos. Ver también:
> `02-motion.md` · `03-components.md` · `04-copywriting.md` · `05-photo-direction.md` · `06-user-journey.md` · `tokens.json`

---

## 1 · Filosofía visual

**ADN:** *un umbral hacia un lugar reservado, donde el patrimonio asciende.*

Tres fuerzas gobiernan cada decisión:

- **Pertenencia** (el alma) — no vendemos propiedades, damos acceso a un círculo. El usuario debe sentir que *entró*, no que *navegó*.
- **Altitud** (el hilo) — la ciudad y el valor suben por la loma de El Poblado. El recorrido es un ascenso silencioso que estructura todo sin volverse el tema.
- **Rigor cálido** (la voz) — datos irrefutables tratados con calidez editorial. Confianza de banca privada, temperatura de hogar de lujo.

Destilamos la disciplina de los mejores (jerarquía de Apple, rigor de datos de Stripe, precisión de Linear, emoción espacial de Airbnb, silencio de Aman) pero **no heredamos la cara de ninguno.** Objetivo: *"jamás había visto una inmobiliaria con este nivel."*

---

## 2 · Principios

### Siempre
- Una idea por pantalla. La jerarquía *es* la interfaz.
- El aire es el lujo. Espaciar de más antes que de menos.
- El dato como escultura: cifras aisladas, talladas, verificables.
- Tratar al usuario como miembro, no como prospecto.
- La luz calienta con el avance (frío afuera → cálido adentro).
- Materiales nobles reales por encima de gráfico.
- Respetar `prefers-reduced-motion` y contraste AA, siempre.

### Nunca
- Hero "titular centrado + 2 botones + gradiente".
- Gradientes morado-azul SaaS, mesh, glows neón, blobs.
- Stock corporativo (poses de ejecutivos, rascacielos genéricos).
- Íconos rellenos multicolor, emojis en secciones serias, badges "🚀".
- Esquinas muy redondeadas + sombras suaves por todo (look "IA").
- Carruseles automáticos, animación decorativa sin significado.
- Cifras sin respaldo.
- CTA "Enviar/Contáctanos" → siempre "Solicitar acceso".
- Catálogo infinito. Curaduría, no volumen.

---

## 3 · Sistema tipográfico

**Cuatro voces con roles fijos:**

| Token familia | Fuente | Rol |
|---|---|---|
| `--ep-font-display` | Canela / Reckless | Monumental (titulares-arquitectura) |
| `--ep-font-serif-text` | Freight Text / Lyon | Íntima (cuerpo cálido, Pertenecer+) |
| `--ep-font-sans` | Söhne / Neue Haas Grotesk | UI / cuerpo neutro |
| `--ep-font-mono` | Söhne Mono / Diatype Mono | Cotas, datos, labels |

### Escala modular — ratio 1.25, base 16px

| Token | px / rem | Peso | Interlineado | Tracking | Familia |
|---|---|---|---|---|---|
| `fs-display-1` | 88 / 5.5 | 300 | 1.02 | −0.03em | display |
| `fs-display-2` | 64 / 4.0 | 300 | 1.05 | −0.02em | display |
| `fs-h1` | 48 / 3.0 | 400 | 1.1 | −0.02em | display |
| `fs-h2` | 36 / 2.25 | 400 | 1.15 | −0.01em | display |
| `fs-h3` | 28 / 1.75 | 400 | 1.3 | 0 | serif-text |
| `fs-data-xl` | 72 / 4.5 | 400 | 1.0 | −0.01em | mono |
| `fs-body-lg` | 20 / 1.25 | 400 | 1.6 | 0 | serif-text |
| `fs-body` | 16 / 1.0 | 400 | 1.6 | 0 | sans |
| `fs-caption` | 13 / 0.8125 | 500 | 1.4 | +0.08em ↑ | mono |
| `fs-micro` | 11 / 0.6875 | 500 | 1.3 | +0.12em ↑ | mono |

- **Pesos:** display 300/400 (nunca bold pesado — el lujo es fino). Sans 400/500/600. Mono 400/500.
- **Ritmo vertical:** baseline de 8px. Todo margen tipográfico es múltiplo (8/16/24/32/48).
- **Overline mono:** `uppercase` + tracking ↑.
- **Medida de lectura:** 60–72 caracteres (`--ep-editorial-max: 720px`).
- **Firma tipográfica:** tensión *serif monumental ↔ mono técnica*. Toda sección de dato combina ambas.

---

## 4 · Sistema de color (Design Tokens)

Valores completos en `tokens.json`. Resumen semántico:

### Primitivos (rampas)
- **Neutros cálidos "Carbón → Marfil":** `carbon-950 #0D0B09` … `carbon-400 #8A827A` (Bruma) … `carbon-50 #EDE6DA` (Marfil) … `carbon-25 #F6F1E9`.
- **Oro cobre (acento único):** `copper-700 #7A5230` → `copper-500 #B07A48` (base) → `copper-200 #EAD6C0`.
- **Verde ladera (solo dato positivo):** `ladera-700 #1D2A22` → `ladera-600 #2E4034` (base) → `ladera-300 #7A9482`.
- **Señales (desaturadas):** `danger #8C3B34` · `warning #A9793B` · `info #4A5A6A`.

### Semánticos (rol)
```
bg-base       carbon-900   (umbral frío)
bg-warm       carbon-50    (umbral cálido)
bg-inset      carbon-950
bg-overlay    rgba(13,11,9,.72)
surface-1     carbon-800
surface-2     carbon-700
surface-warm  carbon-25
accent        copper-500   / hover copper-400 / press copper-600
text-primary  carbon-50    text-secondary carbon-300  text-muted carbon-400  text-on-warm carbon-900
success       ladera-600   success-fg ladera-300
border        carbon-700   border-warm copper-200   border-focus copper-400
```

### Opacidades
`disabled .38` · `muted .64` · `veil .72` · `hover-tint .08` · `grain .06`

### Shadows (cálidas, teñidas de carbón)
```
elev-1  0 1px 2px  rgba(13,11,9,.20)
elev-2  0 4px 16px rgba(13,11,9,.24)
elev-3  0 12px 40px rgba(13,11,9,.30)
elev-warm  0 8px 32px rgba(122,82,48,.14)
elev-focus 0 0 0 1.5px copper-400 (+offset 3px)
```

**Ley de proporción cromática:** 90% neutro · 8% cobre · 2% verde. Verde ladera **solo** en dato positivo.

### Color por estados (aplica a todo interactivo)
| Estado | Tratamiento |
|---|---|
| default | color semántico base |
| hover | +1 paso luminosidad · borde `accent` fade-in 240ms |
| focus-visible | anillo 1.5px `copper-400` + offset 3px (nunca glow azul de sistema) |
| active/press | −1 paso lum · escala 0.98 |
| disabled | opacidad .38 · sin sombra |
| selected | subrayado cobre 1px + peso +100 |
| error | borde `danger` 1px + caption mono |

---

## 5 · Espaciado, grid y ritmo

### Escala base 4px
`0·4·8·12·16·24·32·48·64·96·128·160·200` (`space-0 … space-12`)

### Grid
```
grid-cols     12
grid-gutter   24px desktop / 16px móvil
grid-margin   clamp(20px, 6vw, 120px)
content-max   1240px
editorial-max 720px    (texto de lectura íntimo)
bleed-max     1600px   (foto a sangre)
```
**Columna de anotación:** 2 cols reservadas a izquierda para cotas / `msnm` / numeración de sección (sello del sistema). Contenido en 8–10 cols. Full-width solo foto a sangre.

### Breakpoints
```
xs ≤479  ·  sm 480–767  ·  md 768–1023  ·  lg 1024–1439  ·  xl ≥1440
```
Mobile-first.

### Ritmo "El Umbral"
Separación entre umbrales: **mín. 128px móvil / 200px desktop** (`space-10`→`space-12`). Densidad interna de componente usa 1–6; el aire entre etapas usa 9–12.

---

## 6 · Iconografía

Sistema propietario (descartado Feather/Lucide multicolor).
```
Estilo    línea abierta, geometría de curva de nivel (esquinas de contorno)
Espesor   stroke 1.5px (1.25px en tamaño 16)
Radio     linecap/linejoin round
Grid      24px con keyline 20px
Color     monocromático currentColor; máx. 1 detalle copper-500; nunca relleno pleno
Tamaños   16 · 20 · 24 · 32
Set base  cota/pin · ascenso/flecha · llave · documento · escudo (custodia) · COP/USD · idioma
Prohibido rellenos multicolor · emojis · 3D · duotono genérico
```

---

## 7 · Reglas — lo que rompería la identidad

Gate de revisión (cualquiera = rechazo):
1. Esquinas excesivamente redondeadas / sombras difusas por todo.
2. Gradiente SaaS, mesh, glow neón, blob.
3. Color fuera de paleta; verde ladera decorativo.
4. Romper proporción 90/8/2.
5. Hero centrado + dos botones + gradiente.
6. Stock genérico, poses corporativas, edificios que no son Medellín.
7. Íconos multicolor/rellenos, emojis, badges de marketing.
8. Cifras sin respaldo.
9. CTA transaccional ("Enviar", "Comprar ya").
10. Catálogo masivo en vez de curaduría.
11. Animación sin significado; rebotes; auto-play; ignorar `reduced-motion`.
12. Densidad que mata el aire entre umbrales.
13. Bold pesado en display.
14. Múltiples ideas compitiendo en una pantalla.
15. Diálogos nativos del navegador (alert/confirm).

**Prueba de fuego:** ¿un competidor podría copiar esta captura sin la narrativa de umbrales y pertenencia? Si sí → no es suficientemente propio.
