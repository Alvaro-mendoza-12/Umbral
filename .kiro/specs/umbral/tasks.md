# UMBRAL - Implementation Tasks

## Fase 1: Configuración Inicial

### T1.1 - Inicializar Proyecto Base
- [ ] Crear proyecto Vite + React + TypeScript
- [ ] Configurar tsconfig.json (strict mode)
- [ ] Configurar ESLint + Prettier
- [ ] Crear estructura de directorios
- [ ] Configurar path aliases (@/)
- [ ] Instalar dependencias base

**Dependencias:**
- react, react-dom
- typescript
- vite
- @types/react, @types/react-dom

### T1.2 - Configurar Routing
- [ ] Instalar react-router-dom
- [ ] Configurar BrowserRouter
- [ ] Crear rutas principales:
  - `/` (Home)
  - `/about` (CSE Explanation)
  - `/guide` (Interactive Guide)
  - `/guide/:step` (Guide Steps)
  - `/checklist` (Checklist)
  - `/resources` (Resources)
  - `/faq` (FAQ)
- [ ] Configurar 404 page

### T1.3 - Configurar i18n
- [ ] Instalar react-i18next
- [ ] Configurar namespaces (common, home, about, guide, checklist, resources, faq)
- [ ] Crear archivos de traducción ES/EN
- [ ] Implementar detección de idioma
- [ ] Implementar persistencia de preferencia

### T1.4 - Sistema de Diseño Base
- [ ] Crear tokens.css (colores, tipografía, espaciado)
- [ ] Crear global.css (reset, base styles)
- [ ] Crear utils.css (clases utility)
- [ ] Importar fuente Inter (Google Fonts o local)
- [ ] Configurar CSS Variables

## Fase 2: Componentes Comunes

### T2.1 - Button Component
- [ ] Crear componente Button con TypeScript
- [ ] Variantes: primary, secondary, ghost
- [ ] Tamaños: sm, md, lg
- [ ] Estados: hover, active, disabled, loading
- [ ] Accesibilidad: focus visible, keyboard
- [ ] Escribir tests

### T2.2 - Card Component
- [ ] Crear componente Card
- [ ] Variantes: default, interactive, highlighted
- [ ] Responsive padding
- [ ] Shadow y border-radius
- [ ] Escribir tests

### T2.3 - Header Component
- [ ] Logo/título UMBRAL
- [ ] Navegación principal
- [ ] Language selector
- [ ] Responsive (hamburger menu en móvil)
- [ ] Sticky header
- [ ] Accesibilidad

### T2.4 - Footer Component
- [ ] Enlaces a recursos
- [ ] Créditos
- [ ] Indicador online/offline
- [ ] Responsive
- [ ] Accesibilidad

### T2.5 - ProgressIndicator Component
- [ ] Visualización de pasos (1/5, 2/5, etc.)
- [ ] Indicadores visuales (completado/actual/pendiente)
- [ ] Responsive
- [ ] Accesibilidad (aria-label)

### T2.6 - LanguageSelector Component
- [ ] Selector ES/EN
- [ ] Dropdown o toggle
- [ ] Persistencia de selección
- [ ] Accesibilidad

## Fase 3: Contenido y Datos

### T3.1 - Definir Tipos TypeScript
- [ ] Tipos para GuideStep
- [ ] Tipos para ChecklistItem
- [ ] Tipos para FAQItem
- [ ] Tipos para OfficialSource
- [ ] Tipos para ULEInfo

### T3.2 - Datos de la Guía
- [ ] Crear data/guideSteps.ts
- [ ] Contenido de 5 pasos en ES
- [ ] Traducción a EN
- [ ] Fuentes citadas

### T3.3 - Datos del Checklist
- [ ] Crear data/checklistItems.ts
- [ ] Documentos necesarios
- [ ] Información requerida
- [ ] Categorización lógica

### T3.4 - Datos de FAQ
- [ ] Crear data/faq.ts
- [ ] 8-10 preguntas relevantes
- [ ] Respuestas concisas
- [ ] Traducción a EN

