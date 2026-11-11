# UMBRAL - Requirements

**Eslogan:** Entiende el trámite. Prepárate con confianza.

## Objetivo del Producto

Ayudar a personas y familias de Perú a comprender y preparar su primera solicitud de **Clasificación Socioeconómica (CSE)**, mediante una guía sencilla, interactiva, confiable y accesible.

## Público Objetivo

**Piloto inicial:** Adultos y familias de Chiclayo, Perú.

## Propósito y Alcance

UMBRAL es una aplicación web informativa y de preparación que:

- Explica de manera clara qué es la CSE y para qué sirve
- Guía paso a paso el proceso de preparación
- Proporciona un checklist de documentos y requisitos
- Enlaza fuentes oficiales verificables
- Ayuda a entender qué esperar en la Unidad Local de Empadronamiento

**UMBRAL NO:**
- Solicita datos personales (DNI, ingresos, información bancaria)
- Diagnostica situación socioeconómica
- Determina elegibilidad para programas sociales
- Garantiza resultados de clasificación
- Inventa requisitos, direcciones o datos no verificados

## Requisitos Funcionales

### RF-01: Pantalla de Inicio
- Presentación clara de UMBRAL y su propósito
- Eslogan visible
- Navegación intuitiva hacia las secciones principales
- Selector de idioma (ES/EN)

### RF-02: Explicación de CSE
- Definición sencilla y comprensible de CSE
- Para qué sirve la clasificación
- Quiénes pueden solicitarla
- Fuentes oficiales citadas

### RF-03: Guía Interactiva Paso a Paso
- Flujo secuencial claro con indicador de progreso
- Pasos numerados y titulados
- Contenido breve y directo
- Navegación hacia adelante/atrás
- Estados: pendiente, en progreso, completado

**Pasos mínimos:**
1. ¿Qué necesito saber antes de empezar?
2. Documentos que debo reunir
3. Información que me solicitarán
4. Dónde y cómo hacer la solicitud
5. Qué sucede después de la solicitud

### RF-04: Checklist de Preparación
- Lista interactiva de documentos y requisitos
- Posibilidad de marcar elementos como "reunidos"
- Estado persistente localmente (localStorage)
- Visualización de progreso general

### RF-05: Fuentes Oficiales
- Sección dedicada con enlaces verificables
- Indicación clara de fecha de verificación
- Nombre de la fuente oficial
- Enlace directo (cuando aplique)
- Estado: verificado / pendiente de confirmación

### RF-06: Información de ULE Chiclayo
- Nombre completo de la Unidad Local de Empadronamiento
- Dirección (si está verificada)
- Horarios de atención (si están verificados)
- Teléfonos o contactos (si están verificados)
- Advertencia clara si algún dato NO está confirmado

### RF-07: Preguntas Frecuentes
- Al menos 8-10 preguntas relevantes
- Formato accordion (colapsables)
- Respuestas concisas
- Referencias a fuentes cuando sea pertinente

### RF-08: Hoja de Preparación Descargable
- Resumen imprimible de los pasos y requisitos
- Formato PDF o impresión directa desde HTML
- Checklist editable manualmente (versión impresa)
- Logo y branding de UMBRAL
- Espacio para anotaciones del usuario

### RF-09: Funcionamiento Offline (PWA)
- Service Worker configurado
- Caché de recursos estáticos
- Funcionamiento básico sin conexión
- Indicador de estado online/offline
- Manifest.json configurado

### RF-10: Soporte Multiidioma
- Español (principal)
- Inglés
- Selector visible y accesible
- Persistencia de preferencia de idioma
- Traducciones completas (no parciales)

## Requisitos No Funcionales

### RNF-01: Accesibilidad
- WCAG 2.2 nivel AA como referencia
- Navegación completa por teclado
- Atributos ARIA apropiados
- Contraste de color mínimo 4.5:1
- Textos alternativos en imágenes
- Tamaños de fuente escalables
- Focus visible en elementos interactivos

### RNF-02: UX/UI
- Mobile-first design
- Responsive (móvil, tablet, desktop)
- Jerarquía visual clara
- Tarjetas bien organizadas
- Iconografía comprensible
- Tipografía legible (mínimo 16px base)
- Navegación sencilla
- Indicadores de progreso visibles
- Sin interfaces saturadas
- Sin formularios innecesarios
- Heurísticas de Nielsen como guía

### RNF-03: Rendimiento
- Carga inicial < 3 segundos (3G)
- Lighthouse Performance > 90
- Optimización de imágenes
- Code splitting aplicado
- Lazy loading cuando sea pertinente

### RNF-04: Seguridad y Privacidad
- Sin almacenamiento de datos personales en servidor
- Uso exclusivo de localStorage para estado local
- Sin cookies de rastreo
- Sin analíticas invasivas
- HTTPS en producción
- Headers de seguridad configurados

### RNF-05: Calidad de Código
- TypeScript estricto
- Linting configurado (ESLint)
- Formateo consistente (Prettier)
- Componentes reutilizables
- Sin errores de consola
- Tipado correcto
- Comentarios en código complejo

### RNF-06: Testing
- Pruebas unitarias de utilidades críticas
- Pruebas de integración de flujos principales
- Pruebas visuales con Playwright (capturas en 3 resoluciones)
- Cobertura mínima razonable (no < 60%)

### RNF-07: Deploy y CI/CD
- Configuración para Vercel o Netlify
- Build reproducible
- Preparado para GitHub
- README con instrucciones claras
- License definida

## Criterios de Aceptación Generales

✅ La aplicación funciona completamente offline después de la primera carga  
✅ Todas las pantallas son navegables y funcionales  
✅ El diseño es responsive y profesional en móvil, tablet y desktop  
✅ No hay errores en consola del navegador  
✅ Los textos están completos en ES e EN  
✅ Todas las fuentes oficiales están citadas  
✅ El checklist guarda el estado localmente  
✅ La hoja de preparación se puede descargar/imprimir  
✅ Los tests pasan correctamente  
✅ Las capturas de Playwright muestran interfaces alineadas y coherentes  
✅ El contraste de color cumple WCAG AA  
✅ La navegación por teclado funciona en todos los componentes interactivos

## Exclusiones Explícitas

❌ Backend o base de datos  
❌ Registro de usuarios  
❌ Login/autenticación  
❌ Formularios de solicitud real  
❌ Integración con sistemas gubernamentales  
❌ Diagnóstico automático de elegibilidad  
❌ Cálculo de puntajes CSE  
❌ Envío de datos personales  
❌ Geolocalización del usuario  
❌ Notificaciones push  
❌ Análisis predictivo o IA generativa  

## Fuentes de Información Oficial (Inicial)

**Nota:** Toda información debe ser verificada. Si no está confirmada, debe marcarse explícitamente como "Pendiente de verificación oficial".

- Ministerio de Desarrollo e Inclusión Social (MIDIS)
- Sistema de Focalización de Hogares (SISFOH)
- Registros municipales de Chiclayo
- Normativa oficial del Estado Peruano

## Definiciones

**CSE:** Clasificación Socioeconómica  
**ULE:** Unidad Local de Empadronamiento  
**SISFOH:** Sistema de Focalización de Hogares  
**MIDIS:** Ministerio de Desarrollo e Inclusión Social  
**PWA:** Progressive Web App

---

**Versión:** 1.0  
**Fecha:** 2026-11-10  
**Autor:** Kiro AI para Kiroween 2026
