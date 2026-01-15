import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const loadTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data);
  };

  const createTask = async () => {
    if (!title.trim()) return;
    await api.post("/tasks", { title });
    setTitle("");
    loadTasks();
  };

  const toggleTask = async (id) => {
  await api.put(`/tasks/${id}`);
  loadTasks();
};


  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    loadTasks();
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="card">
      <h2 style={{ textAlign: "center", marginTop: 0 }}>📝 Mis Tareas</h2>

      <div className="task-input">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nueva tarea..."
        />
        <button onClick={createTask}>Agregar</button>
      </div>

      {tasks.length === 0 && (
        <p style={{ textAlign: "center", color: "#6b7280" }}>
          No hay tareas aún
        </p>
      )}

      {tasks.map((task) => (
  <div
    className={`task ${task.completed ? "completed" : ""}`}
    key={task.id}
  >
    <span
      onClick={() => toggleTask(task.id)}
      style={{ cursor: "pointer" }}
    >
      {task.completed ? "✅ " : "⬜ "} {task.title}
    </span>

    <button
  disabled={task.completed}
  onClick={() => deleteTask(task.id)}
  style={{
    opacity: task.completed ? 0.4 : 1,
    cursor: task.completed ? "not-allowed" : "pointer",
  }}
>
  🗑️
</button>

  </div>
))}

    </div>
  );
}
