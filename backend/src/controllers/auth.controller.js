import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../db.js";

/* ======================
   REGISTRO
====================== */
export const register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: "Usuario y contraseña son obligatorios",
    });
  }

  const exists = await pool.query(
    "SELECT id FROM users WHERE username = $1",
    [username]
  );

  if (exists.rows.length > 0) {
    return res.status(400).json({
      message: "El usuario ya existe",
    });
  }

  const hash = await bcrypt.hash(password, 10);

  await pool.query(
    "INSERT INTO users (username, password) VALUES ($1, $2)",
    [username, hash]
  );

  res.status(201).json({
    message: "Usuario registrado correctamente",
  });
};

/* ======================
   LOGIN  ✅ ESTE FALTABA
====================== */
export const login = async (req, res) => {
  const { username, password } = req.body;

  const result = await pool.query(
    "SELECT * FROM users WHERE username = $1",
    [username]
  );

  if (result.rows.length === 0) {
    return res.status(401).json({
      message: "Credenciales inválidas",
    });
  }

  const user = result.rows[0];
  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return res.status(401).json({
      message: "Credenciales inválidas",
    });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username },
    "secret123",
    { expiresIn: "1h" }
  );

  res.json({ token });
};
