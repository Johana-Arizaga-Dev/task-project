import { pool } from "../db.js";

export const getTasks = async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM tasks WHERE user_id = $1 ORDER BY id DESC",
    [req.user.id]
  );

  res.json(result.rows);
};


export const createTask = async (req, res) => {
  const { title } = req.body;

  const result = await pool.query(
    "INSERT INTO tasks (title, user_id) VALUES ($1, $2) RETURNING *",
    [title, req.user.id]
  );

  res.json(result.rows[0]);
};


export const deleteTask = async (req, res) => {
  const { id } = req.params;

  const task = await pool.query(
    "SELECT completed FROM tasks WHERE id = $1 AND user_id = $2",
    [id, req.user.id]
  );

  if (task.rows.length === 0) {
    return res.status(404).json({ message: "Tarea no encontrada" });
  }

  if (task.rows[0].completed) {
    return res
      .status(400)
      .json({ message: "No se puede eliminar una tarea completada" });
  }

  await pool.query(
    "DELETE FROM tasks WHERE id = $1 AND user_id = $2",
    [id, req.user.id]
  );

  res.json({ message: "Tarea eliminada" });
};



export const toggleTask = async (req, res) => {
  const { id } = req.params;

  const result = await pool.query(
    `
    UPDATE tasks
    SET completed = NOT completed
    WHERE id = $1 AND user_id = $2
    RETURNING *
    `,
    [id, req.user.id]
  );

  if (result.rows.length === 0) {
    return res.status(403).json({ message: "No autorizado" });
  }

  res.json(result.rows[0]);
};


