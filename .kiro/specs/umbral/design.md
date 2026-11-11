# UMBRAL - Design Document

## Arquitectura General

### Stack Tecnológico

**Frontend:**
- React 18.3+
- TypeScript 5.6+
- Vite 5+ (build tool)
- React Router 6+ (routing)
- i18next (internacionalización)
- Workbox (PWA/Service Worker)

**Styling:**
- CSS Modules + CSS Variables
- Sistema de diseño custom (tokens)
- Sin frameworks CSS pesados

**Testing:**
- Vitest (unit/integration)
- Playwright (E2E + visual)
- Testing Library (componentes)

**Deploy:**
- Vercel (preferido)
- Build estático optimizado

### Principios de Arquitectura

1. **Modularidad:** Componentes pequeños y reutilizables
2. **Separación de responsabilidades:** UI / lógica / datos separados
3. **Progressive Enhancement:** Funciona sin JS avanzado
4. **Mobile-First:** Diseño desde 390px hacia arriba
5. **Performance-First:** Code splitting, lazy loading, optimización de assets
6. **Accessibility-First:** ARIA, semántica HTML, contraste, teclado

## Estructura de Directorios

```
umbral/
├── .kiro/
│   ├── specs/umbral/
│   │   ├── requirements.md
│   │   ├── design.md
│   │   └── tasks.md
│   ├── steering/
│   │   ├── product.md
│   │   ├── architecture.md
│   │   ├── quality.md
│   │   ├── security.md
│   │   └── ux.md
│   └── hooks/
├── public/
│   ├── icons/
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── assets/
│   │   ├── icons/
│   │   └── images/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button/
│   │   │   ├── Card/
│   │   │   ├── Header/
│   │   │   ├── Footer/
│   │   │   ├── LanguageSelector/
│   │   │   └── ProgressIndicator/
│   │   └── features/
│   │       ├── CSEExplanation/
│   │       ├── InteractiveGuide/
│   │       ├── Checklist/
│   │       ├── OfficialSources/
│   │       ├── ULEInfo/
│   │       ├── FAQ/
│   │       └── PrepSheet/
│   ├── pages/
│   │   ├── Home/
│   │   ├── About/
│   │   ├── Guide/
│   │   ├── Checklist/
│   │   ├── Resources/
│   │   └── FAQ/
│   ├── hooks/
│   │   ├── useLocalStorage.ts
│   │   ├── useTranslation.ts
│   │   └── useOnlineStatus.ts
│   ├── services/
│   │   └── i18n.ts
│   ├── data/
│   │   ├── faq.ts
│   │   ├── guideSteps.ts
│   │   ├── checklistItems.ts
│   │   └── sources.ts
│   ├── types/
│   │   └── index.ts
│   ├── styles/
│   │   ├── tokens.css
│   │   ├── global.css
│   │   └── utils.css
│   ├── utils/
│   │   ├── storage.ts
│   │   └── print.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
├── vitest.config.ts
├── playwright.config.ts
├── README.md
└── LICENSE
```

## Diseño Visual

### Sistema de Tokens

**Colores:**
```css
:root {
  /* Primarios */
  --color-primary-500: #2563eb; /* Azul confiable */
  --color-primary-600: #1d4ed8;
  --color-primary-700: #1e40af;
  
  /* Secundarios */
  --color-secondary-500: #10b981; /* Verde éxito */
  --color-secondary-600: #059669;
  
  /* Neutrales */
  --color-neutral-50: #f9fafb;
  --color-neutral-100: #f3f4f6;
  --color-neutral-200: #e5e7eb;
  --color-neutral-300: #d1d5db;
  --color-neutral-500: #6b7280;
  --color-neutral-700: #374151;
  --color-neutral-900: #111827;
  
  /* Estados */
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-info: #3b82f6;
  
  /* Superficie */
  --surface-primary: #ffffff;
  --surface-secondary: var(--color-neutral-50);
  --surface-elevated: #ffffff;
  
  /* Texto */
  --text-primary: var(--color-neutral-900);
  --text-secondary: var(--color-neutral-700);
  --text-muted: var(--color-neutral-500);
  --text-inverse: #ffffff;
}
```

