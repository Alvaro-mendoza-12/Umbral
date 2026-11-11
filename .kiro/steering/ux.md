# UX/UI Steering: UMBRAL

## Filosofía de Diseño

**Principio rector:** Claridad sobre creatividad.

UMBRAL es una herramienta funcional, no un portafolio de diseño. Cada decisión visual debe facilitar la comprensión, no impresionar.

## Público Objetivo

**Usuarios primarios:**
- Adultos de 25-55 años
- Diversidad de literacidad digital (baja a media)
- Usuarios móviles principalmente
- Posible conexión limitada o intermitente
- Urgencia moderada (necesitan hacer el trámite pronto)

**Contexto de uso:**
- Multitarea (cuidando hijos, en transporte público)
- Posibles interrupciones
- Luz variable (interior/exterior)
- Una sola mano disponible (móvil)

## Heurísticas de Nielsen

### 1. Visibility of System Status
- Indicador de progreso en la guía (paso X de 5)
- Feedback visual inmediato en checkboxes
- Loading states en acciones (descarga de PDF)
- Indicador online/offline visible pero discreto

### 2. Match Between System and Real World
- Lenguaje simple, no jerga técnica
- Metáforas reconocibles (checklist = lista de compras)
- Iconos universales (home, check, info)
- Orden lógico de los pasos (cronológico)

### 3. User Control and Freedom
- Navegación clara entre pasos (Anterior/Siguiente)
- Breadcrumbs o indicador de ubicación
- Botón de "Volver al inicio" siempre accesible
- Reset de checklist con confirmación

### 4. Consistency and Standards
- Botones primarios siempre azul
- Cards con mismo padding/shadow
- Iconos del mismo estilo (outline o filled, no mezclar)
- Nombres consistentes (ULE, no alternar con "oficina de empadronamiento")

### 5. Error Prevention
- Confirmación antes de reset de checklist
- Desactivar botón "Siguiente" si hay campos incompletos (si aplica)
- Links externos con indicador visual
- Sin acciones destructivas sin confirmación

### 6. Recognition Rather Than Recall
- Navegación visible en todo momento
- Checklist muestra items ya reunidos
- Breadcrumbs en guía
- Sin memorización de códigos o pasos

### 7. Flexibility and Efficiency of Use
- Skip links para usuarios de teclado
- Atajos de teclado (flechas en guía)
- Direct links a secciones específicas
- Rápido acceso desde Home a cualquier sección

### 8. Aesthetic and Minimalist Design
- Sin elementos decorativos innecesarios
- Contenido priorizado jerárquicamente
- Espacios en blanco intencionales
- Cada elemento tiene un propósito

### 9. Help Users Recognize, Diagnose, and Recover from Errors
- Mensajes de error en lenguaje claro
- Sugerencias de solución
- Sin códigos técnicos de error
- Color rojo solo para errores graves

### 10. Help and Documentation
- FAQ accesible desde cualquier página
- Tooltips en términos complejos (si es necesario)
- Ejemplos visuales cuando sea útil
- Contexto inline, no manuales separados

## Mobile-First Design

### Principios
1. **Una columna:** Layout lineal, sin columnas múltiples en móvil
2. **Thumb-friendly:** Botones grandes (mín 44×44px), en parte inferior
3. **Scrolling vertical:** Natural, sin scroll horizontal
4. **Fixed header/footer:** Navegación siempre accesible
5. **Progressive disclosure:** Revelar información gradualmente

### Touch Targets
- Mínimo: 44×44px (Apple HIG)
- Recomendado: 48×48px (Material Design)
- Espacio entre targets: mín 8px

### Tipografía Móvil
- Body text: 16px (no menor, evita zoom automático en iOS)
- Headings: proporcionales (1.5× a 2.5× del body)
- Line height: 1.5 para párrafos
- Max width: 65-75 caracteres por línea

## Responsive Breakpoints

```css
/* Mobile: 390px - 639px (default) */
/* Tablet: 640px - 1023px */
@media (min-width: 640px) { }

/* Desktop: 1024px+ */
@media (min-width: 1024px) { }
```

