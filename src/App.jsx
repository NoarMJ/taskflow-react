import { useState } from "react";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import "./App.css";

function App() {
  const [view, setView] = useState("login");
  return (
    <>
      {view === "login" && (
        <LoginForm
          onSwitchToSignup={() => setView("signup")}
          onLoginSuccess={() => setView("dashboard")}
        />
      )}
      {view === "signup" && (
        <SignupForm
          onSwitchToLogin={() => setView("login")}
          onSignupSuccess={() =>setView("dashboard" )}
        />
      )}
      
      {view === "dashboard" && (
        <Dashboard onLogout={() => setView("login")} />
      )}
    </>
  );
}

export default App;

