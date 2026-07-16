# WIREFRAME FUNCIONAL — Inversiones El Poblado (MVP)
### Estructura completa por sección · v1.0

> **Narrativa (ajustada):** concreta, sin concepto poético. Todo gira en torno a **inversión en tierra · valorización · tranquilidad · crecimiento patrimonial**. La emoción nace del **potencial de invertir temprano** (entrar antes de que el proyecto y la zona se valoricen), no de una metáfora.
> **Sistema de diseño:** `/design` intacto (tokens, componentes, motion, tipografía, grid). Sin cota `msnm`; su lugar lo ocupa **N.º lote · m²/ha · % valorización**.
> **Recursos:** rutas reales en `/assets`. Faltantes = `🟡 MP-XX` (ver `CONTENT_ARCHITECTURE.md §6`).
> Cada sección: **objetivo de negocio · contenido · recursos · componentes · CTA · relación con la siguiente**.

Leyenda componentes (de `03-components.md`): Navbar · Hero · Buttons · Cards · PropertyCards · Gallery · Statistics · Testimonios · CTA(Invitación) · Footer · Inputs · Modales.

---

## 00 · NAVBAR  `[sticky/truncating]`
- **Objetivo de negocio:** orientación permanente + conversión siempre a la vista.
- **Contenido:** logo · enlaces (Proyectos · Por qué invertir · Ubicación · Contacto) · toggle ES/EN · selector COP/USD · botón CTA.
- **Recursos:** `assets/marca/logo/logo_el-poblado.svg`.
- **Componentes:** Navbar (truncating + blur al scroll) · Button `primary` (mini).
- **CTA:** "Solicitar información" → ancla a §12.
- **→ Siguiente:** transparente sobre el Hero; se compacta al bajar.

## 01 · HERO — "Invierte en tierra que se valoriza"  `[100vh]`
- **Objetivo de negocio:** captar en 3s la promesa: tierra propia en el Meta con potencial de valorización. Empujar a explorar y a contactar.
- **Contenido:** titular monumental (ej. *"La tierra es la inversión que no deja de crecer"*), subtítulo concreto (parcelaciones campestres en Acacías y Villavicencio · desde lote propio), 1 CTA primario + 1 secundario. Dato ancla 🟡 (ej. "desde $XX / m²", "valorización +X% anual").
- **Recursos:** **Video Poblado 13MB tratado** (overlay oscuro, grade cálido, grano, slow-mo, mute, loop) `🟡 MP-01` (pendiente copiar a `/assets/villas-del-poblado/videos/`). **Fallback/mobile:** `assets/llanerita-campestre/fotos/llanerita_arbol-atardecer-reflejo.jpg`.
- **Componentes:** Hero (variante fondo-video) · Buttons (`primary`+`ghost`) · overlay/grade (tokens).
- **CTA:** primario "Solicitar información" (→§12) · secundario "Ver proyectos" (→§04).
- **→ Siguiente:** el scroll entra a la barra de confianza que respalda la promesa con cifras.

## 02 · BARRA DE CONFIANZA  `[banda]`
- **Objetivo de negocio:** dar respaldo inmediato (reduce el "¿son serios?").
- **Contenido:** 3–4 cifras: años de trayectoria · N.º de proyectos (4) · familias/inversionistas · respaldo. `🟡 MP-02` cifras reales.
- **Recursos:** solo tipografía + tokens (sin foto).
- **Componentes:** Statistics (versión compacta, count-up) · línea `border`.
- **CTA:** ninguno (banda de apoyo).
- **→ Siguiente:** de la confianza en la empresa → quién es y dónde opera.

## 03 · QUIÉNES SOMOS — Inversiones El Poblado en el Meta
- **Objetivo de negocio:** construir autoridad local (conocen el territorio = menor riesgo percibido).
- **Contenido:** párrafo breve de la empresa + foco territorial (Meta: Acacías, Villavicencio–Apiay). Mensaje: "acompañamos tu inversión en tierra".
- **Recursos:** `assets/villas-del-poblado/fotos/poblado_cielo-llanero.jpg` (o `llanerita_arbol-cielo-azul.jpg`). `🟡 MP-03` foto equipo/oficina.
- **Componentes:** bloque editorial (texto `serif-text` + foto) · Cards de valores (3).
- **CTA:** "Conoce los proyectos" → §04.
- **→ Siguiente:** presenta el portafolio de 4 proyectos.