### Adaptaciones por Breakpoint

**Mobile (< 640px):**
- Navegación: hamburger menu
- Cards: full-width, stacked
- Guía: paso único visible
- Footer: simplificado

**Tablet (640-1023px):**
- Navegación: horizontal compacta
- Cards: 2 columnas en grid
- Guía: sidebar colapsable
- Footer: completo

**Desktop (1024px+):**
- Navegación: horizontal completa
- Cards: 3 columnas en grid
- Guía: sidebar visible siempre
- Footer: completo con columnas

## Jerarquía Visual

### Escala Tipográfica
```css
h1: 32px (móvil) / 40px (desktop) — Solo 1 por página
h2: 24px (móvil) / 30px (desktop) — Secciones principales
h3: 20px (móvil) / 24px (desktop) — Subsecciones
body: 16px — Texto principal
small: 14px — Metadatos, fechas
```

### Peso Visual
- **Bold (600-700):** Headings, labels importantes
- **Medium (500):** Subheadings, botones
- **Regular (400):** Body text

### Color Hierarchy
- **Primario (azul):** Acciones principales, links
- **Secundario (verde):** Confirmaciones, success states
- **Neutral (gris):** Texto, bordes, backgrounds
- **Warning (amarillo):** Advertencias no críticas
- **Error (rojo):** Errores, acciones destructivas

## Componentes Clave

### Button
**Variantes:**
- **Primary:** Acción principal (Comenzar, Siguiente)
- **Secondary:** Acción secundaria (Anterior, Cancelar)
- **Ghost:** Acción terciaria (Ver más, Enlaces externos)

**Estados:**
- Default: Color sólido, sombra sutil
- Hover: Color más oscuro, sombra elevada
- Active: Color más oscuro, sombra reducida
- Disabled: Opacidad 50%, cursor not-allowed
- Focus: Outline visible (3px, color primario)

### Card
**Uso:** Contenedores de contenido relacionado

**Anatomía:**
- Padding: 24px (desktop), 16px (móvil)
- Border-radius: 12px
- Shadow: 0 2px 8px rgba(0,0,0,0.08)
- Background: blanco
- Border: opcional, 1px gris claro

**Variantes:**
- Default: Estática
- Interactive: Hover elevado, cursor pointer
- Highlighted: Border azul, para destacar

### ProgressIndicator
**Visualización:** Pasos numerados con línea conectora

```
● ——— ○ ——— ○ ——— ○ ——— ○
1     2     3     4     5
```

- **Completado:** Círculo lleno, verde
- **Actual:** Círculo lleno, azul
- **Pendiente:** Círculo vacío, gris

**Móvil:** Horizontal, scrollable si es necesario  
**Desktop:** Centrado, todos visibles

## Paleta de Color

### Primarios
- **Azul:** #2563eb (Primary 500) — Confianza, acción
- **Verde:** #10b981 (Secondary 500) — Éxito, confirmación

### Neutrales
- **Negro:** #111827 (Neutral 900) — Texto principal
- **Gris oscuro:** #374151 (Neutral 700) — Texto secundario
- **Gris medio:** #6b7280 (Neutral 500) — Texto muted
- **Gris claro:** #d1d5db (Neutral 300) — Bordes
- **Gris muy claro:** #f3f4f6 (Neutral 100) — Backgrounds
- **Blanco:** #ffffff — Superficie principal

### Funcionales
- **Warning:** #f59e0b — Advertencias
- **Error:** #ef4444 — Errores
- **Info:** #3b82f6 — Información

## Contraste y Accesibilidad

### Ratios Mínimos (WCAG AA)
- **Texto normal (< 18px):** 4.5:1
- **Texto grande (≥ 18px o ≥ 14px bold):** 3:1
- **Elementos UI (iconos, bordes):** 3:1

### Combinaciones Aprobadas
- Neutral 900 sobre blanco: 16:1 ✅
- Neutral 700 sobre blanco: 10:1 ✅
- Primary 500 sobre blanco: 7:1 ✅
- Blanco sobre Primary 600: 7.5:1 ✅

