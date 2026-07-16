# Motion System — "El Umbral"
### Inversiones El Poblado · v1.0

El movimiento **significa** (altitud / admisión). Nunca decora. Nada rebota. Todo respeta `prefers-reduced-motion`.

---

## 1 · Curvas de easing (nombradas por concepto)

| Token | Curva | Uso |
|---|---|---|
| `--ep-ease-ascenso` | `cubic-bezier(0.22, 1, 0.36, 1)` | Subir suave (easeOutExpo). Reveals, count-up. |
| `--ep-ease-umbral` | `cubic-bezier(0.83, 0, 0.17, 1)` | Cruzar puerta (easeInOutQuart). Transición entre etapas, modales, footer. |
| `--ep-ease-revelado` | `cubic-bezier(0.16, 1, 0.3, 1)` | Emerge desde abajo. Entradas de contenido. |
| `--ep-ease-standard` | `cubic-bezier(0.4, 0, 0.2, 1)` | Layout, utilidades. |

---

## 2 · Duraciones

| Token | Valor | Uso |
|---|---|---|
| `--ep-dur-instant` | 120ms | Press / feedback micro |
| `--ep-dur-fast` | 240ms | Hover, focus, color/borde |
| `--ep-dur-base` | 360ms | Reveal de UI, layout |
| `--ep-dur-slow` | 560ms | Reveal de sección (ascenso), count-up |
| `--ep-dur-umbral` | 760ms | Transición de admisión entre etapas |

---

## 3 · Variables de apoyo
```
--ep-shift-reveal   24px    (desplazamiento de entrada desde abajo)
--ep-parallax-ratio 0.12    (fondo/foto sube más lento que la página)
--ep-stagger        60ms    (retardo entre elementos en secuencia)
--ep-magnet-max     6px     (desplazamiento máximo del efecto magnético)
```

---

## 4 · Comportamientos documentados

### Transitions
- Color / borde / opacidad: `--ep-dur-fast` con `--ep-ease-fast`.
- Layout / posición: `--ep-dur-base` con `--ep-ease-standard`.
- Regla: transicionar propiedades compuestas (`transform`, `opacity`) — evitar animar `width/height/top/left`.

### Scroll
- Narrativa por umbrales. Scroll deliberado y pausado, **sin snap agresivo**.
- Cada umbral entra como una etapa; el usuario percibe que avanza *hacia adentro*, no que baja.
- Indicador de cota (`msnm`) que asciende con el progreso.

### Hover
- Botones: efecto magnético `≤ --ep-magnet-max`, borde cobre fade-in `--ep-dur-fast`.
- Imágenes (cards): zoom 2–3% con `--ep-ease-standard`.
- Cards: `translateY(-4px)` + reveal de dato secundario.
- Links: subrayado cobre que crece de izquierda a derecha.

### Reveal
- Elementos emergen desde abajo (`--ep-shift-reveal`) con `--ep-ease-revelado`.
- Secuencias con `--ep-stagger` (60ms) entre hijos.
- Trigger: al entrar en viewport (una sola vez; no re-animar en cada scroll).

### Parallax
- Foto de fondo / hero sube a `--ep-parallax-ratio` respecto a la página → sensación física de altitud.
- Solo en capas de imagen amplias; nunca en texto de lectura.

### Umbral (interacción firma)
- Transición de admisión entre etapas: **estrechar → oscurecer breve → abrir más adentro**.
- Duración `--ep-dur-umbral` (760ms), curva `--ep-ease-umbral`.
- La luz se entibia al cruzar (frío → cálido). Es el momento que el usuario recuerda.

### Count-up (datos)
- Cifras ascienden desde 0 al entrar en viewport: `--ep-dur-slow` `--ep-ease-ascenso`.
- El número "sube" como sube la altitud y el patrimonio.

### La Línea de Nivel
- Trazo topográfico continuo que se **dibuja** conforme se asciende (`stroke-dashoffset`).
- Al cruzar el umbral "Pertenecer" se cierra en sello/recinto.

---

## 5 · Accesibilidad de motion

`@media (prefers-reduced-motion: reduce)`:
- Transición de umbral → fundido simple 240ms.
- Parallax desactivado (posición estática).
- Count-up → valor final instantáneo.
- Reveals → fade sin desplazamiento.
- Sin efecto magnético ni zoom en hover.

**Regla:** ninguna información depende exclusivamente del movimiento. El contenido es legible y completo sin animación.