## 04 · LOS PROYECTOS (overview)
- **Objetivo de negocio:** mostrar oferta y jerarquía (Acacías = principal); repartir tráfico a cada proyecto.
- **Contenido:** 4 PropertyCards: **Villas del Poblado (Acacías)** destacada · Llanerita Campestre · Villas de Apiay · Villa Luisa (estado "Próximamente" `🟡 MP-05`). Cada card: foto, nombre, ubicación, dato clave 🟡 (desde/área), etiqueta.
- **Recursos:** `poblado_casa-terminada-atardecer.jpg` · `llanerita_arbol-cielo-azul.jpg` · `apiay_portal-acceso.jpg` · `plano_villa-luisa.png` (temporal Villa Luisa).
- **Componentes:** PropertyCards (grid) · hover reveal.
- **CTA:** por card "Ver proyecto" → §05 (Acacías) / anclas por proyecto.
- **→ Siguiente:** profundiza en el proyecto principal.

## 05 · PROYECTO PRINCIPAL — Villas del Poblado (Acacías)
- **Objetivo de negocio:** vender el proyecto estrella: producto, avance real, plano de lotes.
- **Contenido:** intro + galería + plano de loteo + ficha de datos 🟡 (área lote, precios, financiación, estado).
- **Recursos:** galería `poblado_casa-terminada-atardecer.jpg`, `poblado_familia-acceso.jpg`, `poblado_casa-dospisos-obra.jpg`, `poblado_cimientos-atardecer.jpg`, `poblado_estructura-obra.jpg` + `assets/villas-del-poblado/planos/plano_villas-del-poblado.png`. `🟡 MP-04` hero pro + dron.
- **Componentes:** Gallery (scroll inmersivo) · PropertyCard detalle · Statistics (ficha) · Cards.
- **CTA:** "Solicitar disponibilidad y precios" → §12.
- **→ Siguiente:** responde por qué esta inversión rinde (progreso → valorización).

## 06 · EL PROGRESO — La valorización se está construyendo
- **Objetivo de negocio:** convertir la limitación (obra en etapa temprana) en **argumento**: hay infraestructura real avanzando → la tierra se valoriza → **entrar temprano conviene**.
- **Contenido:** narrativa de evidencia: vías, redes de servicios, iluminación, portones, primeras casas. Mensaje: "el que invierte hoy compra al precio de antes".
- **Recursos:** `poblado_redes-zanja.jpg` (redes) · `poblado_postes-luz.jpg` (iluminación) · `apiay_via-compactador.jpg` (vías) · `poblado_porton-acceso.jpg` (acceso) · apoyo `apiay_via-maquinaria.jpg`.
- **Componentes:** Gallery/storytelling con captions · Cards de hitos · timeline simple.
- **CTA:** "Quiero invertir en esta etapa" → §12.
- **→ Siguiente:** cuantifica el argumento con cifras.

## 07 · ESTADÍSTICAS DE INVERSIÓN
- **Objetivo de negocio:** dar el dato racional que cierra la cabeza: valorización, ticket de entrada, financiación.
- **Contenido:** 3–4 datos tallados: % valorización zona/proyecto · precio desde (m²) · plan de financiación · plazo. `🟡 MP-02` cifras con fuente.
- **Recursos:** sin foto (dato tallado, tokens). Verde `success` solo en positivo.
- **Componentes:** Statistics (dato-escultura, count-up, retícula técnica).
- **CTA:** "Solicitar el plan de inversión" → §12.
- **→ Siguiente:** de la razón a la vida real: por qué invertir aquí.

## 08 · ¿POR QUÉ INVERTIR AQUÍ?  *(antes "Vida Campestre")*
- **Objetivo de negocio:** responder directo la pregunta de decisión, uniendo emoción y valor. Empuja la conversión combinando entorno + proyección.
- **Contenido:** 5 ejes en bloques: **entorno natural · calidad de vida · tranquilidad · cercanía (Villavicencio/Acacías, vías) · proyección de valorización**. Cada eje: 1 frase concreta + imagen. Cierra con "invertir temprano = mayor potencial".
- **Recursos (las joyas):** `llanerita_arbol-atardecer-reflejo.jpg` (tranquilidad) · `llanerita_arbol-cielo-azul.jpg` (entorno) · `llanerita_arbol-caballos-estanque.jpg` (calidad de vida) · `poblado_familia-acceso.jpg` (vida/personas) · `poblado_via-acceso.jpg` / `apiay_portal-acceso.jpg` (cercanía/acceso).
- **Componentes:** bento/feature-grid · Cards con imagen · Statistics mini (proyección) · scroll reveal.
- **CTA:** "Agenda una visita" / "Solicitar información" → §12.
- **→ Siguiente:** permite comparar los 4 proyectos para elegir.

