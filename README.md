# Journal. — Digital Archive & Engineering Blog

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**Journal.** es una plataforma de contenido minimalista diseñada para documentar procesos de ingeniería visual, arquitectura de software y diseño de productos digitales.  
El proyecto prioriza la experiencia de lectura mediante una estética de *glassmorphism* y un rendimiento optimizado.

---

## 🏛️ Arquitectura del Proyecto

El sitio utiliza el **App Router de Next.js** y está estructurado para ser altamente escalable y optimizado para motores de búsqueda (SEO).

### Stack Tecnológico

- **Core:** Next.js 15 (React 19) con Turbopack  
- **Base de Datos:** Firebase Cloud Firestore  
- **Estilos:** Tailwind CSS con extensiones de Glassmorphism  
- **Markdown:** React-Markdown para renderizado de artículos  
- **SEO:** Metadatos dinámicos, JSON-LD y Sitemap XML  

---

## 🚀 Configuración del Entorno

### 1. Requisitos Previos

- Node.js 18.x o superior  
- Proyecto de Firebase configurado  

### 2. Instalación

```bash
git clone https://github.com/The-Ribeor/theribeor-blog.git
cd theribeor-blog
npm install
```

### 3. Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Site URL (SEO & Sitemap)
NEXT_PUBLIC_SITE_URL=https://blog.theribeor.com
```

---

## 📂 Estructura de Carpetas

```plaintext
├── app/
│   ├── blog/
│   ├── search/
│   └── sitemap.ts
├── components/
├── services/
├── types/
└── public/
```

---

## 🛠️ Desarrollo y Build

```bash
npm run dev
```

```bash
npm run build
```

---

## 📡 Despliegue en Vercel

Repositorio conectado, variables configuradas y build automático.

---

## ✒️ Licencia

Hecho con curiosidad y lógica por **The Ribeor**.
