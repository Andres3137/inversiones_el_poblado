# CONTENT ARCHITECTURE — Inversiones El Poblado (MVP)
### Narrativa definitiva + arquitectura de secciones + recurso por sección · v1.0

> **Base de evidencia:** las 25 fotos, 4 planos, logo y 3 videos del Drive fueron inventariados; **las 25 fotos se revisaron visualmente** (ver `CONTENT_AUDIT.md` Fase 2). Dimensiones reales ≈ 1280px (una a 1599), mayoría verticales, celular.
> **Sistema de diseño INTACTO:** tokens, componentes, motion, tipografía, grid y UX de `/design` **no cambian**. Solo cambian **narrativa y contenido**.
> **MVP:** primera versión premium construida sobre el mejor material real, diseñada alrededor de sus límites. Sin IA, sin stock, sin inventar. Donde falte material → marcador `🟡 MATERIAL PENDIENTE`.

---

## 1 · Narrativa definitiva

**Producto real:** parcelaciones / villas campestres de **inversión en tierra** en el **Meta (Acacías, Villavicencio–Apiay)**. Lote propio, casa de campo, valorización, tranquilidad, patrimonio.

**Narrativa concreta (sin concepto poético).** Toda la comunicación gira en torno a **inversión en tierra · valorización · tranquilidad · crecimiento patrimonial**. La emoción nace del **potencial de invertir temprano** (entrar antes de que proyecto y zona se valoricen), no de una metáfora abstracta.
*(El sistema visual "El Umbral" no cambia; su paleta encaja natural: cobre = tierra, verde ladera = potrero, neutros cálidos = campo, grano fílmico = calidez.)*

**Un solo cambio de motivo en el sistema:** se retira la **cota `msnm`** (no hay altitud). Su lugar en la "columna de anotación" lo ocupa un dato con sentido: **N.º de lote · área (m²/ha) · % de valorización**. Todo lo demás del design system se mantiene.

**Pilares emocionales:** inversión en tierra · naturaleza · valorización · tranquilidad · patrimonio · campestre · Meta.

**Tono (de `04-copywriting.md`, reanclado):** sereno, seguro, culto, cálido. Sin urbano, sin altura, sin lujo de edificio. Lenguaje concreto de inversión: valorización, patrimonio, tierra propia, financiación, entrar temprano. Segunda persona reservada. Bilingüe ES/EN.

**Arco (reusa la estructura de 5 momentos del sistema, nueva piel):**
1. **La Tierra** (aspiración) → hero
2. **El Origen** (confianza / empresa Meta)
3. **Los Proyectos** (portafolio: Acacías principal + 3)
4. **El Progreso** (infraestructura → valorización = argumento de inversión)
5. **La Vida Campestre** (naturaleza, tranquilidad, personas)
6. **Echar Raíces** (invitación / CTA)

---

## 2 · Arquitectura de la landing (orden definitivo de secciones)

| # | Sección | Momento | Objetivo |
|---|---|---|---|
| 00 | **Navbar** | — | Marca + ES/EN + COP/USD + navegación |
| 01 | **Hero** | La Tierra | Impacto: video tratado, promesa "inversión en tierra que crece" |
| 02 | **Barra de confianza** | El Origen | Años, N.º proyectos, familias, respaldo (cifras 🟡) |
| 03 | **Quiénes somos** | El Origen | Inversiones El Poblado + territorio Meta |
| 04 | **Los Proyectos (overview)** | Los Proyectos | 4 tarjetas: Acacías (principal), Llanerita, Apiay, Villa Luisa |
| 05 | **Proyecto principal — Villas del Poblado (Acacías)** | Los Proyectos | Sección profunda: galería, plano, datos 🟡 |
| 06 | **El Progreso / Por qué valoriza** | El Progreso | Evidencia real: vías, redes, luz, portones → valorización |
| 07 | **Estadísticas de inversión** | El Progreso | Dato tallado: valorización %, m², financiación 🟡 |
| 08 | **¿Por qué invertir aquí?** | Decisión | Entorno + calidad de vida + tranquilidad + cercanía + proyección de valorización |
| 09 | **Comparativa de proyectos** | Los Proyectos | Tabla 4 proyectos (datos 🟡) |
| 10 | **Ubicación** | — | Mapa + accesos + coordenadas 🟡 |
| 11 | **El Círculo (testimonios)** | La Vida | Voces reales 🟡 MATERIAL PENDIENTE |
| 12 | **La Invitación (CTA)** | Echar Raíces | "Solicitar acceso al portafolio privado" |
| 13 | **Footer** | — | Marca, legales 🟡, contacto |

---

## 3 · Recurso por sección (mapeo a archivos reales)

Referencias por prefijo: `pob_`=Villas del Poblado/Acacías · `api_`=Apiay · `lla_`=Llanerita.