## 09 · COMPARATIVA DE PROYECTOS
- **Objetivo de negocio:** facilitar la elección y hacer up-sell/cross-sell entre proyectos.
- **Contenido:** tabla 4 proyectos × campos (ubicación · desde · área · financiación · estado · diferenciador). `🟡 MP-02/05` datos.
- **Recursos:** planos + miniaturas (`plano_*`, fotos representativas por proyecto).
- **Componentes:** tabla comparativa (retícula técnica) · PropertyCards mini.
- **CTA:** "Hablar con un asesor" → §12.
- **→ Siguiente:** ubicar los proyectos en el territorio.

## 10 · UBICACIÓN
- **Objetivo de negocio:** resolver la duda geográfica (cercanía = valor) y dar confianza de lugar real.
- **Contenido:** mapa + accesos + distancias a Villavicencio/Acacías. `🟡 MP-06` mapa interactivo + coordenadas.
- **Recursos:** `apiay_portal-acceso.jpg`, `poblado_via-acceso.jpg` (accesos) + planos. Mapa pendiente.
- **Componentes:** bloque mapa (placeholder MP-06) · Cards de acceso · lista de distancias.
- **CTA:** "Cómo llegar / agendar visita" → §12.
- **→ Siguiente:** prueba social (quiénes ya invirtieron).

## 11 · EL CÍRCULO (testimonios)  `🟡 MP-07`
- **Objetivo de negocio:** validación social que reduce el riesgo final antes de contactar.
- **Contenido:** 2–3 voces reales de compradores + consentimiento. Sección oculta/placeholder hasta recibir material.
- **Recursos:** ninguno hoy (MP-07). Placeholder discreto en dev.
- **Componentes:** Testimonios (editorial, fade/blur).
- **CTA:** "Solicitar acceso al portafolio privado" → §12.
- **→ Siguiente:** la invitación final.

## 12 · LA INVITACIÓN (CTA principal)
- **Objetivo de negocio:** conversión: capturar el lead calificado.
- **Contenido:** titular sereno + formulario corto (nombre, correo/WhatsApp, proyecto de interés) + confianza ("te contactamos con discreción"). Alternativa WhatsApp directo.
- **Recursos:** fondo `llanerita_arbol-atardecer-reflejo.jpg` (con overlay). Formulario.
- **Componentes:** CTA(Invitación) · Inputs (underline editorial) · Button `invite` · Modal éxito.
- **CTA:** "Solicitar información" (submit) · botón WhatsApp.
- **→ Siguiente:** cierre de marca.

## 13 · FOOTER
- **Objetivo de negocio:** cierre confiable + datos legales + contacto.
- **Contenido:** logo, navegación, contacto, redes, legales/registro/aliado financiero `🟡 MP-08`.
- **Recursos:** `assets/marca/logo/logo_el-poblado.svg`.
- **Componentes:** Footer (reveal) · sello de marca.
- **CTA:** contacto/WhatsApp.
- **→ Siguiente:** fin.

---

## Flujo de conversión (resumen)
Hero (promesa) → Confianza (respaldo) → Empresa → Proyectos → Proyecto principal → **Progreso = valorización** → **Cifras** → **¿Por qué invertir aquí?** → Comparativa → Ubicación → Testimonios → **Invitación (lead)** → Footer.
Todas las CTA convergen en §12. Mensaje transversal: **invertir temprano en tierra del Meta = crecimiento patrimonial.**

## Marcadores MATERIAL PENDIENTE en este wireframe
MP-01 hero video/dron · MP-02 cifras (valorización/precios/financiación) · MP-03 foto equipo · MP-04 hero pro por proyecto · MP-05 Villa Luisa fotos · MP-06 mapa+coordenadas · MP-07 testimonios · MP-08 legales.

## Estado de assets
- ✅ 25 fotos curadas en `/assets/<proyecto>/fotos/` (nombres semánticos).
- ✅ 4 planos + logo (svg/png) en `/assets`.
- 🟡 Video hero (13MB) aún en Drive → copiar a `/assets/villas-del-poblado/videos/` al construir (MP-01).

---

**Próximo paso (tras tu aprobación del wireframe):** implementación visual siguiendo `/design`, empezando por Navbar + Hero (§00–01), con marcadores MP visibles en modo desarrollo.
