# 📝 Task Manager – Proyecto Full Stack

Aplicación **Full Stack** para la gestión de tareas, desarrollada con  
**Node.js + Express + PostgreSQL + React (Vite)**.

Permite a los usuarios:
- Registrarse
- Iniciar sesión
- Crear, completar y eliminar tareas
- Gestionar tareas de forma **segura y personalizada**

Cada usuario solo puede ver y administrar **sus propias tareas**.

---

## 🚀 Tecnologías utilizadas

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

## 📁 Estructura del proyecto
task-project/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   └── tasksController.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   └── tasksRoutes.js
│   │   ├── middlewares/
│   │   │   └── authMiddleware.js
│   │   ├── db.js
│   │   └── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskList.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── README.md