### No Usar
- Neutral 500 sobre blanco para texto normal (3:1, insuficiente)
- Amarillo claro sobre blanco

## Iconografía

### Estilo
- **Outline:** Preferido (consistente, escalable)
- **Tamaño base:** 24×24px
- **Stroke width:** 2px
- **Grid:** 24×24px

### Librería
- **Heroicons** (outline) o similar open-source
- **Lucide Icons** (alternativa)
- **No usar:** Iconos 3D, gradientes, excesivamente detallados

### Uso
- Acompañar con texto cuando sea posible
- `aria-label` cuando son solo icono
- Color consistente con contexto (gris neutral por defecto)

## Animaciones y Transiciones

### Principios
- **Sutiles:** No distraer del contenido
- **Rápidas:** 150-300ms
- **Propósito claro:** Indicar cambio de estado, no decorar

### Permitidas
- Fade in/out: modales, tooltips
- Slide: menús, sidebars
- Scale: botones en hover (sutil, 1.0 → 1.02)
- Color transition: hover states

### Evitar
- Animaciones automáticas en loop
- Parallax scrolling
- Confetti o efectos "festivos"
- Animaciones de más de 500ms

## Error States

### Mensaje de Error
```
[!] No se pudo descargar la hoja de preparación.
    Verifica tu conexión e intenta nuevamente.
    [Reintentar]
```

**Elementos:**
- Icono de alerta (rojo)
- Descripción clara del problema
- Sugerencia de solución
- Acción de recuperación

### Empty States
```
[icono de checklist vacío]
No has marcado ningún documento todavía.
Comienza revisando la guía para saber qué necesitas.
[Ir a la guía]
```

## Loading States

### Inline Loader
- Spinner pequeño (20×20px) en botón
- Texto: "Cargando..."
- Botón deshabilitado durante carga

### Page Loader
- Spinner centrado (40×40px)
- Sin texto (a menos que tarde > 2s)
- Background overlay sutil (rgba 0,0,0,0.1)

## Forms (si se añaden)

### Principios
- Labels visibles (no solo placeholders)
- Validation en tiempo real (después de blur)
- Mensajes de error inline
- Campos requeridos marcados con *

### Ejemplo
```
Nombre *
[___________________]
Tu nombre completo

[error state]
Nombre *
[___________________] [!]
Este campo es requerido
```

## Feedback Visual

### Success
- ✅ Icono verde
- Mensaje: "Guardado" o similar
- Auto-dismiss en 3s

### Info
- ℹ️ Icono azul
- Mensaje contextual
- Dismissible manualmente

### Warning
- ⚠️ Icono amarillo
- Mensaje de advertencia
- Dismissible manualmente

### Error
- ❌ Icono rojo
- Mensaje de error
- Acción de recuperación o dismiss

## Print Styles

### Hoja de Preparación
- @page: A4, portrait
- Font: serif para mejor legibilidad en impresión
- Colores: grayscale
- Márgenes: 2cm
- Page breaks: evitar dentro de secciones

## Dark Mode (Post-MVP)

No implementar en MVP.

Si se añade:
- Respetar `prefers-color-scheme`
- Contraste adecuado en ambos modos
- Toggle manual en settings

## Testing UX

### Checklist Visual
- [ ] Jerarquía clara (heading levels)
- [ ] Contraste adecuado (4.5:1 mínimo)
- [ ] Touch targets suficientes (44×44px)
- [ ] Sin scroll horizontal en móvil
- [ ] Textos legibles en 390px
- [ ] Imágenes no pixeladas
- [ ] Estados hover/focus visibles
- [ ] Sin elementos cortados o desbordados

### Checklist Funcional
- [ ] Navegación intuitiva (test con usuario)
- [ ] Flujo lógico (inicio → guía → checklist → recursos)
- [ ] Sin dead ends (siempre hay siguiente paso)
- [ ] Feedback en acciones (loading, success, error)
- [ ] Persistencia de estado (recargar página mantiene progreso)

---

**Recuerda:** Si un elemento no aporta a la comprensión del trámite CSE, probablemente no debería estar ahí.
