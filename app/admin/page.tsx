"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [mode, setMode] = useState<'login'|'register'>('login');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin() {
    setError('');
    if (!username.trim() || !password) {
      setError('Please enter username and password');
      return false;
    }
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username: username.trim(), password }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setError(data?.error || res.statusText || 'Login failed');
        return false;
      }
      return true;
    } catch (err) {
      setError('Network error');
      return false;
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (mode === 'login') {
      const ok = await handleLogin();
      setLoading(false);
      if (ok) router.push('/admin/dashboard');
      return;
    }

    // register flow
    if (!firstName.trim() || !lastName.trim() || !username.trim() || !password) {
      setError('Please fill out all fields');
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim(), password, first_name: firstName.trim(), last_name: lastName.trim(), admin: true }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setError(data?.error || res.statusText || 'Registration failed');
        setLoading(false);
        return;
      }

      // auto-login
      const ok = await handleLogin();
      setLoading(false);
      if (ok) router.push('/admin/dashboard');
      else router.push('/admin');
    } catch (err) {
      setError('Network error');
      setLoading(false);
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
          <h2 style={{ marginTop: 0, marginBottom: 24, fontSize: 24 }}>{mode === 'login' ? 'Login User' : 'Create Account'}</h2>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "stretch" }}>
            {mode === 'register' && (
              <>
                <label style={{ textAlign: "left", color: "#000", marginBottom: 8 }}>First name</label>
                <input name="first_name" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First name" style={{ borderRadius: 8, padding: "12px 14px", border: "none", marginBottom: 14 }} />

                <label style={{ textAlign: "left", color: "#000", marginBottom: 8 }}>Last name</label>
                <input name="last_name" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last name" style={{ borderRadius: 8, padding: "12px 14px", border: "none", marginBottom: 14 }} />
              </>
            )}

            <label style={{ textAlign: "left", color: "#000", marginBottom: 8 }}>Username</label>
            <input
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
              autoComplete="username"
              placeholder="Enter username"
              style={{ borderRadius: 8, padding: "12px 14px", border: "none", marginBottom: 14 }}
            />

            <label style={{ textAlign: "left", color: "#000", marginBottom: 8 }}>Password</label>
            <div style={{ position: "relative", marginBottom: 10 }}>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                style={{ borderRadius: 8, padding: "12px 40px 12px 14px", border: "none", width: "100%" }}
              />
              <button type="button" onClick={() => setShowPassword((s) => !s)} aria-label="toggle password" style={{ position: "absolute", right: 8, top: 8, background: "transparent", border: "none", cursor: "pointer" }}>
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            {mode === 'register' && (
              <>
                <label style={{ textAlign: "left", color: "#000", marginBottom: 8 }}>Confirm password</label>
                <input name="confirm_password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm password" style={{ borderRadius: 8, padding: "12px 14px", border: "none", marginBottom: 14 }} />
              </>
            )}

            <div style={{ textAlign: "right", marginBottom: 14 }}>
              <a href="#" onClick={(e) => { e.preventDefault(); setMode(mode === 'login' ? 'register' : 'login'); }} style={{ color: "#000", opacity: 0.85, fontSize: 13, textDecoration: "underline" }}>{mode === 'login' ? 'Create an account' : 'Back to login'}</a>
            </div>

            {error && <div style={{ color: "#9b1c1c", marginBottom: 12 }}>{error}</div>}

            <button
              type="submit"
              disabled={loading}
              style={{
                background: "#000",
                color: "#fff",
                padding: 12,
                borderRadius: 8,
                border: "none",
                fontWeight: 600,
                opacity: loading ? 0.6 : 1,
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? (mode === 'login' ? 'Logging in...' : 'Creating account...') : (mode === 'login' ? 'LOGIN' : 'Create account')}
            </button>
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
