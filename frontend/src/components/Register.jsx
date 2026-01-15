import { useState } from "react";
import { api } from "../services/api";

export default function Register({ onSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await api.post("/auth/register", {
        username,
        password,
      });

      setSuccess("Usuario registrado correctamente");
      setUsername("");
      setPassword("");

      setTimeout(() => onSuccess(), 1200);
    } catch (err) {
      setError(err.response?.data?.message || "Error al registrar");
    }
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>Crear cuenta</h2>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <input
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button>Registrarse</button>

      <p className="link" onClick={onSuccess}>
        ¿Ya tienes cuenta? Inicia sesión
      </p>
    </form>
  );
}
