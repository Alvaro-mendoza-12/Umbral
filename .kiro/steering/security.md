# Security & Privacy Steering: UMBRAL

## Principios Fundamentales

### Privacy by Design
UMBRAL **no recopila, almacena ni transmite información personal de usuarios**.

### Zero Trust on User Data
- No pedimos DNI
- No pedimos información de ingresos
- No pedimos datos bancarios
- No pedimos dirección de domicilio
- No rastreamos ubicación geográfica
- No usamos cookies de tracking
- No integramos analytics invasivos

## Almacenamiento de Datos

### Lo que SÍ almacenamos (localStorage)
1. **Preferencia de idioma** (`umbral:language`)
   - Propósito: UI personalizada
   - Datos: 'es' o 'en'
   - Sensibilidad: Ninguna

2. **Paso actual de la guía** (`umbral:currentStep`)
   - Propósito: Continuar donde se quedó
   - Datos: número del paso (1-5)
   - Sensibilidad: Ninguna

3. **Estado del checklist** (`umbral:checklist`)
   - Propósito: Persistir items marcados
   - Datos: array de IDs marcados
   - Sensibilidad: Baja (solo indica qué documentos reunió, sin contenido)

4. **Consentimiento de PWA** (`umbral:pwaInstallPrompted`)
   - Propósito: No molestar repetidamente
   - Datos: boolean
   - Sensibilidad: Ninguna

### Lo que NO almacenamos
❌ Datos personales identificables  
❌ Ubicación GPS  
❌ Dirección IP (sin backend)  
❌ Historial de navegación  
❌ Datos biométricos  
❌ Información financiera  
❌ Contactos telefónicos  

## Seguridad del Frontend

### Content Security Policy (CSP)

```http
Content-Security-Policy:
  default-src 'self';
  script-src 'self';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  font-src 'self';
  connect-src 'self';
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
```

**Rationale:**
- `style-src 'unsafe-inline'`: Necesario para CSS-in-JS/Modules
- `img-src https:`: Permitir imágenes de fuentes oficiales
- `frame-ancestors 'none'`: Prevenir clickjacking

### HTTP Headers

```http
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=(), payment=()
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

### Cross-Site Scripting (XSS) Prevention

**Reglas:**
1. Nunca usar `dangerouslySetInnerHTML`
2. Nunca usar `eval()` o `Function()` constructor
3. Sanitizar cualquier input de usuario (aunque no los tenemos en MVP)
4. React escapa strings por defecto — confiar en eso

**En código:**
```tsx
// ✅ Seguro (React escapa automáticamente)
<p>{userContent}</p>

// ❌ Peligroso (evitar)
<div dangerouslySetInnerHTML={{ __html: userContent }} />
```

### Dependency Security

**Auditoría regular:**
```bash
npm audit
npm audit fix
```

**Reglas:**
- Dependencias actualizadas mensualmente (mínimo)
- Vulnerabilidades críticas/altas resueltas inmediatamente
- Evitar dependencias sin mantenimiento activo

**Check en CI (si se implementa):**
```yaml
- run: npm audit --audit-level=high
```

## External Links

### Validación
- Solo enlaces a fuentes oficiales verificadas
- Protocolo HTTPS obligatorio
- `rel="noopener noreferrer"` en `target="_blank"`

```tsx
// ✅ Correcto
<a 
  href="https://www.gob.pe/..." 
  target="_blank" 
  rel="noopener noreferrer"
>
  Fuente oficial
</a>
```

### Verificación de Fuentes
Antes de agregar un enlace:
1. Verificar que es fuente oficial (.gob.pe, .edu.pe, etc.)
2. Comprobar certificado HTTPS válido
3. Documentar fecha de verificación
4. Anotar en `data/sources.ts`

## PWA Security

### Service Worker
- Solo cachear assets propios (no third-party scripts)
- Estrategia de cache clara y documentada
- Invalidación de cache en versiones nuevas

```js
// Precache solo assets propios
workbox.precaching.precacheAndRoute([
  { url: '/index.html', revision: '...' },
  { url: '/assets/main.js', revision: '...' }
]);

