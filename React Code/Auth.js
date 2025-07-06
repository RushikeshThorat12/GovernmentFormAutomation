import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa";

import govLogo from "./gov.png";
import satyaLogo from "./satya.png";
import gov1 from "./gov1.png";
import dev from "./dev.png";

export default function AuthPage() {
  const [mode, setMode] = useState("login");
  const navigate = useNavigate();

  // form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  // validation state
  const [valid, setValid] = useState({
    name: false,
    email: false,
    password: false,
    confirm: false,
  });
  const [message, setMessage] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  // submission feedback
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

  // regexes
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  // handlers
  function handleNameChange(e) {
    const v = e.target.value;
    setName(v);
    setSubmitError("");
    if (!v.trim()) {
      setValid((p) => ({ ...p, name: false }));
      setMessage((p) => ({ ...p, name: "Name is required" }));
    } else {
      setValid((p) => ({ ...p, name: true }));
      setMessage((p) => ({ ...p, name: "" }));
    }
  }

  function handleEmailChange(e) {
    const v = e.target.value;
    setEmail(v);
    setSubmitError("");
    if (!emailRegex.test(v)) {
      setValid((p) => ({ ...p, email: false }));
      setMessage((p) => ({ ...p, email: "Enter a valid email" }));
    } else {
      setValid((p) => ({ ...p, email: true }));
      setMessage((p) => ({ ...p, email: "" }));
    }
  }

  function handlePasswordChange(e) {
    const v = e.target.value;
    setPassword(v);
    setSubmitError("");
    if (!passwordRegex.test(v)) {
      setValid((p) => ({ ...p, password: false }));
      setMessage((p) => ({
        ...p,
        password:
          "Min 8 chars, include upper, lower, number & special character",
      }));
    } else {
      setValid((p) => ({ ...p, password: true }));
      setMessage((p) => ({ ...p, password: "" }));
    }

    if (confirm) {
      const match = v === confirm;
      setValid((p) => ({ ...p, confirm: match }));
      setMessage((p) => ({
        ...p,
        confirm: match ? "" : "Passwords do not match",
      }));
    }
  }

  function handleConfirmChange(e) {
    const v = e.target.value;
    setConfirm(v);
    setSubmitError("");
    if (v !== password) {
      setValid((p) => ({ ...p, confirm: false }));
      setMessage((p) => ({
        ...p,
        confirm: "Passwords do not match",
      }));
    } else {
      setValid((p) => ({ ...p, confirm: true }));
      setMessage((p) => ({ ...p, confirm: "" }));
    }
  }

  async function handleLogin(e) {
    e.preventDefault();
    setSubmitError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        navigate("/form");
      } else {
        setSubmitError(data.error || "Login failed");
      }
    } catch {
      setSubmitError("Network error");
    }
  }

  async function handleSignup(e) {
    e.preventDefault();
    setSubmitError("");

    if (!valid.name || !valid.email || !valid.password || !valid.confirm) {
      setSubmitError("Please fix validation errors before signing up.");
      return;
    }

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, confirm }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSubmitError(data.error || "Signup failed");
      } else {
        setSubmitSuccess("Account created! Please log in.");
        setTimeout(() => {
          setMode("login");
          setSubmitSuccess("");
          setName("");
          setConfirm("");
        }, 1000);
      }
    } catch {
      setSubmitError("Network error");
    }
  }

  function renderField({ label, type, value, onChange, validKey, messageKey }) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: 16,
          width: "100%",
        }}
      >
        <input
          style={{
            width: "80%",
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            fontSize: "1rem",
          }}
          autoComplete="off"
          spellCheck="false"
          placeholder={label}
          type={type}
          value={value}
          onChange={onChange}
          required
        />
        <div style={{ marginTop: 4 }}>
          {valid[validKey] ? (
            <span style={{ color: "green", fontSize: 16 }}>✓</span>
          ) : (
            message[messageKey] && (
              <span style={{ color: "red", fontSize: 12 }}>
                {message[messageKey]}
              </span>
            )
          )}
        </div>
      </div>
    );
  }

  const sidebarStyle = {
    width: "270px",
    background: "#fff",
    border: "1px solid #ccc",
    borderRadius: "4px",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", background: "#eef2f3", minHeight: "100vh" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#fff",
          borderBottom: "1px solid #ddd",
          padding: "1rem 1.5rem",
          height: "80px",
        }}
      >
        <div style={{ fontWeight: "bold", color: "#0b3d91", fontSize: "1.2rem" }}>
          🇮🇳 भारत सरकार / Government of India
        </div>
        <img src={satyaLogo} alt="Satya" style={{ height: "60px", objectFit: "contain" }} />
        <img src={govLogo} alt="Gov" style={{ height: "60px", objectFit: "contain", margin: "0 auto" }} />
        <div style={{ display: "flex", gap: "1rem" }}>
          <button
            onClick={() => navigate("/")}
            style={{ background: "transparent", border: "none", cursor: "pointer" }}
          >
            Home
          </button>
          <button
            onClick={() => navigate(mode === "login" ? "/signup" : "/login")}
            style={{ background: "transparent", border: "none", cursor: "pointer" }}
          >
            {mode === "login" ? "Sign Up" : "Log In"}
          </button>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ background: "#0b3d91", color: "#fff", display: "flex", padding: "0.5rem 2rem", gap: "1rem" }}>
        <div>How to Apply Online?</div>
        <div>Benefit Schemes</div>
        <div>Post Matric Scholarship</div>
      </nav>

      {/* Marquee */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          background: "#d9534f",
          padding: "0.72rem 0",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "100%",
            whiteSpace: "nowrap",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "1.08rem",
            animation: "slide 16s linear infinite",
          }}
        >
          आवेदन की अंतिम तिथि: 31 जुलाई, 2025 | Apply by: 31 July, 2025
        </div>
      </div>

      {/* Main content */}
      <div style={{ display: "flex", padding: "1.5rem 2rem", gap: "1rem" }}>
        {/* Left sidebar */}
        <aside style={sidebarStyle}>
          <img
            src={gov1}
            alt="Gov1"
            style={{ height: "15%", width: "auto", marginBottom: "1rem" }}
          />
          <img
            src={dev}
            alt="Dev"
            style={{ width: "80%", height: "auto", marginTop: "1rem" }}
          />
        </aside>

        {/* Auth card */}
        <div
          style={{
            width: "120%",
            maxWidth: "720px",
            background: "#fff",
            padding: "2rem",
            borderRadius: "6px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            margin: "1rem auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1 style={{ margin: 0, fontSize: "1.5rem" }}>Application for the Assistant Clerk</h1>
          <div style={{ display: "flex", gap: "1rem", margin: "1.5rem 0" }}>
            <button
              onClick={() => {
                setMode("login");
                setSubmitError("");
                setSubmitSuccess("");
              }}
              style={{
                padding: "8px 16px",
                border: "none",
                borderRadius: "4px",
                background: mode === "login" ? "#28a745" : "transparent",
                color: mode === "login" ? "#fff" : "#333",
                cursor: "pointer",
                fontWeight: mode === "login" ? "bold" : "normal",
              }}
            >
              Log In
            </button>
            <button
              onClick={() => {
                setMode("signup");
                setSubmitError("");
                setSubmitSuccess("");
              }}
              style={{
                padding: "8px 16px",
                border: "none",
                borderRadius: "4px",
                background: mode === "signup" ? "#007bff" : "transparent",
                color: mode === "signup" ? "#fff" : "#333",
                cursor: "pointer",
                fontWeight: mode === "signup" ? "bold" : "normal",
              }}
            >
              Sign Up
            </button>
          </div>
          <h2 style={{ marginBottom: "1rem", fontWeight: 500 }}>
            {mode === "login" ? "Log In" : "Sign Up"}
          </h2>
          {mode === "signup" ? (
            <form onSubmit={handleSignup} style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
              {renderField({ label: "Name", type: "text", value: name, onChange: handleNameChange, validKey: "name", messageKey: "name" })}
              {renderField({ label: "Email", type: "email", value: email, onChange: handleEmailChange, validKey: "email", messageKey: "email" })}
              {renderField({ label: "Password", type: "password", value: password, onChange: handlePasswordChange, validKey: "password", messageKey: "password" })}
              {renderField({ label: "Confirm Password", type: "password", value: confirm, onChange: handleConfirmChange, validKey: "confirm", messageKey: "confirm" })}
              <button
                type="submit"
                disabled={!valid.name || !valid.email || !valid.password || !valid.confirm}
                style={{ width: "80%", padding: "12px", border: "none", borderRadius: "4px", fontSize: "1rem", cursor: "pointer", marginTop: "8px", background: "#007bff", color: "#fff" }}
              >
                Create Account
              </button>
            </form>
          ) : (
            <form onSubmit={handleLogin} style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
              {renderField({ label: "Email", type: "email", value: email, onChange: handleEmailChange, validKey: "email", messageKey: "email" })}
              {renderField({ label: "Password", type: "password", value: password, onChange: handlePasswordChange, validKey: "password", messageKey: "password" })}
              <button
                type="submit"
                style={{ width: "80%", padding: "12px", border: "none", borderRadius: "4px", fontSize: "1rem", cursor: "pointer", marginTop: "8px", background: "#28a745", color: "#fff" }}
              >
                Log In
              </button>
            </form>
          )}
          {(submitError || submitSuccess) && (
            <div style={{ marginTop: "1rem", color: submitError ? "red" : "green", fontWeight: "bold" }}>
              {submitError || submitSuccess}
            </div>
          )}
        </div>

        {/* Right sidebar */}
        <aside style={sidebarStyle}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "0.75rem" }}>
            <FaBell style={{ marginRight: "0.5rem", color: "#dc3545" }} />
            Notifications
          </div>
          <ul>
            <li>Form deadline extended till 31st July 2025</li>
            <li>New scheme for backward class students</li>
            <li>Marksheet upload available now</li>
            <li>ID cards will be emailed—please enter your correct email address</li>
            <li>Download your admit card by 25th July 2025</li>
            <li>Exam centre guidelines released; check before reporting</li>
            <li>Upload your recent photograph by 20th July 2025</li>
            <li>Contact support@exam.gov.in for any issues</li>
            <li>Helpline: +91-1800-123-456 for queries</li>
          </ul>
        </aside>
      </div>

      <style>
        {`
          @keyframes slide {
            0% { left: 100%; }
            100% { left: -100%; }
          }
        `}
      </style>
    </div>
  );
}