### T3.5 - Datos de Fuentes Oficiales
- [ ] Crear data/sources.ts
- [ ] Listar fuentes verificables
- [ ] URLs, fechas de verificación
- [ ] Información de ULE Chiclayo (verificar primero)

## Fase 4: Páginas Principales

### T4.1 - Home Page
- [ ] Hero section con eslogan
- [ ] Tarjetas de navegación
- [ ] Sección "¿Qué es UMBRAL?"
- [ ] Sección "¿Por qué usar UMBRAL?"
- [ ] CTA principal: "Comenzar"
- [ ] Responsive
- [ ] Tests E2E

### T4.2 - About Page (CSE Explanation)
- [ ] Definición de CSE
- [ ] Para qué sirve
- [ ] Quiénes pueden solicitarla
- [ ] Fuentes al pie
- [ ] Iconografía
- [ ] Responsive
- [ ] Tests E2E

### T4.3 - Guide Page
- [ ] Layout con ProgressIndicator
- [ ] Renderizado dinámico del paso actual
- [ ] Botones: Anterior / Siguiente
- [ ] Persistencia del paso actual (localStorage)
- [ ] Sidebar de pasos (desktop)
- [ ] Responsive
- [ ] Tests de navegación

### T4.4 - Checklist Page
- [ ] Renderizar ChecklistItems
- [ ] Checkboxes funcionales
- [ ] Persistencia de estado (localStorage)
- [ ] Indicador de progreso (X de Y completados)
- [ ] Botón de reset
- [ ] Responsive
- [ ] Tests de interacción

### T4.5 - Resources Page
- [ ] Listar fuentes oficiales
- [ ] Información de ULE Chiclayo
- [ ] Enlaces externos
- [ ] Botón de descarga de hoja de preparación
- [ ] Fechas de verificación visibles
- [ ] Responsive
- [ ] Tests E2E

### T4.6 - FAQ Page
- [ ] Accordion con preguntas/respuestas
- [ ] Expandir/colapsar
- [ ] Agrupación por tema
- [ ] Responsive
- [ ] Accesibilidad (aria-expanded)
- [ ] Tests de interacción

## Fase 5: Features Específicas

### T5.1 - Prep Sheet (Hoja de Preparación)
- [ ] Diseñar layout para impresión
- [ ] CSS de print
- [ ] Función de descarga como PDF (alternativa: print-to-PDF del navegador)
- [ ] Contenido: resumen de pasos + checklist
- [ ] Logo UMBRAL
- [ ] Tests de generación

### T5.2 - useLocalStorage Hook
- [ ] Implementar hook custom
- [ ] Funciones: get, set, remove
- [ ] Manejo de errores
- [ ] TypeScript types
- [ ] Tests unitarios

### T5.3 - useOnlineStatus Hook
- [ ] Detectar online/offline
- [ ] Listener de eventos
- [ ] Retornar estado actual
- [ ] Tests unitarios

## Fase 6: PWA

### T6.1 - Service Worker
- [ ] Instalar vite-plugin-pwa
- [ ] Configurar Workbox
- [ ] Precache de assets
- [ ] Runtime cache estrategias
- [ ] Offline fallback
- [ ] Probar offline functionality

### T6.2 - Manifest
- [ ] Crear manifest.json
- [ ] Configurar name, short_name, description
- [ ] theme_color, background_color
- [ ] start_url, display: standalone
- [ ] Generar iconos (192, 512)
- [ ] Probar instalación PWA

### T6.3 - Offline Indicator
- [ ] Mostrar badge/toast cuando offline
- [ ] Integrar con Footer
- [ ] Accesibilidad (aria-live)

## Fase 7: Testing

### T7.1 - Unit Tests
- [ ] Tests para utilidades (storage, etc.)
- [ ] Tests para hooks custom
- [ ] Configurar Vitest
- [ ] Cobertura > 60%

### T7.2 - Integration Tests
- [ ] Tests de componentes con Testing Library
- [ ] Tests de navegación de la guía
- [ ] Tests de checklist state
- [ ] Tests de i18n

### T7.3 - E2E Tests
- [ ] Configurar Playwright
- [ ] Test: flujo completo Home → Guide → Checklist
- [ ] Test: cambio de idioma
- [ ] Test: persistencia de estado
- [ ] Test: offline functionality

