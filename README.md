# Task Manager – Proyecto Full Stack

Aplicación **Full Stack** para la gestión de tareas, desarrollada con  
**Node.js + Express + PostgreSQL + React (Vite)**.

Permite a los usuarios:
- Registrarse
- Iniciar sesión
- Crear, completar y eliminar tareas
- Gestionar tareas de forma **segura y personalizada**

Cada usuario solo puede ver y administrar **sus propias tareas**.

---

## Tecnologías utilizadas

### Backend
- Node.js
- Express
- PostgreSQL
- JWT (autenticación)
- bcrypt (hash de contraseñas)
- pg (conexión a base de datos)

### Frontend
- React
- Vite
- Axios
- CSS puro

---


## Configuracion de la Base de Datos


-- Conectarse a PostgreSQL
psql -U postgres

-- Crear base de datos
CREATE DATABASE task_manager;

-- Conectar a la base de datos
\c task_manager

-- Crear tabla de usuarios
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de tareas
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--

## 5. Ejecutar la aplicación


Terminal 1 - Backend:

bash
cd backend
npm run dev
Terminal 2 - Frontend:

bash
cd frontend
npm run dev
La aplicación estará disponible en:

Frontend: http://localhost:5173

Backend API: http://localhost:5000

## Endpoints de la API


Autenticación
POST /api/auth/register - Registrar nuevo usuario

POST /api/auth/login - Iniciar sesión

Tareas (requiere autenticación)
GET /api/tasks - Obtener todas las tareas del usuario

POST /api/tasks - Crear nueva tarea

PUT /api/tasks/:id - Actualizar tarea

DELETE /api/tasks/:id - Eliminar tarea






