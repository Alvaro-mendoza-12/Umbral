# Architecture Steering: UMBRAL

## Stack Tecnológico

### Core
- **Framework:** React 18.3+
- **Language:** TypeScript 5.6+ (strict mode)
- **Build Tool:** Vite 5+
- **Routing:** React Router 6+

### Supporting Libraries
- **i18n:** react-i18next
- **PWA:** vite-plugin-pwa + Workbox
- **Testing:** Vitest + Testing Library + Playwright

### No Dependencies For
- State management libraries (Redux, Zustand) — usar React built-in
- UI frameworks (Material-UI, Ant Design) — sistema custom
- CSS frameworks (Tailwind, Bootstrap) — CSS Modules + Variables
- Backend/database — todo es frontend estático

## Principios Arquitectónicos

### 1. Simplicidad
- Mínimas dependencias
- Código directo y comprensible
- No over-engineering
- YAGNI (You Aren't Gonna Need It)

### 2. Mantenibilidad
- Componentes pequeños y enfocados
- Separación de responsabilidades
- Convenciones claras
- Comentarios en lógica compleja

### 3. Performance
- Code splitting por ruta
- Lazy loading de componentes pesados
- Optimización de assets
- Cache strategies eficientes

### 4. Offline-First
- Service Worker configurado
- Assets críticos precacheados
- Graceful degradation
- Indicador de estado online/offline

## Estructura de Directorios

```
umbral/
├── public/              # Assets estáticos servidos as-is
├── src/
│   ├── assets/         # Imágenes, iconos procesados por Vite
│   ├── components/     # Componentes React
│   │   ├── common/    # Reutilizables (Button, Card, etc.)
│   │   └── features/  # Específicos de dominio
│   ├── pages/         # Componentes de ruta (Home, About, etc.)
│   ├── hooks/         # Custom React hooks
│   ├── services/      # Lógica sin UI (i18n, storage)
│   ├── data/          # Datos estáticos (FAQ, guía, etc.)
│   ├── types/         # TypeScript types/interfaces
│   ├── styles/        # CSS global, tokens, utils
│   ├── utils/         # Funciones puras, helpers
│   ├── App.tsx        # Root component + routing
│   └── main.tsx       # Entry point
├── tests/             # Tests organizados por tipo
└── ...config files
```

## Convenciones de Código

### Naming
- **Componentes:** PascalCase (`Button.tsx`, `InteractiveGuide.tsx`)
- **Hooks:** camelCase con prefijo `use` (`useLocalStorage.ts`)
- **Utilities:** camelCase (`formatDate.ts`, `storage.ts`)
- **Types:** PascalCase (`GuideStep`, `ChecklistItem`)
- **Constants:** UPPER_SNAKE_CASE (`MAX_STEPS`, `DEFAULT_LANGUAGE`)

### Archivos
- Un componente por archivo
- Componente + estilos en carpeta si tienen > 1 archivo relacionado
- Exportar con `export default` para componentes
- Named exports para utilidades

### Estructura de Componente
```tsx
// 1. Imports
import { useState } from 'react';
import styles from './Button.module.css';

// 2. Types
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}

// 3. Component
export default function Button({ 
  variant = 'primary', 
  size = 'md',
  children,
  onClick 
}: ButtonProps) {
  // 4. Logic
  // ...
  
  // 5. Render
  return (
    <button className={styles.button}>
      {children}
    </button>
  );
}
```

## Gestión de Estado

### Local State
- `useState` para estado simple de UI
- `useReducer` para estado complejo (ej: flujo de guía)

### Persistent State
- `localStorage` via custom hook `useLocalStorage`
- Keys con prefijo `umbral:` (ej: `umbral:language`, `umbral:checklist`)

### No Global State
- No usar contextos globales innecesariamente
- Pasar props directamente cuando sea < 3 niveles
- Usar contexto solo si realmente es global (ej: idioma)

## Routing

```tsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/guide" element={<Guide />} />
  <Route path="/guide/:step" element={<GuideStep />} />
  <Route path="/checklist" element={<Checklist />} />
  <Route path="/resources" element={<Resources />} />
  <Route path="/faq" element={<FAQ />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

## Styling

### Approach
- CSS Modules para componentes
- CSS Variables para tokens (colores, tipografía, espaciado)
- Utility classes mínimas (flex, grid helpers)

### File Organization
```
Button/
├── Button.tsx
├── Button.module.css
└── index.ts (re-export)
```

### CSS Naming (BEM-lite)
```css
.button { }
.button--primary { }
.button--secondary { }
.button--disabled { }
```

## Data Management

### Static Data
- Archivos TypeScript en `src/data/`
- Typed con interfaces
- Exportar como constantes

```ts
// data/guideSteps.ts
export const guideSteps: GuideStep[] = [
  {
    id: 1,
    title: { es: '...', en: '...' },
    content: { es: '...', en: '...' },
    sources: [...]
  }
];
```

### Dynamic Data
- Nada en MVP
- Si se añade: fetch desde API, cachear en localStorage

## Internationalization

### Structure
```
locales/
├── es/
│   └── translation.json
└── en/
    └── translation.json
```

### Usage
```tsx
import { useTranslation } from 'react-i18next';

function Component() {
  const { t } = useTranslation();
  return <h1>{t('common:welcome')}</h1>;
}
```

### Keys
- Namespace + key: `common:button.start`
- Consistencia: siempre minúsculas con dots

## Testing Strategy

### Unit Tests (Vitest)
- Utilidades puras
- Custom hooks
- Funciones de lógica de negocio

### Integration Tests (Testing Library)
- Componentes con interacción
- Flujos multi-step
- Persistencia de estado

### E2E Tests (Playwright)
- Flujo usuario completo
- PWA functionality
- Navegación entre páginas

### Visual Tests (Playwright)
- Capturas en 3 breakpoints
- Comparación con baseline (opcional)
- Revisión manual de alineación

## Performance Targets

- **LCP:** < 2.5s
- **FID:** < 100ms
- **CLS:** < 0.1
- **Lighthouse:** > 90 (Performance, Accessibility, Best Practices)

## Build & Deploy

### Build
```bash
npm run build
```
- Output: `dist/`
- Assets con hash
- Source maps (optional en prod)

### Deploy Target
- Vercel (preferido)
- Otras opciones: Netlify, Cloudflare Pages

### Environment
- No variables de entorno en MVP
- Si se añaden: `.env.example` y documentar

## Accesibilidad

### Mandatory
- Semantic HTML
- ARIA labels en iconos/botones sin texto
- Keyboard navigation completa
- Focus visible en todos los interactivos
- Contraste mínimo 4.5:1

### Testing
- Lighthouse Accessibility > 90
- Axe DevTools sin errores críticos
- Manual keyboard navigation test

## Security

### Headers
```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Content-Security-Policy: (configurar)
```

### Dependencies
- Auditoría regular: `npm audit`
- Actualizar dependencias vulnerables
- Evitar dependencias no mantenidas

### Data
- No almacenar datos sensibles
- No usar `eval()` ni `innerHTML` con contenido no sanitizado
- localStorage solo para preferencias y estado de UI

## Error Handling

### User-Facing Errors
- Mensajes claros en español/inglés
- Error boundaries en componentes críticos
- Fallback UI amigable

### Developer Errors
- Console.error para debugging
- No console.log en producción (linter)
- TypeScript strict evita muchos errores

## Git Workflow

### Branches
- `main` — producción
- `develop` — integración
- `feature/nombre` — features nuevas

### Commits
- Mensajes en inglés
- Formato: `type(scope): message`
- Ej: `feat(guide): add step navigation`

### PR
- Descripción clara
- Tests pasan
- Review visual de cambios UI

---

**Nota:** Esta arquitectura prioriza simplicidad y mantenibilidad sobre abstracciones prematuras. Agregar complejidad solo cuando exista necesidad comprobada.
