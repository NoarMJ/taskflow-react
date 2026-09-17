import { useState } from "react";
import { getUsers, saveUsers, setCurrentUser } from "../utils/auth";

function SignupForm({ onSwitchToLogin, onSignupSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  function clearErrors() {
    setNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setStatusMessage("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    clearErrors();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();

    let isValid = true;

    if (trimmedName === "") {
      setNameError("Name is required.");
      isValid = false;
    }

    if (trimmedEmail === "") {
      setEmailError("Email is required.");
      isValid = false;
    } else if (!trimmedEmail.includes("@")) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    }

    if (password === "") {
      setPasswordError("Password is required.");
      isValid = false;
    }

    if (confirmPassword === "") {
      setConfirmPasswordError("Please confirm your password.");
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      isValid = false;
    }

    if (!isValid) return;

    const users = getUsers();
    const existingUser = users.find((u) => u.email === trimmedEmail);

    if (existingUser) {
      setEmailError("An account with this email already exists.");
      return;
    }

    const newUser = {
      name: trimmedName,
      email: trimmedEmail,
      password: password,
    };

    users.push(newUser);
    saveUsers(users);
    setCurrentUser({ email: trimmedEmail });

    setStatusMessage("Account created successfully.");

    setTimeout(() => {
      onSignupSuccess();
    }, 500);
  }

  return (
    <div className="signup-container">
      <div className="signup-header">
        <a href="/" className="logo">TaskFlow</a>
        <h1>Create an account</h1>
        <p>Start organizing your tasks today.</p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <span className="error-message">{nameError}</span>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span className="error-message">{emailError}</span>
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="error-message">{passwordError}</span>
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <span className="error-message">{confirmPasswordError}</span>
        </div>

        <button type="submit">Create Account</button>
        <p className="status-message">{statusMessage}</p>
      </form>

      <p className="login-link">
        Already have an account?{" "}
        <button type="button" onClick={onSwitchToLogin}>
          Log in
        </button>
      </p>
    </div>
  );
}

export default SignupForm;