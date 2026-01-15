export default function Navbar({ isAuth, onLogout }) {
  return (
    <nav className="navbar">
      <h1>📝 Task Manager</h1>

      {isAuth && (
        <button onClick={onLogout} className="logout">
          Cerrar sesión
        </button>
      )}
    </nav>
  );
}
