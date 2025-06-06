// RegisterPage.jsx - Register Page
import "./RegisterPage.css";
import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8001/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, phone, password }),
      });

      if (response.ok) {
        setMessage("Registration successful! You can now log in.");
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
    }
  };  return (
    <div className="register-container">
      <header className="register-header">
        <h1>Create an Account</h1>
        <p>One account for everything EZlife.</p>
      </header>

      <div className="register-card">
        <form className="register-form" onSubmit={handleSubmit}>
          {message && <div className={message.includes("successful") ? "success-message" : "error-message"}>{message}</div>}          <div className="form-field">
            <label>Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-field">
            <label>Phone (optional)</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="form-field">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>          <button type="submit" className="btn-primary">Create Account</button>

          <p className="terms">
            By clicking Create Account, you agree to our <a href="/terms">Terms</a> and have read our <a href="/privacy">Privacy Statement</a>.
          </p>
        </form>
      </div>
    </div>
  );
}
