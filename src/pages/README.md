# 🗂️ Páginas del Proyecto

Esta carpeta contiene las **páginas principales** de la aplicación web de LEAD UNI. Cada subcarpeta representa una página con su propia estructura, componentes internos y lógica si es necesario.

## 📌 Convenciones y Buenas Prácticas

Para mantener la consistencia y legibilidad del código, seguimos las siguientes reglas:

### 📁 Estructura

- Cada página debe tener su propia subcarpeta (ej. `Home/`, `Noticias/`, `Organigrama/`).
- Dentro de cada subcarpeta se recomienda:
  - `index.jsx` → Componente principal de la página.
  - `styles.module.css` o usar Tailwind directamente.

### 🧠 Nombres de Archivos

- Los componentes deben nombrarse usando **PascalCase** (primera letra en mayúscula):  
  ✅ `Home.jsx`  
  ❌ `home.jsx`

### 📂 Organización

- Mantener lógica de página dentro de su carpeta, pero abstraer componentes reutilizables a `components/`.
- No mezclar funciones o hooks dentro de `pages/`, deben ir en sus respectivas carpetas (`hooks/`, `services/`, etc.).

---

Este sistema facilita el mantenimiento y escalabilidad del proyecto a medida que crece 🚀