// No precachear URLs externas
```

### Manifest
```json
{
  "scope": "/",
  "start_url": "/",
  "display": "standalone"
}
```

## No Backend = Reduced Attack Surface

**Ventajas de seguridad:**
- Sin SQL injection
- Sin session hijacking
- Sin CSRF attacks
- Sin server-side code execution
- Sin file upload vulnerabilities

**Pero aún preocuparse por:**
- XSS en frontend
- Dependency vulnerabilities
- Malicious CDN compromises (usamos self-hosted)

## HTTPS Obligatorio

**Reglas:**
- Producción: solo HTTPS
- Vercel/Netlify: automático
- No mixed content (HTTP resources en página HTTPS)

## Analytics y Tracking

**MVP: Sin analytics.**

**Si se añade en el futuro:**
- Preferir analytics anónimos (Plausible, Simple Analytics)
- Evitar Google Analytics, Facebook Pixel, etc.
- Consentimiento explícito antes de activar
- Documentar claramente en política de privacidad

## Política de Privacidad

**MVP:** Footer con declaración breve:
> "UMBRAL no recopila ni almacena datos personales. Toda la información se procesa localmente en tu dispositivo."

**Futuro:** Documento completo de privacidad si se añaden features que cambian esto.

## GDPR / CCPA Compliance

**Situación actual:**
- No aplica (no hay procesamiento de datos personales)
- No hay cookies de tracking
- No hay transferencia de datos

**Si cambia:**
- Implementar banner de consentimiento
- Proveer mecanismo de descarga/eliminación de datos
- Documentar base legal para procesamiento

## Incident Response

**Si se descubre vulnerabilidad:**
1. Evaluación de impacto (¿afecta a usuarios?)
2. Fix inmediato en rama separada
3. Deploy urgente
4. Comunicación a usuarios (si es crítico)
5. Post-mortem y mejoras

**Contacto para reporte de vulnerabilidades:**
- Email: [definir]
- GitHub Security Advisories (cuando repo sea público)

## Threat Model

### Threats Considerados

| Amenaza | Probabilidad | Impacto | Mitigación |
|---------|--------------|---------|------------|
| XSS | Baja | Alto | React escapa por defecto, no usar dangerouslySetInnerHTML |
| Dependency vuln | Media | Medio | npm audit regular, actualizaciones |
| Phishing (sitio falso) | Media | Medio | Dominio claro, HTTPS, educación |
| Clickjacking | Baja | Bajo | X-Frame-Options: DENY |
| MITM | Muy baja | Alto | HTTPS obligatorio, HSTS |

### Threats Fuera de Scope
- DDoS (responsabilidad de Vercel/CDN)
- Server-side attacks (no hay servidor)
- Database breaches (no hay database)

## Security Checklist (Pre-Deploy)

- [ ] HTTPS configurado
- [ ] Security headers implementados
- [ ] CSP configurado y testeado
- [ ] `npm audit` sin vulnerabilidades altas/críticas
- [ ] No console.log con datos sensibles (aunque no los tenemos)
- [ ] Enlaces externos con `rel="noopener noreferrer"`
- [ ] Service Worker solo cachea recursos propios
- [ ] Manifest.json con scope correcto
- [ ] Lighthouse Security checks pasan

## Reporting

**Para usuarios:**
> "¿Encontraste un problema de seguridad? Por favor repórtalo a [email] de manera responsable."

**Para desarrolladores:**
- Documentar cualquier cambio que afecte seguridad/privacidad
- No commitear secrets (aunque no debería haber)
- Revisar `.gitignore` para excluir archivos sensibles

---

**Resumen:** UMBRAL tiene una superficie de ataque mínima porque no procesa datos personales ni tiene backend. La estrategia es mantener esta simplicidad y agregar complejidad solo si es absolutamente necesario, con evaluación de riesgos previa.
