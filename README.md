# 🌐 Tutorial de la Aplicación **Translater**

Este tutorial explica cómo funciona la aplicación **Translater**, una herramienta web para traducir palabras entre **español** e **inglés** utilizando un **diccionario personal** almacenado en una base de datos **MySQL**.  
Incluye explicaciones, código, capturas de pantalla y más.

---

## 🧠 Introducción

La aplicación **Translater** es una aplicación *full-stack* que consta de tres partes:

- **Frontend:** Construido con React y Vite. Incluye la interfaz de usuario para traducción y gestión del diccionario.  
- **Backend:** Servidor Express.js con Node.js, conectado a MySQL para operaciones CRUD (crear, leer, actualizar, eliminar).  
- **Base de datos:** MySQL, donde se almacenan las palabras en español e inglés.

La aplicación permite:
- Traducir texto según un diccionario personalizado.
- Agregar, editar y eliminar palabras.
- Usar modo claro/oscuro en la interfaz.

---

## 📂 Estructura del Código

El proyecto está organizado en dos carpetas principales: **backend** y **frontend**.

---

### ⚙️ Backend

| Archivo | Descripción |
|----------|--------------|
| `server.js` | Punto de entrada del servidor Express. Configura CORS, middlewares y rutas. |
| `config/db.js` | Configuración de la conexión a la base de datos MySQL usando `mysql2/promise`. |
| `routes/wordRoutes.js` | Define las rutas API REST para las operaciones con palabras (GET, POST, PUT, DELETE). |
| `controllers/wordController.js` | Contiene la lógica de negocio para manejar las solicitudes API. |
| `models/wordModel.js` | Funciones para interactuar directamente con la base de datos mediante consultas SQL. |
| `package.json` | Dependencias y scripts del backend (express, cors, dotenv, mysql2). |

---

### 💻 Frontend

| Archivo | Descripción |
|----------|--------------|
| `src/App.jsx` | Componente principal que maneja el enrutamiento con React Router. |
| `src/main.jsx` | Punto de entrada que renderiza la aplicación React. |
| `src/components/TranslatorForm.jsx` | Componente para el formulario de traducción. |
| `src/components/DictionaryManagement.jsx` | Componente para gestionar el diccionario (agregar, editar, eliminar palabras). |
| `src/components/*.css` | Archivos CSS con los estilos personalizados. |
| `index.html` | Archivo HTML base. |
| `vite.config.js` | Configuración de Vite para desarrollo. |
| `package.json` | Dependencias del frontend (react, axios, react-router-dom, etc.). |

---

## ⚙️ Requisitos Previos

Antes de ejecutar la aplicación, asegúrate de tener instalado:

- 🟢 **Node.js** (versión 16 o superior)
- 🟠 **MySQL** (servidor de base de datos)
- 🟣 **Navegador web moderno** (Chrome, Edge o Firefox)


▶️ Ejecutando la Aplicación

🧠 Inicia el servidor backend
bash
Copiar código
cd backend
node server.js

El servidor se ejecutará en 👉 http://localhost:5000

💻 Inicia el frontend
bash
Copiar código
cd frontend
npm run dev
El frontend estará disponible en 👉 http://localhost:5173

🧭 Navegación
La aplicación cuenta con dos páginas principales:

Translator: Para traducir texto.

My Dictionary: Para gestionar las palabras del diccionario.
Además, incluye un interruptor para activar o desactivar el modo oscuro.

🖼️ Capturas de Pantalla
🏠 Página principal
<img width="730" height="935" alt="image" src="https://github.com/user-attachments/assets/5c410e99-2580-4f12-a111-cf7af289bdde" />
🈶 Formulario de traducción
Selecciona los idiomas (Español ↔ Inglés), ingresa el texto y haz clic en “Translate”.
La traducción se mostrará si la palabra existe en el diccionario.

<img width="618" height="435" alt="image" src="https://github.com/user-attachments/assets/382a9f6c-b86f-4e3a-a726-db47b04ae2ed" />


📚 Gestión del diccionario
En la sección My Dictionary, puedes buscar, agregar, editar y eliminar palabras.

<img width="594" height="635" alt="image" src="https://github.com/user-attachments/assets/dca9dc08-ba9c-48a2-a179-495ffa9a3b57" />


➕ Modal de agregar palabra
Haz clic en “Add New Word” y llena los campos correspondientes.

<img width="534" height="410" alt="image" src="https://github.com/user-attachments/assets/ea7e536f-1c07-43ab-9a0c-58e25ceda34d" />



⚒️ Tecnologías Utilizadas
Categoría	Tecnologías
🎨 Frontend	React, Vite, Axios, React Router DOM
⚙️ Backend	Node.js, Express, dotenv, cors, mysql2
🗄️ Base de datos	MySQL
💅 Estilos	CSS, variables personalizadas, modo oscuro
🧰 Control de versiones	Git y GitHub

🚀 Instalación Rápida (Resumen)
bash
Copiar código
# Clonar el repositorio
git clone https://github.com/tu-usuario/Translatr-App.git

# Instalar dependencias del backend y frontend
cd backend && npm install
cd ../frontend && npm install

# Ejecutar backend y frontend
cd backend && node server.js
cd ../frontend && npm run dev
Luego abre 👉 http://localhost:5173

