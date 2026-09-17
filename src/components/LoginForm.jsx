import { useState } from "react";
import { getUsers, setCurrentUser } from "../utils/auth";

function LoginForm({ onSwitchToSignup, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");
    setStatusMessage("");

    const trimmedEmail = email.trim().toLowerCase();
    let isValid = true;

    if (trimmedEmail === "") {
      setEmailError("Email is required.");
      isValid = false;
    }

    if (password === "") {
      setPasswordError("Password is required.");
      isValid = false;
    }

    if (!isValid) return;

    const users = getUsers();
    const user = users.find(
      (u) => u.email === trimmedEmail && u.password === password
    );

    if (!user) {
      setStatusMessage("Incorrect email or password.");
      return;
    }

    setCurrentUser({ email: user.email });
    setStatusMessage("Login successful.");

    setTimeout(() => {
      onLoginSuccess();
    }, 500);
  }

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin} noValidate>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span className="error-message">{emailError}</span>
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="error-message">{passwordError}</span>
        </div>

        <div className="form-group">
          <p className="signup-link">
            Don't have an account?{" "}
            <button type="button" onClick={onSwitchToSignup}>
              Sign up
            </button>
          </p>
        </div>

        <button type="submit">Login</button>
        <span className="status-message">{statusMessage}</span>
      </form>
    </div>
  );
}

export default LoginForm;