"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminForms() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("admin-token");
    if (!token) router.replace("/admin");
  }, [router]);

  const data = ["Label text", "Label text", "Label text", "Label text"];

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#fff" }}>
      <div style={{ padding: 18, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <img src="/logo_aneco.png" alt="ANECO" style={{ width: 90, height: "auto" }} />
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {(() => {
            function NavButton({ children, onClick, variant = "ghost" }: { children: React.ReactNode; onClick?: () => void; variant?: "ghost" | "primary" | "danger" }) {
              const [hover, setHover] = useState(false);
              const base: React.CSSProperties = {
                padding: "6px 12px",
                borderRadius: 6,
                border: "1px solid transparent",
                cursor: "pointer",
                transition: "transform 160ms ease, box-shadow 160ms ease, background 160ms ease",
                transform: hover ? "translateY(-2px)" : "none",
                boxShadow: hover ? "0 6px 18px rgba(0,0,0,0.08)" : "none",
              };
              let style: React.CSSProperties = { ...base };
              if (variant === "primary") style = { ...style, background: "#f8e4be", border: "1px solid #f0d89a", color: "#000" };
              if (variant === "ghost") style = { ...style, background: "transparent", border: "1px solid #eee", color: "#111" };
              if (variant === "danger") style = { ...style, background: "#ef4444", color: "#fff", border: "none" };

              return (
                <button
                  onClick={onClick}
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                  style={style}
                >
                  {children}
                </button>
              );
            }

            return (
              <>
                <NavButton onClick={() => router.push("/admin/dashboard")}>Dashboard</NavButton>
                <NavButton variant="primary" onClick={() => router.push("/admin/forms")}>
                  Forms
                </NavButton>
                <NavButton variant="danger" onClick={() => { localStorage.removeItem("admin-token"); router.push("/admin"); }}>
                  Logout
                </NavButton>
              </>
            );
          })()}
        </div>
      </div>

      <main style={{ flex: 1, padding: "40px 64px", display: "flex", gap: 28 }}>
        <div style={{ flex: 1 }}>
          <h2 style={{ margin: 0, fontSize: 32 }}>FORMS</h2>
          <div style={{ color: "#666", marginTop: 6, marginBottom: 12 }}>Details</div>

          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
            <button style={{ background: "#2ecc71", border: "none", color: "#fff", padding: "8px 12px", borderRadius: 6 }}>add form +</button>
          </div>

          <div style={{ border: "1px solid #d0d0d0", borderRadius: 10, padding: 28, minHeight: 240 }}>
            {data.map((label, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "16px 8px", borderBottom: i < data.length - 1 ? "1px solid #f0f0f0" : "none" }}>
                <div style={{ color: "#333" }}>{label}</div>
                <div style={{ color: "#999" }}>›</div>
              </div>
            ))}
          </div>
        </div>

        <aside style={{ width: 180 }}>
          <div style={{ color: "#999", fontSize: 12, marginBottom: 12 }}>OPTION MENU</div>
          <button style={{ display: "block", width: "100%", background: "#27ae60", color: "#fff", padding: 8, borderRadius: 6, border: "none", marginBottom: 12 }}>EDIT</button>
          <button style={{ display: "block", width: "100%", background: "#ef4444", color: "#fff", padding: 8, borderRadius: 6, border: "none" }}>DELETE</button>
        </aside>
      </main>

      <footer style={{ height: 40, background: "#000", color: "#f3b04d", display: "flex", alignItems: "center", paddingLeft: 12 }}>
        <div style={{ fontSize: 12 }}>Copyright © 2016 ANECO, INC.</div>
      </footer>
    </div>
  );
}
