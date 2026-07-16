# /assets — Depósito de material del cliente

Copia aquí el material real. Alimenta `CONTENT_BLUEPRINT.md` (única fuente de verdad de contenido).

## Estructura
```
/assets
  /villas-del-poblado   (PRINCIPAL)
  /llanerita-campestre
  /villas-de-apiay
  /villa-luisa
    /fotos    → originales sin comprimir (JPG/WebP)
    /videos   → MP4 H.264 1080p+ (+ poster si hay)
    /planos   → SVG/PDF vectorial preferido
    /fichas   → texto/PDF/Excel: precios, tamaños, financiación, datos técnicos
    /logo     → SVG vectorial + versiones claro/oscuro
  /marca
    /logo     → identidad global de Inversiones El Poblado
    /legales  → registro, aliado financiero, disclaimers
```

## Reglas de entrega
- **Originales sin comprimir.** El grade cálido y grano se aplican en pipeline (ver `/design/05-photo-direction.md`).
- Nombrar descriptivo: `hero-poblado-atardecer-01.jpg`, `plano-tipologia-A.pdf`.
- Heroes: horizontal, ≥2400px ancho.
- Retratos/testimonios: 4:5 + **autorización escrita**.
- Datos con **fuente verificable** (precios, valorización). Sin fuente → no se publica.

## Al terminar de copiar
Avísame y clasifico cada archivo en `CONTENT_BLUEPRINT.md §6` (uso × umbral × orientación × calidad) y actualizo el gap analysis.
```
git status  # para ver qué se agregó (si el repo se inicializa)
```