| Sección | Recurso principal | Alternativa / apoyo | Pendiente |
|---|---|---|---|
| 01 Hero | **Video Poblado 13MB** (tratado: overlay oscuro, grade cálido, slow, tipografía fuerte) | Fallback still: `lla_62ecc529` (atardecer) o `api_3a321c95` (portal, 1599px) | 🟡 Video dron horizontal + hero pro |
| 02 Confianza | — (tipografía + tokens) | — | 🟡 cifras reales |
| 03 Quiénes somos | `pob_de78818a` (cielo llanero) | `lla_9d95a741` | 🟡 foto equipo/oficina |
| 04 Proyectos overview | `pob_20d01bea` (casa terminada), `lla_9d95a741`, `api_3a321c95`, `plano_villaluisa` | por proyecto | 🟡 hero por proyecto |
| 05 Villas del Poblado | Galería: `pob_20d01bea`, `pob_9a8fbb4f`, `pob_eb801079`, `pob_e53a48cf`, `pob_68ac02ea` + `plano_villas_del_poblado` | resto pob_ | 🟡 dron + atardecer |
| 06 El Progreso | `pob_7c5a384e` (redes), `pob_6b7f4712` (luz), `api_25f6c062` (vía), `pob_68b9e44c` (portón) | `api_0e5e538c` | — |
| 07 Estadísticas | — (dato tallado, tokens) | — | 🟡 valorización %, m², financiación |
| 08 Vida Campestre | **`lla_62ecc529`, `lla_9d95a741`, `lla_a37d4cf4`, `pob_9a8fbb4f`** | `lla_f430e18f` | 🟡 personas/atardecer pro |
| 09 Comparativa | `plano_*` de cada proyecto | fotos representativas | 🟡 precios/áreas/financiación |
| 10 Ubicación | `api_3a321c95` (acceso), `pob_91ae985c` (acceso) | planos | 🟡 **mapa + coordenadas** |
| 11 Testimonios | — | — | 🟡 **testimonios + consentimiento** |
| 12 CTA | `lla_62ecc529` (fondo atardecer) | `pob_de78818a` | — |
| 13 Footer | `logoelpoblado.svg` | `logo_elpoblado.png` | 🟡 legales/registro |

**Villa Luisa:** solo tiene `plano_villaluisa.png`. En el MVP aparece como tarjeta en §04/§09 con estado "Próximamente" + 🟡 MATERIAL PENDIENTE. No tiene sección profunda hasta recibir fotos.

---

## 4 · Clasificación completa de fotografías (las 25, vistas)

Categorías: **Hero · Ubicación · Accesos · Lotes · Obra · Galería · Vida/Naturaleza · Planos · Uso limitado.** Ninguna se elimina.

### Villas del Poblado — Acacías
| Archivo | Dim/Orient | Contenido | Uso |
|---|---|---|---|
| `pob_20d01bea` | 960×1280 V | **Casa moderna terminada, atardecer** | Galería · Proyecto (destacada) |
| `pob_9a8fbb4f` | 1280×960 H | Familia caminando, cielo azul, montañas | Vida · Galería · Accesos |
| `pob_de78818a` | 960×1280 V | Cielo llanero dramático, vía | Fondo · Galería |
| `pob_68ac02ea` | 1280×719 H | Cimientos al atardecer, potrero | Obra · Galería |
| `pob_e53a48cf` | 960×1280 V | Cimientos + caballo, dusk azul | Obra · Galería |
| `pob_eb801079` | 1280×960 H | Casa 2 pisos en obra + auto | Obra · Proyecto |
| `pob_91ae985c` | 1280×960 H | Vía de acceso, sardinel | Accesos · Ubicación |
| `pob_245a9e50` | 960×1280 V | Lote con mojones + obra | Lotes · Obra |
| `pob_26e41844` | 1280×960 H | Estructura concreto/ladrillo | Obra |
| `pob_7c5a384e` | 1280×720 H | Zanja + redes (excavadora) | Obra · Progreso |
| `pob_2c715c11` | 1280×720 H | Placa + personas inspeccionando | Obra · Progreso |
| `pob_68b9e44c` | 960×1280 V | Portón negro + muro, cielo azul | Accesos |
| `pob_6b7f4712` | 960×1280 V | Postes de luz instalados | Progreso · Lotes |
| `pob_c0abf656` | 960×1280 V | Columnas rebar, dusk | Obra |
| `pob_68ac02ea (dup)` | 1280×719 H | Copia idéntica | Uso limitado (dedupe) |

### Villas de Apiay
| Archivo | Dim/Orient | Contenido | Uso |
|---|---|---|---|
| `api_3a321c95` | 1599×899 H | **Portal de acceso (mayor resolución)** | Accesos · Ubicación · Hero secundario |
| `api_213d7795` | 960×1280 V | Casa en obra gris + perro | Obra |
| `api_b7a63b5f` | 960×1280 V | Casa en obra + barril + perro | Obra |
| `api_0e5e538c` | 960×1280 V | Vía en construcción + maquinaria | Obra · Progreso |
| `api_25f6c062` | 960×1280 V | Vibrocompactador en vía | Obra · Progreso |
| `api_aeb58e17` | 591×1280 V | Base de piedra, recorte angosto | Uso limitado |

