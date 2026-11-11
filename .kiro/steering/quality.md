# Quality Steering: UMBRAL

## Definición de "Hecho"

Una tarea no está completa hasta que:

✅ **Funciona correctamente**
- Sin errores en consola
- Sin warnings de TypeScript
- Comportamiento esperado en todos los casos

✅ **Es accesible**
- Navegable por teclado
- Contraste adecuado
- ARIA labels presentes

✅ **Es responsive**
- Funciona en móvil (390px)
- Funciona en tablet (768px)
- Funciona en desktop (1440px)

✅ **Está testeado**
- Tests unitarios (si aplica)
- Tests de integración (si aplica)
- Test E2E del flujo (si es feature principal)

✅ **Es mantenible**
- Código limpio y legible
- Comentarios en lógica compleja
- Naming consistente

## Standards de Código

### TypeScript

**Strict Mode:** Obligatorio
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

**Evitar:**
- `any` (usar `unknown` si es necesario)
- `@ts-ignore` (resolver el problema real)
- Type assertions innecesarios (`as`)

### ESLint

**Configuración base:**
- `eslint:recommended`
- `plugin:react/recommended`
- `plugin:@typescript-eslint/recommended`
- `plugin:react-hooks/recommended`

**Rules personalizadas:**
```js
{
  "no-console": "warn", // Solo en dev
  "no-unused-vars": "error",
  "prefer-const": "error",
  "react/prop-types": "off" // Usamos TypeScript
}
```

### Prettier

**Configuración:**
```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80,
  "arrowParens": "avoid"
}
```

## Convenciones de Código

### React Components

**Functional Components:** Siempre
```tsx
// ✅ Correcto
export default function Button({ children }: ButtonProps) {
  return <button>{children}</button>;
}

// ❌ Evitar
export default class Button extends React.Component { }
```

**Props Typing:** Interface, no Type
```tsx
// ✅ Correcto
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

// ⚠️ Aceptable pero no preferido
type ButtonProps = {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}
```

**Destructuring:** Siempre en props
```tsx
// ✅ Correcto
function Button({ variant, children }: ButtonProps) { }

// ❌ Evitar
function Button(props: ButtonProps) {
  return <button>{props.children}</button>;
}
```

### Hooks

**Order:** Siempre el mismo orden
1. useState
2. useReducer
3. useContext
4. useRef
5. useEffect
6. Custom hooks

**Dependencies:** Explícitas y completas
```tsx
// ✅ Correcto
useEffect(() => {
  fetchData(id);
}, [id]);

// ❌ Evitar
useEffect(() => {
  fetchData(id);
}, []); // id no está en dependencies
```

### CSS

**Naming:** BEM-lite con CSS Modules
```css
/* Button.module.css */
.button { }
.button--primary { }
.button--large { }
.button--disabled { }
```

**Variables:** Usar tokens
```css
/* ✅ Correcto */
.button {
  padding: var(--space-4);
  color: var(--color-primary-500);
}

/* ❌ Evitar */
.button {
  padding: 16px;
  color: #2563eb;
}
```

## Testing Standards

### Coverage Mínima
- **Overall:** 60%
- **Utilities:** 80%
- **Critical paths:** 90%

### Unit Tests

**Testing Library:** Preferir queries semánticas
```tsx
// ✅ Correcto
screen.getByRole('button', { name: /comenzar/i });
screen.getByLabelText(/idioma/i);

// ❌ Evitar
screen.getByTestId('start-button');
```

**Assertions:** Específicas
```tsx
// ✅ Correcto
expect(button).toBeInTheDocument();
expect(button).toHaveAttribute('aria-label', 'Cerrar');

// ❌ Evitar
expect(button).toBeTruthy();
```

### E2E Tests

**Page Objects:** Para páginas repetidas
```ts
// pages/HomePage.ts
export class HomePage {
  async goto() {
    await page.goto('/');
  }
  
  async clickStartButton() {
    await page.click('text=Comenzar');
  }
}
```

**Assertions:** User-centric
```ts
// ✅ Correcto
await expect(page.locator('h1')).toContainText('Bienvenido');

// ❌ Evitar
expect(await page.locator('h1').textContent()).toBe('Bienvenido');
```

## Visual Quality Checklist

### Layout
- [ ] Sin desbordamientos (overflow)
- [ ] Sin elementos cortados
- [ ] Espaciado consistente
- [ ] Alineación correcta
- [ ] Márgenes uniformes

### Tipografía
- [ ] Jerarquía clara (h1 > h2 > h3)
- [ ] Tamaño legible (min 16px body)
- [ ] Line height adecuado (1.5 para body)
- [ ] Sin textos cortados mid-word

### Colores
- [ ] Contraste mínimo 4.5:1
- [ ] Uso consistente de paleta
- [ ] Estados hover/active visibles
- [ ] Focus visible en todos los interactivos

### Responsive
- [ ] Funciona en 390px (iPhone SE)
- [ ] Funciona en 768px (iPad)
- [ ] Funciona en 1440px (laptop)
- [ ] Sin scroll horizontal innecesario
- [ ] Imágenes no pixeladas

### Interacción
- [ ] Botones con área de clic adecuada (min 44×44px)
- [ ] Feedback visual en hover
- [ ] Loading states visibles
- [ ] Disabled states claros

## Performance Checklist

- [ ] Bundle size < 500KB (inicial)
- [ ] First load < 3s (3G)
- [ ] No render innecesarios (React DevTools Profiler)
- [ ] Imágenes optimizadas (WebP + fallback)
- [ ] Fonts preloaded o con font-display: swap
- [ ] Code splitting implementado

## Accessibility Checklist

- [ ] Semantic HTML (header, nav, main, footer, article, section)
- [ ] Headings jerárquicos (no saltar niveles)
- [ ] Alt text en imágenes
- [ ] Labels en inputs
- [ ] ARIA labels en iconos sin texto
- [ ] aria-expanded en accordions
- [ ] aria-current en navegación activa
- [ ] Focus trap en modales
- [ ] Skip link al main content
- [ ] Contraste 4.5:1 mínimo
- [ ] Navegación completa por teclado
- [ ] Focus visible custom (no outline: none sin replacement)

## Review Process

### Self-Review
Antes de marcar como "hecho":
1. Revisar visualmente en 3 resoluciones
2. Navegar con teclado
3. Revisar consola (sin errores/warnings)
4. Ejecutar tests
5. Ejecutar linter
6. Revisar diff de git

### Peer Review (si aplica)
- Descripción clara del cambio
- Screenshots de cambios visuales
- Lista de tests ejecutados
- Notas sobre decisiones técnicas

## Continuous Improvement

### Refactoring
- Hacer refactor cuando hay duplicación > 3 veces
- No refactor sin tests previos
- Commits separados: refactor vs feature

### Deuda Técnica
- Documentar con comentarios `// TODO:` o `// FIXME:`
- Crear issues en GitHub
- Priorizar según impacto

### Learning
- Documentar decisiones arquitectónicas
- Compartir hallazgos de performance
- Revisar mejores prácticas periódicamente

---

**Calidad no es opcional.** Si algo no cumple estos estándares, no está listo para producción.
