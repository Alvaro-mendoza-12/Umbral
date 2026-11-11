# UMBRAL

<div align="center">

![UMBRAL Logo](public/icons/icon.svg)

**Entiende el trámite. Prepárate con confianza.**

Una PWA que ayuda a familias de Chiclayo, Perú, a preparar su solicitud de Clasificación Socioeconómica (CSE).

[Demo](#) • [Documentación](#documentation) • [Reportar Bug](#) • [Solicitar Feature](#)

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)
![React](https://img.shields.io/badge/React-18.3-61dafb)
![License](https://img.shields.io/badge/license-MIT-green)

</div>

---

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Demo](#-demo)
- [Tecnología](#️-tecnología)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Testing](#-testing)
- [Deploy](#-deploy)
- [Documentación](#-documentación)
- [Privacidad](#-privacidad-y-seguridad)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)

---

## ✨ Características

### 🎯 Funcionalidades Principales

- **Guía Interactiva:** 5 pasos claros para preparar tu solicitud CSE
- **Checklist Inteligente:** 11 items con seguimiento de progreso persistente
- **Fuentes Oficiales:** Enlaces verificados a SISFOH, MIDIS y plataforma del Estado
- **Información Local:** Orientación específica para ULE Chiclayo
- **FAQ Completo:** 10 preguntas frecuentes con respuestas claras
- **Hoja Imprimible:** Documento de preparación para llevar contigo

### 🚀 Tecnología

- **PWA:** Funciona sin conexión después de la primera visita
- **Bilingüe:** Español e Inglés completo
- **Responsive:** Mobile-first, funciona en todos los dispositivos
- **Accesible:** WCAG 2.2 AA, navegación por teclado completa
- **Rápido:** 97 KB gzipped, carga en < 3s

### 🔐 Privacidad

- ✅ **Sin datos personales:** No pedimos DNI, ingresos ni información sensible
- ✅ **Sin tracking:** No hay cookies de rastreo ni analytics invasivos
- ✅ **Local-first:** Todo funciona en tu dispositivo
- ✅ **Open source:** Código auditable públicamente

---

## 🎬 Demo

### Pantallas Principales

**Inicio**
> Hero con navegación clara a todas las secciones

**Guía Interactiva**
> 5 pasos con indicador de progreso y navegación intuitiva

**Checklist**
> Seguimiento de documentos con progreso visual

---

## 🛠️ Tecnología

```
React 18.3     → UI moderna y eficiente
TypeScript 5.6 → Type safety y mejor DX
Vite 5         → Build ultra-rápido
i18next        → Internacionalización
Workbox        → PWA y offline support
Playwright     → E2E testing
Vitest         → Unit testing
```

### Arquitectura

```
umbral/
├── .kiro/specs/      # Requisitos, diseño, tareas
├── .kiro/steering/   # Guías de desarrollo
├── src/
│   ├── components/   # Componentes reutilizables
│   ├── pages/        # Páginas de la aplicación
│   ├── hooks/        # Custom React hooks
│   ├── data/         # Contenido y datos
│   ├── styles/       # Sistema de diseño
│   └── locales/      # Traducciones ES/EN
└── tests/            # Tests unitarios y E2E
```

---

## 📦 Instalación

### Prerequisitos

- Node.js 18+ 
- npm 9+

### Pasos

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/umbral.git

# Entrar al directorio
cd umbral

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

---

## 🎯 Uso

### Desarrollo

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run preview      # Preview del build
npm run lint         # Linter
```

### Testing

```bash
npm run test         # Tests unitarios
npm run test:e2e     # Tests E2E con Playwright
npm run test:e2e:ui  # Tests E2E con UI interactiva
```

### Build

```bash
npm run build
```

Output en `dist/`:
- **index-*.css:** ~31 KB (5.9 KB gzipped)
- **index-*.js:** ~70 KB (21 KB gzipped)
- **react-vendor-*.js:** ~156 KB (51 KB gzipped)
- **i18n-vendor-*.js:** ~60 KB (19 KB gzipped)

---

## 🚀 Deploy

### Vercel (Recomendado)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/tu-usuario/umbral)

```bash
vercel
```

### Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/tu-usuario/umbral)

### Configuración

- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

---

## 📚 Documentación

### Kiro Specs

- [Requirements](./kiro/specs/umbral/requirements.md) - Requisitos funcionales y no funcionales
- [Design](./kiro/specs/umbral/design.md) - Arquitectura y diseño
- [Tasks](./kiro/specs/umbral/tasks.md) - Tareas de implementación

### Kiro Steering

- [Product](./kiro/steering/product.md) - Identidad y límites del producto
- [Architecture](./kiro/steering/architecture.md) - Decisiones técnicas
- [Quality](./kiro/steering/quality.md) - Standards de calidad
- [Security](./kiro/steering/security.md) - Privacidad y seguridad
- [UX](./kiro/steering/ux.md) - Principios de experiencia de usuario

### Informes

- [Informe Final](INFORME_FINAL.md) - Reporte técnico completo
- [Resumen Ejecutivo](RESUMEN_EJECUTIVO.md) - Vista general del producto

---

## 🔐 Privacidad y Seguridad

### Compromiso de Privacidad

UMBRAL **no recopila, almacena ni transmite información personal**.

#### ✅ Lo que NO hacemos

- ❌ No pedimos datos personales (DNI, dirección, teléfono)
- ❌ No solicitamos información financiera
- ❌ No diagnosticamos situación socioeconómica
- ❌ No rastreamos ubicación GPS
- ❌ No usamos cookies de tracking
- ❌ No compartimos datos con terceros

#### ✅ Lo que SÍ hacemos

- ✅ Guardamos preferencias localmente (idioma, progreso)
- ✅ Todo funciona en tu dispositivo
- ✅ Código open source auditable
- ✅ HTTPS obligatorio en producción

### Seguridad Técnica

- Headers de seguridad configurados
- Content Security Policy (CSP)
- Sin vulnerabilidades críticas (npm audit)
- Dependencias actualizadas

---

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea tu feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Guidelines

- Seguir los standards de código (ESLint + Prettier)
- Escribir tests para nuevas features
- Actualizar documentación si es necesario
- Mantener TypeScript strict mode
- Respetar principios de privacidad

---

## 📄 Licencia

Distribuido bajo la Licencia MIT. Ver `LICENSE` para más información.

---

## 🙏 Agradecimientos

- [SISFOH](https://www.gob.pe/sisfoh) - Sistema de Focalización de Hogares
- [MIDIS](https://www.gob.pe/midis) - Ministerio de Desarrollo e Inclusión Social
- [Kiro](https://kiro.dev) - Herramienta de desarrollo utilizada
- Comunidad open source de React, TypeScript y Vite

---

## 📧 Contacto

**Proyecto:** UMBRAL  
**Versión:** 1.0.0  
**Autor:** Desarrollado para Kiroween 2026  
**Repositorio:** [GitHub](https://github.com/tu-usuario/umbral)

Para reportar problemas de seguridad: [security@example.com]

---

<div align="center">

**⭐ Si UMBRAL te ayudó, considera darle una estrella en GitHub ⭐**

Desarrollado con ❤️ usando [Kiro](https://kiro.dev)

</div>
