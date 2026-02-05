"use client";
import React from "react";
import Link from "next/link";

type Props = { params: { id: string } };

export default function FormDetail({ params }: Props) {
  const { id } = params;

  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          <img src="/logo_aneco.png" alt="ANECO logo" className="logo-img" />
        </div>

          <nav className="nav">
            <Link href="/userpage/landingpage" className="nav-btn">
              Survey Forms
            </Link>
            <Link href="/userpage/about" className="nav-btn">
              About
            </Link>
        </nav>
      </header>

      <main className="main">
        <h1 className="page-title">Form Detail</h1>

        <div style={{ maxWidth: 880 }}>
          <h2>Form #{id}</h2>
          <p style={{ color: "#6b7280" }}>
            This is a placeholder detail page for the selected survey form.
            Replace this content with the actual form builder/viewer as needed.
          </p>

          <div style={{ marginTop: 20 }}>
              <Link href="/userpage/landingpage" className="nav-btn">
              ← Back to Surveys
            </Link>
          </div>
        </div>
      </main>

      <footer style={{ height: 40, background: "#000", color: "#f3b04d", display: "flex", alignItems: "center", paddingLeft: 12 }}>
        <div style={{ fontSize: 12 }}>Copyright © 2016 ANECO, INC.</div>
      </footer>
    </div>
  );
}