**Tipografía:**
```css
:root {
  /* Familias */
  --font-sans: 'Inter', -apple-system, system-ui, sans-serif;
  --font-display: 'Inter', sans-serif;
  
  /* Tamaños */
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 1.875rem;  /* 30px */
  --text-4xl: 2.25rem;   /* 36px */
  
  /* Pesos */
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  
  /* Line heights */
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;
}
```

**Espaciado:**
```css
:root {
  --space-1: 0.25rem;  /* 4px */
  --space-2: 0.5rem;   /* 8px */
  --space-3: 0.75rem;  /* 12px */
  --space-4: 1rem;     /* 16px */
  --space-5: 1.25rem;  /* 20px */
  --space-6: 1.5rem;   /* 24px */
  --space-8: 2rem;     /* 32px */
  --space-10: 2.5rem;  /* 40px */
  --space-12: 3rem;    /* 48px */
  --space-16: 4rem;    /* 64px */
  --space-20: 5rem;    /* 80px */
}
```

**Bordes y Sombras:**
```css
:root {
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
}
```

### Componentes Base

**Button:**
- Variantes: primary, secondary, ghost
- Tamaños: sm, md, lg
- Estados: default, hover, active, disabled, loading
- Accesible por teclado
- Focus visible

**Card:**
- Contenedor elevado con sombra
- Padding consistente
- Variantes: default, interactive, highlighted

**Header:**
- Logo UMBRAL
- Selector de idioma
- Navegación responsive (hamburger en móvil)
- Sticky en scroll

**Footer:**
- Enlaces a recursos
- Créditos
- Indicador offline/online

**ProgressIndicator:**
- Visual de pasos completados
- Números y etiquetas
- Responsive

### Pantallas Principales

#### 1. Home (`/`)
- Hero con eslogan
- Tarjetas de navegación a secciones principales
- CTA clara: "Comenzar la guía"
- Sección "¿Qué es UMBRAL?"
- Sección "¿Por qué usar UMBRAL?"

#### 2. Acerca de la CSE (`/about`)
- Definición clara y sencilla
- Ilustración o iconografía
- Para qué sirve (tarjetas de beneficios)
- Quiénes pueden solicitarla
- Fuentes oficiales al pie

#### 3. Guía Interactiva (`/guide`)
- Indicador de progreso (paso X de Y)
- Contenido del paso actual
- Botones: Anterior / Siguiente
- Sidebar con resumen de pasos (desktop)
- Estado persistente (paso actual guardado)

**Pasos:**
1. Antes de empezar
2. Documentos necesarios
3. Información solicitada
4. Dónde hacer la solicitud
5. Después de la solicitud

#### 4. Checklist (`/checklist`)
- Lista de ítems con checkboxes
- Agrupados por categoría
- Indicador de progreso general (X de Y completados)
- Estado persistente
- Botón de reset

#### 5. Recursos (`/resources`)
- Fuentes oficiales
- Información de ULE Chiclayo
- Enlaces externos verificados
- Fechas de verificación visibles
- Descarga de hoja de preparación

#### 6. Preguntas Frecuentes (`/faq`)
- Lista de preguntas colapsables
- Búsqueda/filtro (opcional para MVP)
- Agrupadas por tema

### Responsive Breakpoints

```css
/* Mobile first */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
```

## Flujo de Usuario Principal

```
[Home] 
  → [About CSE] → [Guide Step 1] → [Guide Step 2] → ... → [Guide Step 5]
  → [Checklist]
  → [Resources] → [Download Prep Sheet]
  → [FAQ]
```

## Gestión de Estado

**Local State:**
- React useState para UI temporal
- useReducer para estados complejos (guide flow)

**Persistent State:**
- localStorage para:
  - Idioma preferido
  - Paso actual de la guía
  - Estado del checklist
  - Tema (si se implementa dark mode)

**No global state library:** No es necesario Redux/Zustand para este MVP.

## Internacionalización (i18n)

**Biblioteca:** react-i18next

