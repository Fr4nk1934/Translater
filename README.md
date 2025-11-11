Tutorial de la Aplicación Translater

Este tutorial explica cómo funciona la aplicación Translater, una herramienta web para traducir palabras entre español e inglés utilizando un diccionario personal almacenado en una base de datos MySQL. Incluye explicaciones, códigos, capturas de pantalla y más.

Introducción
La aplicación Translater es una aplicación full-stack que consta de:

Frontend: Construido con React y Vite, incluye una interfaz para traducción y gestión del diccionario.
Backend: Servidor Express.js con Node.js, conectado a MySQL para operaciones CRUD en las palabras.
Base de datos: MySQL para almacenar las palabras en español e inglés.
La aplicación permite traducir texto basado en un diccionario personalizado, agregar, editar y eliminar palabras.

Estructura del Código
El proyecto está organizado en dos carpetas principales: backend y frontend.

Backend
server.js: Punto de entrada del servidor Express, configura CORS, middlewares y rutas.
config/db.js: Configuración de la conexión a la base de datos MySQL usando mysql2/promise.
routes/wordRoutes.js: Define las rutas API REST para las operaciones con palabras (GET, POST, PUT, DELETE).
controllers/wordController.js: Contiene la lógica de negocio para manejar las solicitudes API.
models/wordModel.js: Funciones para interactuar directamente con la base de datos (consultas SQL).
package.json: Dependencias y scripts del backend (express, cors, dotenv, mysql2).
Frontend
src/App.jsx: Componente principal que maneja el enrutamiento con React Router.
src/main.jsx: Punto de entrada que renderiza la aplicación React.
src/components/TranslatorForm.jsx: Componente para el formulario de traducción.
src/components/DictionaryManagement.jsx: Componente para gestionar el diccionario (agregar, editar, eliminar palabras).
src/components/: Archivos CSS para estilos de los componentes.
index.html: Archivo HTML base.
vite.config.js: Configuración de Vite para el desarrollo.
package.json: Dependencias del frontend (react, axios, react-router-dom, etc.).

Requisitos Previos
Antes de ejecutar la aplicación, asegúrate de tener instalado:

Node.js (versión 16 o superior)
MySQL (servidor de base de datos)
Un navegador web moderno
Instalación
1. Clona el repositorio o descarga los archivos del proyecto.

2. Instala las dependencias del backend:

cd backend
npm install
3. Instala las dependencias del frontend:

cd ../frontend
npm install
Configuración de la Base de Datos
1. Crea una base de datos MySQL llamada translator_db (o el nombre que prefieras).

2. Crea la tabla words:

CREATE TABLE words (
  id INT AUTO_INCREMENT PRIMARY KEY,
  spanish VARCHAR(255) NOT NULL,
  english VARCHAR(255) NOT NULL
);
3. Configura las variables de entorno en un archivo .env en la carpeta backend:

DB_HOST=localhost
DB_USER=tu_usuario
DB_PASS=tu_contraseña
DB_NAME=translator_db
PORT=5000
Ejecutando la Aplicación
1. Inicia el servidor backend:

cd backend
node server.js
El servidor se ejecutará en http://localhost:5000.

2. En otra terminal, inicia el frontend:

cd frontend
npm run dev
El frontend estará disponible en http://localhost:5173.

Usando la Aplicación
Navegación
La aplicación tiene dos páginas principales:

Translator: Para traducir texto.
My Dictionary: Para gestionar las palabras del diccionario.
Incluye un toggle para modo oscuro.
<img width="730" height="935" alt="image" src="https://github.com/user-attachments/assets/5c410e99-2580-4f12-a111-cf7af289bdde" />
Captura de pantalla de la página principal
Traductor
Selecciona los idiomas (Español a Inglés o viceversa), ingresa el texto y haz clic en "Translate". La traducción se muestra si la palabra existe en el diccionario.

<img width="618" height="435" alt="image" src="https://github.com/user-attachments/assets/382a9f6c-b86f-4e3a-a726-db47b04ae2ed" />
Captura de pantalla del formulario de traducción
Código clave en TranslatorForm.jsx:

const handleTranslate = async () => {
  // Lógica para buscar en el diccionario
  const found = words.find((w) => w.spanish.toLowerCase() === term);
  if (found) setTranslation(found.english);
};
Gestión del Diccionario
En "My Dictionary", puedes buscar, agregar, editar y eliminar palabras.

<img width="594" height="635" alt="image" src="https://github.com/user-attachments/assets/dca9dc08-ba9c-48a2-a179-495ffa9a3b57" />
Captura de pantalla de la gestión del diccionario
Para agregar una palabra, haz clic en "Add New Word" y llena los campos.

<img width="534" height="410" alt="image" src="https://github.com/user-attachments/assets/dee17b88-0804-473f-8fef-21c772d05fdf" />
Captura de pantalla del modal de agregar palabra
Explicaciones de Código
Backend
El backend usa Express para rutas API. Ejemplo de ruta en wordRoutes.js:

router.get("/", getWords);
router.post("/", createWord);
Controlador en wordController.js:

export const getWords = async (req, res) => {
  const words = await Word.getAllWords();
  res.json(words);
};
Modelo en wordModel.js para interactuar con MySQL:

export const getAllWords = async () => {
  const [rows] = await db.query("SELECT * FROM words");
  return rows;
};
Frontend
Usa React con hooks para estado. En DictionaryManagement.jsx, maneja CRUD con Axios:

const handleAddWord = () => {
  axios.post('http://localhost:5000/api/words', { spanish, english })
    .then((res) => setWords([...words, res.data]));
};

