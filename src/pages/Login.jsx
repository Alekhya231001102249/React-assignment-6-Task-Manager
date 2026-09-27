import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    navigate("/");
  };

  return (
    <main className="login-page">
      <div className="login-background-glow glow-one"></div>
      <div className="login-background-glow glow-two"></div>

      <section className="login-card">
        <div className="login-logo">
          <span>✓</span>
        </div>

        <div className="login-heading">
          <p className="login-brand">TASKFLOW</p>

          <h1>
            Welcome
            <br />
            <span>back.</span>
          </h1>

          <p className="login-subtitle">
            Organize your work. Stay focused.
            <br />
            Get things done.
          </p>
        </div>

        <div className="login-divider">
          <span>Task Manager</span>
        </div>

        <button
          className="login-button"
          onClick={handleLogin}
        >
          <span>Continue to TaskFlow</span>
          <span className="login-arrow">→</span>
        </button>

        <p className="login-note">
          Basic demo authentication
        </p>
      </section>

      <div className="login-footer">
        TaskFlow · Task Management System
      </div>
    </main>
  );
}

export default Login;