### Llanerita Campestre — Villavicencio
| Archivo | Dim/Orient | Contenido | Uso |
|---|---|---|---|
| `lla_62ecc529` | 960×1280 V | **Árbol al atardecer + reflejo en agua** | Vida/Naturaleza (joya) · Hero emocional · Fondo CTA |
| `lla_9d95a741` | 960×1280 V | Árbol frondoso, cielo azul | Vida/Naturaleza (top) · Fondo |
| `lla_a37d4cf4` | 960×1280 V | Árbol + caballos + estanque | Vida/Naturaleza (top) |
| `lla_f430e18f` | 960×1280 V | Cerca viva en potrero | Vida · Galería · Fondo |
| `lla_baf4312a` | 960×1280 V | Poste + lotes + cielo | Lotes · Progreso |

### Planos y marca
| Archivo | Uso |
|---|---|
| `plano_villas_del_poblado.png` (2.2MB) | Planos · Proyecto Acacías · Comparativa |
| `plano_villasdeapiay.png` (2.4MB) | Planos · Apiay |
| `plano_villaluisa.png` (1.5MB) | Planos · Villa Luisa (único recurso) |
| `planollaneriacampestre.jpg` (549KB) | Planos · Llanerita |
| `logoelpoblado.svg` | Marca (navbar/footer/OG) |
| `logo_elpoblado.png` | Marca (fallback/favicon) |

### Videos
| Archivo | Uso | Nota |
|---|---|---|
| Poblado `9243…mp4` (13MB) | **Hero (temporal, tratado)** | 🟡 QA de orientación/contenido pendiente |
| Llanerita `6d99…mp4` (4.6MB) | Fondo · Storytelling secundario | corto |
| Llanerita `e330…mp4` (3.4MB) | Fondo · Storytelling secundario | corto |

---

## 5 · Estrategia de Hero (material limitado → sensación premium)

Como no hay foto premium horizontal:
- **Base:** video Poblado 13MB como fondo de hero.
- **Tratamiento cinematográfico obligatorio:**
  - Overlay oscuro degradado (tokens `bg-overlay` / carbón) para unificar y dar contraste.
  - Grade cálido de marca + grano fílmico leve (`opacity-grain`).
  - Reproducción **muy lenta** (slow-mo / `playbackRate` reducido), loop, mute, `playsinline`.
  - **Tipografía monumental fuerte** encima (voz display), copy de tierra.
  - Movimiento de entrada lento (`--ep-dur-slow` / `ease-ascenso`), respeta `reduced-motion`.
- **Fallback (móvil / si el video no rinde):** still `lla_62ecc529` (atardecer) o `api_3a321c95` (portal, 1599px) con el mismo tratamiento.
- **Marcador:** 🟡 MATERIAL PENDIENTE — reemplazar por video dron horizontal + hero pro cuando llegue.

---

## 6 · Registro de MATERIAL PENDIENTE (marcadores para reemplazo)

| ID | Sección | Qué falta | Provisional actual |
|---|---|---|---|
| MP-01 | Hero | Video dron / hero horizontal pro | Video 13MB tratado |
| MP-02 | Confianza/Stats | Cifras: años, valorización %, m², financiación | Placeholders ocultos |
| MP-03 | Quiénes somos | Foto equipo/oficina | Cielo llanero |
| MP-04 | Proyectos | Hero pro por proyecto + atardecer | Mejores stills actuales |
| MP-05 | Villa Luisa | Fotos/video (solo hay plano) | Tarjeta "Próximamente" |
| MP-06 | Ubicación | Mapa + coordenadas lat,long | Fotos de acceso |
| MP-07 | Testimonios | Voces + consentimiento | Sección oculta/placeholder |
| MP-08 | Footer | Legales, registro, aliado financiero | Texto mínimo |
| MP-09 | Global | Originales sin comprimir ≥2500px | Stills ~1280px |

**Convención en código (fase siguiente):** cada marcador se implementa como bloque visible en modo desarrollo con etiqueta `MATERIAL PENDIENTE · MP-XX`, fácil de localizar y reemplazar.

---

## 7 · Notas y próximos pasos

- **Diseño intacto:** `/design` sigue siendo la fuente de verdad visual. Único ajuste de motivo: retirar cota `msnm` → dato de lote/área/valorización.
- **Reconciliar** `CONTENT_BLUEPRINT.md` (asumía Medellín) con esta arquitectura Meta.
- **Assets locales:** para construir hace falta copiar los recursos elegidos al repo (`/assets`). Puedo decodificar y guardar el set curado desde Drive.
- **Decisión abierta:** confirmar nombre de narrativa ("Arraigo") y el set final del hero.

**Siguiente entregable sugerido:** con esta arquitectura cerrada, pasar a **wireframe de bloques** (sin estilo) o directamente a implementación de la sección 01–02. Aún sin código hasta tu confirmación.