### T7.4 - Visual Tests
- [ ] Capturas en 390×844 (móvil)
- [ ] Capturas en 768×1024 (tablet)
- [ ] Capturas en 1440×900 (desktop)
- [ ] Todas las rutas principales
- [ ] Revisar alineación, espaciado, contraste

## Fase 8: Accesibilidad

### T8.1 - Auditoría A11y
- [ ] Lighthouse Accessibility audit
- [ ] Axe DevTools
- [ ] Navegación completa por teclado
- [ ] Contraste de color (min 4.5:1)
- [ ] ARIA labels revisados
- [ ] Focus visible en todos los interactivos

### T8.2 - Correcciones A11y
- [ ] Corregir issues encontrados
- [ ] Documentar excepciones (si las hay)
- [ ] Re-test

## Fase 9: Optimización

### T9.1 - Performance
- [ ] Code splitting por ruta
- [ ] Lazy loading de componentes pesados
- [ ] Optimizar imágenes (WebP + fallback)
- [ ] Minificación
- [ ] Tree shaking
- [ ] Lighthouse Performance > 90

### T9.2 - SEO Básico
- [ ] Meta tags (title, description)
- [ ] Open Graph tags
- [ ] robots.txt
- [ ] Sitemap.xml (opcional)

## Fase 10: Deployment

### T10.1 - Configuración de Build
- [ ] Configurar vite.config.ts para producción
- [ ] Variables de entorno (si aplica)
- [ ] Headers de seguridad
- [ ] CSP configurado

### T10.2 - GitHub
- [ ] Crear repositorio
- [ ] .gitignore configurado
- [ ] README.md completo
- [ ] LICENSE
- [ ] CONTRIBUTING.md (opcional)
- [ ] Push inicial

### T10.3 - Vercel Deploy
- [ ] Conectar repo con Vercel
- [ ] Configurar build command
- [ ] Configurar output directory (dist)
- [ ] Deploy
- [ ] Verificar funcionamiento en producción

### T10.4 - Verificación Final
- [ ] Probar PWA en producción
- [ ] Probar todas las rutas
- [ ] Probar offline
- [ ] Probar cambio de idioma
- [ ] Verificar fuentes oficiales (links funcionan)
- [ ] Lighthouse audit final

## Fase 11: Documentación

### T11.1 - README
- [ ] Descripción del proyecto
- [ ] Screenshot o demo
- [ ] Features
- [ ] Tech stack
- [ ] Instrucciones de instalación
- [ ] Instrucciones de desarrollo
- [ ] Instrucciones de build
- [ ] Licencia y créditos

### T11.2 - Documentación Técnica
- [ ] Arquitectura overview
- [ ] Convenciones de código
- [ ] Guía de contribución
- [ ] Cómo agregar traducciones
- [ ] Cómo actualizar datos (guía, checklist, faq)

---

## Dependencias entre Tareas

```
T1.1 → T1.2, T1.3, T1.4
T1.4 → T2.x (componentes requieren sistema de diseño)
T2.x → T4.x (páginas requieren componentes)
T3.x → T4.x (páginas requieren datos)
T4.x → T7.2, T7.3 (tests requieren páginas)
T6.x → T10.3 (PWA debe estar listo para deploy)
T7.4 → T8.2 (visual tests pueden revelar issues A11y)
T10.2 → T10.3 (GitHub antes de Vercel)
```

## Estimación de Esfuerzo

- Fase 1: ~2-3 horas
- Fase 2: ~3-4 horas
- Fase 3: ~2 horas
- Fase 4: ~5-6 horas
- Fase 5: ~2-3 horas
- Fase 6: ~2 horas
- Fase 7: ~4-5 horas
- Fase 8: ~2-3 horas
- Fase 9: ~2 horas
- Fase 10: ~1-2 horas
- Fase 11: ~1 hora

**Total estimado:** 26-33 horas de desarrollo

---

**Versión:** 1.0  
**Fecha:** 2026-11-10  
**Estado:** Listo para ejecución
