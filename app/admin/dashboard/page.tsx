"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();

  // Authentication is enforced by `middleware.ts` on the server.
  // No sensitive checks should rely on client-side localStorage.
  useEffect(() => {
    // we could fetch /api/auth/me if you want to show user info client-side
  }, [router]);

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin');
  };

  const cardData = [
    { key: "form1", label: "FORM 1", title: "EMPLOYEE", desc: "Description", img: "/images/form1.jpg" },
    { key: "form2", label: "FORM 2", title: "CONSUMER", desc: "Description", img: "/images/form2.jpg" },
    { key: "form3", label: "FORM 3", title: "OTHERS", desc: "Description", img: "/images/form3.jpg" },
  ];

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#fff" }}>
      {/* header */}
      <div style={{ padding: 18, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <img src="/logo_aneco.png" alt="ANECO" style={{ width: 90, height: "auto" }} />
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {/** NavButton component provides hover + transition styles */}
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
                <NavButton variant="primary" onClick={() => router.push("/admin/dashboard")}>Dashboard</NavButton>
                <NavButton onClick={() => router.push("/admin/forms")}>Forms</NavButton>
                <NavButton variant="danger" onClick={logout}>Logout</NavButton>
              </>
            );
          })()}
        </div>
      </div>

      {/* main content */}
      <main style={{ flex: 1, padding: "40px 64px" }}>
        <div style={{ maxWidth: 1000 }}>
          <h2 style={{ margin: 0, fontSize: 32 }}>FORMS</h2>
          <div style={{ color: "#666", marginTop: 6, marginBottom: 20 }}>MGA FORMS</div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }}>
            {cardData.map((c) => (
              <div key={c.key} style={{ textAlign: "left" }}>
                <div style={{ position: "relative", borderRadius: 12, overflow: "hidden", height: 160, background: "#ddd", display: "flex", alignItems: "flex-end" }}>
                  <div style={{ position: "absolute", top: 8, left: 8, color: "#fff", fontWeight: 700, fontSize: 20, textShadow: "0 1px 2px rgba(0,0,0,0.6)" }}>{c.label}</div>
                  <div style={{ width: "100%", height: "100%", backgroundSize: "cover", backgroundPosition: "center", backgroundImage: `url(${c.img})` }} />
                </div>

                <div style={{ marginTop: 10, fontWeight: 700 }}>{c.title}</div>
                <div style={{ color: "#777", fontSize: 13 }}>{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* footer */}
      <footer style={{ height: 40, background: "#000", color: "#f3b04d", display: "flex", alignItems: "center", paddingLeft: 12 }}>
        <div style={{ fontSize: 12 }}>Copyright © 2016 ANECO, INC.</div>
      </footer>
    </div>
  );
}
