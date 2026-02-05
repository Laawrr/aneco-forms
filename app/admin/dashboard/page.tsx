"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("admin-token");
    if (!token) {
      router.replace("/admin");
    }
  }, [router]);

  const logout = () => {
    localStorage.removeItem("admin-token");
    router.push("/admin");
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>Admin Dashboard</h1>
      <p>Welcome, admin. This is a protected area.</p>
      <button onClick={logout} style={{ padding: 8, background: "#ef4444", color: "#fff", border: "none", borderRadius: 6 }}>Logout</button>
    </div>
  );
}
