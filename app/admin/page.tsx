"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username === "admin" && password === "password") {
      localStorage.setItem("admin-token", "logged-in");
      router.push("/admin/dashboard");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#fff" }}>
      {/* Top-left logo */}
      <div style={{ position: "absolute", top: 16, left: 16 }}>
        <img src="/logo_aneco.png" alt="ANECO" style={{ width: 96, height: "auto" }} />
      </div>

      {/* Centered card */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 420, background: "#d67f25", borderRadius: 20, padding: 36, boxShadow: "0 10px 30px rgba(0,0,0,0.15)", textAlign: "center", color: "#000" }}>
          <h2 style={{ marginTop: 0, marginBottom: 24, fontSize: 24 }}>Login User</h2>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "stretch" }}>
            <label style={{ textAlign: "left", color: "#000", marginBottom: 8 }}>Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
              placeholder="Enter username"
              style={{ borderRadius: 8, padding: "12px 14px", border: "none", marginBottom: 14 }}
            />

            <label style={{ textAlign: "left", color: "#000", marginBottom: 8 }}>Password</label>
            <div style={{ position: "relative", marginBottom: 10 }}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                style={{ borderRadius: 8, padding: "12px 40px 12px 14px", border: "none", width: "100%" }}
              />
              <button type="button" onClick={() => setShowPassword((s) => !s)} aria-label="toggle password" style={{ position: "absolute", right: 8, top: 8, background: "transparent", border: "none", cursor: "pointer" }}>
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            <div style={{ textAlign: "right", marginBottom: 14 }}>
              <a href="#" style={{ color: "#000", opacity: 0.85, fontSize: 13, textDecoration: "underline" }}>Forgot password?</a>
            </div>

            {error && <div style={{ color: "#9b1c1c", marginBottom: 12 }}>{error}</div>}

            <button type="submit" style={{ background: "#000", color: "#fff", padding: 12, borderRadius: 8, border: "none", fontWeight: 600 }}>LOGIN</button>
          </form>
        </div>
      </div>

      {/* Footer bar */}
      <footer style={{ height: 40, background: "#000", color: "#f3b04d", display: "flex", alignItems: "center", paddingLeft: 12 }}>
        <div style={{ fontSize: 12 }}>Copyright © 2016 ANECO, INC.</div>
      </footer>
    </div>
  );
}
