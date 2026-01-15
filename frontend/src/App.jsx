import { useState } from "react";
import Navbar from "./components/Navbar";
import TaskList from "./components/TaskList";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css";

function App() {
  const [isAuth, setIsAuth] = useState(
    !!localStorage.getItem("token")
  );

  const [showRegister, setShowRegister] = useState(false);

  const handleLogin = () => setIsAuth(true);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
  };

  return (
    <div className="app">
      <Navbar isAuth={isAuth} onLogout={handleLogout} />

      <main className="main">
        {isAuth ? (
          <TaskList />
        ) : showRegister ? (
          <Register onSuccess={() => setShowRegister(false)} />
        ) : (
          <Login
            onLogin={handleLogin}
            onRegister={() => setShowRegister(true)}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
