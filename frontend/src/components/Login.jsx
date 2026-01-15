import { useState } from "react";
import { api } from "../services/api";

export default function Login({ onLogin, onRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", {
        username,
        password,
      });

      localStorage.setItem("token", res.data.token);
      onLogin();
    } catch {
      setError("Credenciales inválidas");
    }
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>Iniciar sesión</h2>

      {error && <p className="error">{error}</p>}

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

      <button>Entrar</button>

      {/* 👇 ESTA ES LA LÍNEA CORRECTA */}
      <p className="link" onClick={onRegister}>
        ¿No tienes cuenta? Regístrate
      </p>
    </form>
  );
}
