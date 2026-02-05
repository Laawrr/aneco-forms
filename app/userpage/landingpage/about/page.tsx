"use client";
import Link from "next/link";
import React from "react";
import "../globals.css";

export default function AboutPage() {
  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          <img src="/logo_aneco.png" alt="ANECO logo" className="logo-img" />
        </div>

        <nav className="nav">
          <Link href="/userpage" className="nav-btn">
            Survey Forms
          </Link>
          <Link href="/about" className="nav-btn active">
            About
          </Link>
          <Link href="/satisfaction" className="nav-btn">
            Satisfaction Form
          </Link>
        </nav>
      </header>

      <main className="main">
        <h1 className="page-title">About</h1>
        <div style={{ maxWidth: 860 }}>
          <p style={{ color: "#374151", fontSize: 16, lineHeight: 1.6 }}>
            Agusan del Norte Electric Cooperative, Inc. (ANECO) is committed to
            providing reliable electric service to its member-consumers while
            promoting sustainable development and excellent customer
            experiences. This example About page is a placeholder you can
            expand with mission, history, contact details, or team information.
          </p>

          <p style={{ marginTop: 18 }}>
            <Link href="/userpage" className="nav-btn">
              Back to Survey Forms
            </Link>
          </p>
        </div>
      </main>

      <footer style={{ height: 40, background: "#000", color: "#f3b04d", display: "flex", alignItems: "center", paddingLeft: 12 }}>
        <div style={{ fontSize: 12 }}>Copyright © 2016 ANECO, INC.</div>
      </footer>
    </div>
  );
}
