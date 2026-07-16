# CONTENT AUDIT — Inversiones El Poblado
### Auditoría de contenido real (Google Drive) · v1.0
*Roles: Director de Arte · UX Designer · Content Strategist. No se diseñó interfaz.*

> **Fuente:** carpeta Drive "inversiones el poblado" (`10IxlAkx3Xpnuhdz5pX5LWfaE3p5WUWLD`), recorrida en su totalidad el 2026-07-13.
> **Método de calidad:** sin acceso a dimensiones en píxeles vía API; la evaluación se basa en **proxy objetivo** (peso/formato), **procedencia** (nombres, autor) y **contenido** (OCR/labels de Vision en planos). La QA visual pixel a pixel de cada foto queda **pendiente** (puede hacerse bajo solicitud). Ratings marcados *(inferido)* donde aplica.

---

## 🔴 Hallazgo crítico primero (bloquea toda la estrategia)

**Los proyectos NO están en El Poblado, Medellín. Están en el Meta (Llanos Orientales).**

| Carpeta | Ubicación real |
|---|---|
| villas_del_poblado_**acacias** | Acacías, Meta |
| llaneria_campestre_**villavicencio** | Villavicencio, Meta |
| villas_de_**apiay** | Apiay (Villavicencio), Meta |
| villa_luisa_campestre | Campestre — confirmar (probable Meta) |

