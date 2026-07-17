# /assets — Material del cliente

Material real del proyecto. El inventario, la evaluación de calidad y la lista de lo que falta por solicitar están en `CONTENT_AUDIT.md` (raíz).

## Estructura real
```
/assets
  /villas-del-poblado   (PRINCIPAL · 14 fotos + plano)
  /llanerita-campestre  (5 fotos + plano)
  /villas-de-apiay      (6 fotos + plano)
  /villa-luisa          (solo plano: sin fotos ni video)
    /fotos    → JPG
    /planos   → PNG/JPG (vectorial preferido)
  /videos     → MP4 H.264 (fondo del hero)
  /marca
    /logo     → SVG + PNG
```

## Reglas de entrega
- **Originales sin comprimir.** El grade cálido y el grano se aplican por CSS, no en el archivo.
- Nombrar descriptivo: `poblado_casa-terminada-atardecer.jpg`, nunca UUIDs.
- Heroes: horizontal, ≥2400px de ancho.
- Retratos/testimonios: 4:5 + **autorización escrita**.
- Datos con **fuente verificable** (precios, valorización). Sin fuente → no se publica.

## Reemplazar el logo por la versión vectorial

El logo actual (`marca/logo/logo_el-poblado.svg`) **no es vectorial**: es un SVG que envuelve
un PNG de 1920×1920 incrustado (0 paths, 868 KB), cuadrado y con aire alrededor de la marca.
Por eso pierde nitidez al ampliarlo. Cuando llegue el vector real:

1. **Sustituir ese único archivo**, conservando el nombre y la ruta. Se usa en el loader, el
   navbar y el footer de las 5 páginas: no hay que tocar ningún HTML.
2. El color lo fuerza CSS (`brightness(0) invert(1)`), así que el vector puede venir en
   cualquier color. No hace falta una versión en blanco.
3. **Si la proporción cambia** (lo normal: un logo horizontal, no cuadrado), ajustar los
   tokens de `styles/tokens.css`, que gobiernan los tres tamaños de todo el sitio:
   `--ep-logo-loader`, `--ep-logo-nav`, `--ep-logo-nav-scrolled`, `--ep-logo-footer`.
   Los valores para móvil se reajustan en `styles/responsive.css` (buscar `--ep-logo-`).

> `logo_el-poblado.png` (960×960) es peor que el raster incrustado en el SVG y hoy no se usa
> en ninguna parte. Se conserva solo como respaldo de la marca.

## Pendiente de recibir (bloquea funcionalidad ya construida)
- **Precios reales** por proyecto → hoy la landing y el simulador usan cifras demo marcadas.
- **Coordenadas (lat,long)** por proyecto → la sección Ubicación tiene la integración lista y desactivada a la espera de este dato.
- Fotografía con dron y de atardecer; hero horizontal ≥2400px.
- Villa Luisa: set completo de fotos (hoy es la variante "próximamente").

Prioridad completa en `CONTENT_AUDIT.md §C`.
