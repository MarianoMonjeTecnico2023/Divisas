# 💱 Divisas App - Cotización en Tiempo Real

![Status](https://img.shields.io/badge/status-online-success?style=for-the-badge)
![Frontend](https://img.shields.io/badge/frontend-vanilla_js-yellow?style=for-the-badge)
![Backend](https://img.shields.io/badge/backend-node.js-green?style=for-the-badge)
![Deploy](https://img.shields.io/badge/deploy-github_pages-blue?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-lightgrey?style=for-the-badge)

---

## 🚀 Demo en vivo

👉 https://TU-USUARIO.github.io/TU-REPO  
👉 API: https://server-divisas.onrender.com

---

## 📸 Preview

![Preview App](./preview.png)

---

## 🎥 Demo (GIF)

![Demo](./demo.gif)

---

## 🧠 Descripción

Aplicación web moderna para consultar cotizaciones de monedas internacionales en tiempo real, con conversión automática a pesos argentinos (ARS), soporte multi-moneda y una interfaz visual optimizada tipo fintech.

---

## ⚡ Features

- 🌍 +150 monedas soportadas
- 🇦🇷 Conversión directa a ARS
- 🏳️ Banderas dinámicas por moneda
- ➕ Multi-selección de monedas
- ❌ Eliminación dinámica
- 🔄 Auto-refresh cada 30 segundos
- ⚡ Requests paralelos optimizados
- 📱 Diseño responsive
- 🎨 UI moderna (glassmorphism)
- 🧠 Manejo de errores robusto

---

## 🏗️ Stack tecnológico

### Frontend
- HTML5
- CSS3 (Grid + Flexbox)
- JavaScript (ES6+)

### Backend
- Node.js
- Express
- REST API

---

## 🔌 API Endpoints

### Obtener monedas
GET /api/currency/currencies

### Obtener cotización
GET /api/currency/rate/{FROM}/ARS

Ejemplo:
GET /api/currency/rate/USD/ARS

---

## ⚙️ Instalación local

```bash
git clone https://github.com/TU-USUARIO/TU-REPO.git
cd TU-REPO
```

Abrir con Live Server o navegador:

```bash
index.html
```

---

## 🌐 Deploy

### Frontend
GitHub Pages

### Backend
Render

---

## 📂 Estructura del proyecto

```
/project
│
├── index.html
├── styles.css
├── app.js
├── preview.png
├── demo.gif
└── README.md
```

---

## 🧩 Lógica destacada

### Requests concurrentes

```js
Promise.allSettled()
```

✔ Evita que falle toda la app  
✔ Permite resultados parciales  

---

### Auto actualización

```js
setInterval(fetchMultipleRates, 30000);
```

---

### Sistema de banderas inteligente

- Mapeo manual
- Fallback automático por ISO
- Ícono alternativo 💱

---

## 🎨 UI / UX

- Glassmorphism
- Gradientes modernos
- Animaciones suaves
- Mobile-first
- Micro-interacciones

---

## 📈 Roadmap

- 🔍 Buscador de monedas
- 📊 Gráficos históricos
- 🌙 Dark / Light mode
- 💾 Guardado en LocalStorage
- 🔔 Alertas de precio
- 💱 Conversor completo

---

## 🧑‍💻 Autor

**Mariano Monje Isleño **

- 💻 Fullstack Developer
- 🧠 Enfoque en UX + performance
- 🚀 Apasionado por AI y productos digitales

---

## 🔍 SEO Keywords

currency exchange, divisas, forex app, cotización dólar, API currency, fintech app, javascript project, portfolio developer, real time exchange rates, argentina peso conversion

---

## 📄 Licencia

MIT License