- "Inversiones El Poblado" = **nombre de la empresa**, no la zona de Medellín.
- El plano de "Villas del Poblado" es un **loteo/parcelación** (manzanas y lotes numerados; labels Vision: *Hacienda, Suburb, Village, Bird's-eye view*).
- **Producto real:** parcelaciones / villas campestres para **inversión en lote y valorización** en clima cálido y terreno **plano**, no apartamentos de lujo en montaña.

**Consecuencia:** el sistema visual "El Umbral" (ascenso, altitud, cota msnm, loma, atardecer de Medellín) **queda invalidado en su metáfora**. La identidad debe re-anclarse a los Llanos (horizonte, llanura, campestre, cielo abierto, atardece llanero). Ver §6 y decisión pendiente en §5.

---

## 1 · Inventario

**Total: 33 archivos** — 1 logo SVG, 1 logo PNG, 4 planos, 25 fotos, 3 videos. **0 documentos** (sin precios, fichas ni textos).

### Marca (subcarpeta `inversiones_el_poblado`)
| Archivo | Tipo | Peso |
|---|---|---|
| logoelpoblado.svg | Logo vectorial | 888 KB |
| logo_elpoblado.png | Logo raster | 360 KB |

### Villas del Poblado — Acacías *(PRINCIPAL)* — 17 archivos
| Archivo | Tipo | Peso |
|---|---|---|
| plano_villas_del_poblado.png | Plano (loteo) | 2.24 MB |
| 15 × `*.jpg` (UUID) | Fotos | 128–250 KB c/u |
| 9243…mp4 | Video | 13.3 MB |
| *Nota:* `68ac02ea…` aparece **duplicado** (2 archivos idénticos, 128 KB) | | |

### Llanerita Campestre — Villavicencio — 8 archivos
| Archivo | Tipo | Peso |
|---|---|---|
| planollaneriacampestre.jpg | Plano | 549 KB |
| 5 × `*.jpg` (UUID) | Fotos | 190–310 KB |
| 6d99…mp4 · e330…mp4 | Videos | 4.6 MB · 3.4 MB |

### Villas de Apiay — 7 archivos
| Archivo | Tipo | Peso |
|---|---|---|
| plano_villasdeapiay.png | Plano | 2.40 MB |
| 6 × `*.jpg` (UUID) | Fotos | 135–250 KB |

### Villa Luisa Campestre — 1 archivo
| Archivo | Tipo | Peso |
|---|---|---|
| plano_villaluisa.png | Plano | 1.49 MB |
| **Sin fotos. Sin video.** | | |

---

## 2 · Calidad (evaluación por proxy objetivo)

**Escala:** Excelente · Bueno · Regular · No recomendable.

### Marca
| Recurso | Calidad | Motivo |
|---|---|---|
| logoelpoblado.svg | **Excelente** | Vectorial → escala infinita, ideal web/retina. Base de identidad. |
| logo_elpoblado.png | **Bueno** | Raster útil como fallback / favicon; verificar fondo transparente. |

### Planos
| Recurso | Calidad | Motivo |
|---|---|---|
| plano_villas_del_poblado.png (2.2MB) | **Bueno** *(inferido)* | Alta densidad; sirve como esquema de loteo / ubicación. Es técnico, **no** pieza premium. |
| plano_villasdeapiay.png (2.4MB) | **Bueno** *(inferido)* | Ídem. |
| plano_villaluisa.png (1.5MB) | **Regular** *(inferido)* | Único recurso del proyecto; técnico. |
| planollaneriacampestre.jpg (549KB) | **Regular** *(inferido)* | JPG comprimido, menor densidad que los PNG. |

### Fotografías (25)
| Rango de peso | Calidad prob. | Motivo |
|---|---|---|
| 240–310 KB | **Bueno / Regular** *(inferido)* | Resolución media; aptas para galería, cards, thumbs. Riesgo en hero a sangre. |
| 150–240 KB | **Regular** *(inferido)* | Compresión notable; uso secundario. |
| <150 KB | **Regular / No recomendable** *(inferido)* | Muy comprimidas; evitar full-bleed. |
| `68ac02ea` duplicado | **No recomendable** | Eliminar la copia. |

**Señales de procedencia (afectan calidad percibida):** nombres UUID (export de teléfono/mensajería), autor único `jjdiaza191` (celular del asesor), pesos bajos y homogéneos → **fotografía de celular sin dirección de arte**, probablemente diurna y sin tratamiento. Ninguna cumple, a priori, el estándar "premium editorial" del sistema de diseño sin reencuadre/regrade — y varias no alcanzarán ≥2400px para hero.

### Videos (3)
| Recurso | Calidad | Motivo |
|---|---|---|
| Poblado 9243…mp4 (13.3MB) | **Bueno** *(inferido)* | Mayor bitrate; clip corto usable como background/storytelling con recorte. |
| Llanerita 6d99…/e330…mp4 (4.6/3.4MB) | **Regular** *(inferido)* | Clips cortos, bitrate bajo; uso secundario / mute loop breve. |

> **QA visual pendiente:** confirmar orientación (H/V), nitidez, iluminación y contenido real de cada foto/video antes de asignación final. Recomendado revisar con los **originales sin comprimir**.

---

## 3 · Uso recomendado (provisional, sujeto a QA visual)

Asignación por rol lógico y proyecto. Se afina al ver cada pieza.

| Proyecto | Recurso | Uso sugerido |
|---|---|---|
| Poblado/Acacías | Video 13MB | Background hero (mute loop) / Storytelling |
| Poblado/Acacías | Fotos 240–250KB (mejores) | Galería · Sección del proyecto · Comparativa |
| Poblado/Acacías | Fotos <150KB | Thumbs · Redes sociales |
| Poblado/Acacías | plano PNG | Ubicación · Detalle de loteo |
| Llanerita | Videos cortos | Storytelling secundario / redes |
| Llanerita | Fotos 280–310KB | Sección del proyecto · Galería |
| Llanerita | plano | Ubicación |
| Apiay | Fotos 240–250KB | Sección del proyecto · Galería · Comparativa |
| Apiay | plano PNG | Ubicación |
| Villa Luisa | plano | Ubicación (único recurso) |
| Marca | logo SVG | Navbar · Footer · Favicon · OpenGraph |

**Vacíos de uso evidentes:** no hay candidatos claros para **Hero premium a sangre**, **Testimonios** (0 personas), ni **CTA con aire** de alta resolución. Ver §5.

---

## 4 · Recursos destacados (los mejores para una landing premium)

Con lo disponible hoy, el "top" utilizable:

1. **logoelpoblado.svg** — el activo más fuerte. Vectorial, base de toda la identidad.
2. **Video de Villas del Poblado (13.3MB)** — el recurso audiovisual con mejor bitrate; candidato a background/storytelling del proyecto principal (con recorte y grade).
3. **Planos PNG de Poblado y Apiay (2.2–2.4MB)** — buenos para la sección **Ubicación/Loteo** (diferenciador real: mostrar disponibilidad de lotes).
4. **Mejores fotos (~250KB) de Poblado y Apiay** — para galería y secciones de proyecto.

> Honestamente: **el material actual no basta para una landing "premium" de nivel internacional.** Alcanza para un sitio correcto de galería + info. El salto premium exige nueva producción (§5).

---

## 5 · Recursos faltantes (solicitar al cliente)

### Crítico
- **Textos de negocio (0 documentos):** propuesta de valor, **precios**, tamaños de lote/casa (m²), **financiación**, datos técnicos, estado/entrega — por los 4 proyectos.
- **Villa Luisa: material completo** (hoy solo tiene plano). Fotos + video o queda fuera de la landing.
- **Definición de identidad post-Llanos:** confirmar re-anclaje de marca (ver §6). Bloquea diseño.
- **Fotografía apta para Hero** — horizontal, ≥2400px, sin compresión.

### Alto
- **Fotografías con dron** — clave en parcelaciones: muestran extensión, lotes, entorno llanero. Hoy inexistentes (salvo el plano).
- **Fotos al atardecer** — el atardecer llanero es un activo emocional enorme; ninguna confirmada.
- **Videos horizontales** estabilizados 1080p+ (los actuales parecen verticales/celular).
- **Mapa de ubicación + coordenadas (lat,long)** por proyecto → componente Ubicación real.
- **Logo vectorial de cada proyecto** (hoy solo hay marca corporativa).
- **Datos duros con fuente** (valorización %, plusvalía de la zona) para cifras.

### Medio
- **Imagen del equipo / oficina** (confianza, "quiénes somos").
- **Fotografías de personas** disfrutando el entorno (familias, campestre) + autorizaciones.
- **Fotos de contexto** (vías de acceso, cercanía a Villavicencio/Acacías, amenidades).
- **Testimonios** de compradores + consentimiento escrito.
- **Información legal** (registro, aliado financiero, disclaimers de inversión).

### Bajo
- Renders de casas modelo si el producto incluye construcción.
- Material OpenGraph/redes.

---

## 6 · Storytelling (con el material existente + re-anclaje a los Llanos)

La narrativa "El Umbral / ascenso de montaña" **se descarta**. Se conserva su **estructura de arco** y su alma (**pertenencia + inversión**), re-anclada al paisaje real: **el horizonte llanero, el terreno propio, la vida campestre, la valorización.**

**Nuevo hilo conductor propuesto: "El Horizonte" — de la extensión abierta al terreno propio.**
En los Llanos el lujo no es la altura: es el **espacio, el cielo abierto y la tierra propia**. La metáfora pasa de *ascender* a *extenderse / echar raíces*.

**Arco (reusa la lógica de umbrales, nueva piel):**
1. **El Llano** (antes Ascender) — abrir con la inmensidad: horizonte, cielo, atardecer llanero. Aspiración de espacio.
2. **La Parcelación** (Descubrir) — mostrar el proyecto: loteo (planos), entorno, ubicación cerca de Villavicencio/Acacías.
3. **Pertenecer** — la vida campestre, tu terreno, el círculo de propietarios. (Requiere fotos de personas/atardecer → faltantes.)
4. **Invertir** — valorización de la tierra en el Meta, precios, financiación, comparativa entre los 4 proyectos. (Requiere datos → faltantes.)
5. **Echar raíces** (antes Permanecer) — permanencia: tu lote, tu casa de campo, tu inversión que crece. Invitación.

**Qué soporta hoy cada capítulo:**
| Capítulo | Soporte actual | Falta |
|---|---|---|
| El Llano | Video Poblado (parcial) | Dron, atardecer, hero H |
| La Parcelación | Planos PNG, fotos entorno | Mapa, coordenadas |
| Pertenecer | — | Personas, atardecer, testimonios |
| Invertir | Comparativa (4 proyectos) | **Precios, m², financiación, valorización** |
| Echar raíces | Logo, cierre | CTA visual, legales |

**Regla:** el proyecto **principal es Villas del Poblado (Acacías)**; los otros 3 se presentan como portafolio/comparativa. Villa Luisa entra solo si llega material.

---

## 7 · Conclusión y próximos pasos

**Estado del contenido:** suficiente para un sitio informativo de portafolio; **insuficiente para "premium internacional"** sin nueva producción (dron, atardecer, hero H, personas) y sin los **textos/precios** (hoy 0 documentos).

**Bloqueantes antes de UX/UI:**
1. Confirmar re-anclaje de identidad **Llanos** (retirar/adaptar "El Umbral" → "El Horizonte").
2. Recibir **textos y precios** de los 4 proyectos.
3. Completar **Villa Luisa** o excluirla.
4. Producir/solicitar **hero + dron + atardecer**.
5. Limpiar duplicado (`68ac02ea`) y renombrar assets con convención semántica.

**Reconciliar** este audit con `/design` (sistema) y `CONTENT_BLUEPRINT.md`: ambos asumían El Poblado-Medellín y deben actualizarse a la realidad Llanos.

> Este documento es la base de contenido para la fase de UX/UI. Ningún componente se construye sobre datos marcados como faltantes.

---

# FASE 2 · Auditoría visual (muestra descargada y vista) — v1.1

> **Método:** se descargaron y **revisaron visualmente** 4 imágenes representativas (rango de peso + 3 proyectos con fotos). Dimensiones reales extraídas del archivo. El sistema de diseño / tokens / componentes / motion / grid **no se toca**: solo se evalúa contenido. La narrativa definitiva queda **pendiente de validación conjunta** con el negocio real.

## A · Muestra evaluada (hechos, no inferencia)

| Muestra | Dimensiones | Orientación | Contenido | Composición | Iluminación | Resolución |
|---|---|---|---|---|---|---|
| Poblado `91ae985c` | 1280×960 (1.2 MP) | Horizontal | Vía de acceso, sardinel amarillo, postes azules, alambre de púas, vehículos, montañas al fondo | Débil (cableado/púas cruzan, sardinel domina) | Plana, cielo gris | Baja |
| Poblado `245a9e50` | 960×1280 (1.2 MP) | Vertical | Lote en pasto con mojones, casas en obra gris al fondo, portón | Documental, sin foco | Plana, gris | Baja |
| Apiay `213d7795` | 960×1280 (1.2 MP) | Vertical | Casa en **obra gris** sobre placa, grava, perro | De obra/registro | Nublada suave | Baja |
| Llanerita `f430e18f` | 960×1280 (1.2 MP) | Vertical | Cerca viva en potrero verde, palmas al horizonte | La mejor (línea guía) | Cielo azul parcial, mejor luz | Baja |

**Conclusiones de la muestra (aplican al set completo por homogeneidad de origen):**
- Resolución techo ≈ **1.2 MP (lado mayor ~1280px)** → **inviable para hero a sangre** (que exige ~2500–3840px de ancho).
- **Mayoría vertical** (celular) → no encaja en heroes/banners horizontales sin recorte agresivo.
- **Fotografía documental de celular**, sin dirección de arte: ruido visual (cableado, púas, sardineles, escombros, animales, vehículos), luz plana/nublada.
- **Etapa temprana de obra**: vías, lotes con mojones, casas en obra gris. No hay producto terminado atractivo.
- Sin material de atardecer, sin dron, sin personas, sin interiores.

## B · Clasificación por uso (muestra vista + criterio extrapolado)

| Recurso | Hero | Fondo | Galería | Proyecto | CTA | No recom. |
|---|:--:|:--:|:--:|:--:|:--:|:--:|
| Poblado `91ae985c` (acceso) | — | ▲ (con overlay fuerte) | ✓ | ✓ ubicación/acceso | — | — |
| Poblado `245a9e50` (lote/obra) | — | — | ▲ | ✓ documental | — | riesgo |
| Apiay `213d7795` (obra gris) | — | — | ✓ | ✓ avance de obra | — | — |
| Llanerita `f430e18f` (potrero) | — | ✓ (mejor candidato) | ✓ | ✓ | ▲ | — |
| **Resto de fotos (extrapolado)** | ✗ ninguna | ▲ puntual | ✓ galería/thumbs | ✓ secciones | ✗ | varias |
| Video Poblado 13MB | ▲ fondo mute | ✓ | — | ✓ storytelling | — | — |
| Videos Llanerita cortos | — | ▲ | — | ✓ secundario | — | — |

Leyenda: ✓ apto · ▲ apto con reservas/tratamiento · ✗/— no.

**Veredicto de cobertura:** **0 recursos aptos para Hero premium.** Hero, CTA de alto impacto y cualquier "wow" visual **no tienen material hoy** → requieren producción nueva.

## C · Lista precisa de recursos a solicitar para nivel premium

**Prioridad 1 — imprescindibles (sin esto no hay landing premium):**
1. **Fotografía profesional con dron** de cada proyecto (extensión, loteo, entorno, vías) — horizontal, ≥3840px.
2. **Hero horizontal profesional** por proyecto — cámara real, ≥2500px ancho, luz cuidada.
3. **Sesión al atardecer llanero** (golden hour) — el mayor activo emocional disponible en la región.
4. **Textos + precios + m² + financiación** de los 4 proyectos (siguen en 0 documentos).
5. **Villa Luisa:** set completo de fotos/video (hoy solo plano).

**Prioridad 2 — elevan mucho:**
6. **Casas modelo terminadas** (interior + exterior) o **renders** si aún es obra gris — hoy solo se ve construcción.
7. **Personas disfrutando el entorno** (familias, vida campestre) + autorizaciones → habilita "Pertenecer/Testimonios".
8. **Video horizontal estabilizado 1080p+** (recorrido dron + tierra), con y sin audio.
9. **Mapa + coordenadas (lat,long)** por proyecto → sección Ubicación real.

**Prioridad 3 — completan:**
10. Fotos de **amenidades** y **vías de acceso/contexto** (cercanía a Villavicencio/Acacías).
11. **Equipo/oficina** para confianza.
12. **Testimonios** con consentimiento.
13. **Datos de valorización de la zona** con fuente.

**Guía técnica de captura (para el fotógrafo):** horizontal para heroes; ≥2500px lado mayor; evitar cableado/púas/sardineles en primer plano; buscar hora dorada; incluir cielo llanero amplio; tomas limpias de lotes y del producto terminado.

## D · Nota de proceso
- Sistema de diseño, tokens, componentes, motion, tipografía, grid: **intactos** (según instrucción).
- Cambian solo **narrativa y contenido**, y se definirán **conjuntamente** tras esta auditoría, sin asumir conceptos no validados.
- Archivos de trabajo de la muestra guardados en scratchpad (no en el repo).
