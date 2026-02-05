"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Simple hardcoded credentials for sample login
    if (username === "admin" && password === "password") {
      localStorage.setItem("admin-token", "logged-in");
      router.push("/admin/dashboard");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: "#f7f7f8" }}>
      <form onSubmit={handleSubmit} style={{ width: 360, padding: 24, background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,.08)", borderRadius: 8 }}>
        <h2 style={{ margin: 0, marginBottom: 16 }}>Admin Login</h2>

        <label style={{ display: "block", marginBottom: 8 }}>
          Username
          <input value={username} onChange={(e) => setUsername(e.target.value)} autoFocus style={{ width: "100%", padding: 8, marginTop: 4, marginBottom: 12 }} />
        </label>

        <label style={{ display: "block", marginBottom: 8 }}>
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: "100%", padding: 8, marginTop: 4, marginBottom: 12 }} />
        </label>

        {error && <div style={{ color: "red", marginBottom: 12 }}>{error}</div>}

        <button type="submit" style={{ width: "100%", padding: 10, background: "#111827", color: "#fff", border: "none", borderRadius: 6 }}>Sign in</button>

        <div style={{ marginTop: 12, fontSize: 12, color: "#555" }}>Use <strong>admin</strong>/<strong>password</strong></div>
      </form>
    </div>
  );
}