**Estructura de traducciones:**
```
locales/
├── es/
│   └── translation.json
└── en/
    └── translation.json
```

**Namespaces:**
- common (botones, navegación)
- home
- about
- guide
- checklist
- resources
- faq

**Detección de idioma:**
1. Preferencia guardada (localStorage)
2. Navegador (navigator.language)
3. Fallback: español

## Progressive Web App (PWA)

**Service Worker (Workbox):**
- Precache de assets estáticos
- Runtime cache de fuentes/imágenes
- Offline fallback page

**Manifest.json:**
```json
{
  "name": "UMBRAL - Guía CSE Chiclayo",
  "short_name": "UMBRAL",
  "description": "Entiende el trámite. Prepárate con confianza.",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#2563eb",
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

## Accesibilidad (A11y)

**Navegación por teclado:**
- Tab order lógico
- Focus visible (outline custom)
- Skip links
- Trap focus en modales

**Semántica HTML:**
- `<header>`, `<nav>`, `<main>`, `<footer>`, `<article>`, `<section>`
- Headings jerárquicos (h1 → h2 → h3)
- `<button>` para acciones, `<a>` para navegación

**ARIA:**
- `aria-label` en iconos
- `aria-expanded` en accordions
- `aria-current` en navegación
- `aria-live` para actualizaciones dinámicas
- `role` cuando sea necesario

**Contraste:**
- Texto normal: mínimo 4.5:1
- Texto grande: mínimo 3:1
- Elementos interactivos: mínimo 3:1

**Testing:**
- Axe DevTools
- Lighthouse Accessibility audit
- Navegación real con teclado
- Screen reader testing (opcional pero recomendado)

## Performance

**Optimizaciones:**
- Code splitting por ruta
- Lazy loading de imágenes
- Optimización de imágenes (WebP + fallback)
- Minificación de CSS/JS
- Tree shaking
- Preload de fuentes críticas
- Defer de scripts no críticos

**Métricas objetivo:**
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1
- Lighthouse Performance: > 90

## Testing Strategy

**Unit Tests (Vitest):**
- Utilidades (storage, formatters)
- Hooks custom
- Funciones puras

**Integration Tests (Testing Library):**
- Componentes con interacción
- Flujos completos (guide navigation)
- Checklist state management

**E2E Tests (Playwright):**
- Flujo principal completo
- Cambio de idioma
- Persistencia de estado
- Offline functionality

**Visual Tests (Playwright):**
- Capturas en 3 resoluciones:
  - 390×844 (móvil)
  - 768×1024 (tablet)
  - 1440×900 (desktop)
- Todas las rutas principales
- Estados: default, hover, focus

## Deployment

**Build:**
```bash
npm run build
```

**Output:**
- `dist/` con assets optimizados
- HTML, CSS, JS minificados
- Source maps en producción (opcional)

**Vercel:**
- Conectar repo GitHub
- Auto-deploy en push a main
- Preview deploys en PRs
- Variables de entorno (si se necesitan)

**Headers de seguridad:**
```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

## Consideraciones de Seguridad

- Sin backend → sin superficie de ataque del servidor
- Sin almacenamiento de datos sensibles
- HTTPS obligatorio en producción
- CSP (Content Security Policy) configurado
- Sin eval() ni innerHTML con contenido no sanitizado
- Dependencias actualizadas (npm audit)

## Exclusiones del Diseño

❌ Animaciones complejas (priorizar rendimiento)  
❌ Carruseles automáticos (accesibilidad)  
❌ Modales invasivos  
❌ Auto-play de video/audio  
❌ Infinite scroll  
❌ Gamificación innecesaria  
❌ Notificaciones push  
❌ Integración con redes sociales  
❌ Comentarios o foros  

## Próximos Pasos (Post-MVP)

- Sistema de notificaciones locales
- Modo oscuro
- Más idiomas (Quechua, Aymara)
- Versión para otras ciudades
- Integración con calendarios
- Export de checklist a PDF nativo

---

**Versión:** 1.0  
**Fecha:** 2026-11-10  
**Aprobación:** Lista para implementación
