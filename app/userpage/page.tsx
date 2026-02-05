"use client";
import React, { useState } from "react";
import Link from "next/link";
import "./index.css";

const surveys = Array.from({ length: 6 });

export default function UserPage() {
  const [query, setQuery] = useState("");

  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          <img src="/logo_aneco.png" alt="ANECO logo" className="logo-img" />
        </div>

        <nav className="nav">
          <Link href="/" className="nav-btn active">
            Survey Forms
          </Link>
          <Link href="/about" className="nav-btn">
            About
          </Link>
          <Link href="/satisfaction" className="nav-btn">
            Satisfaction Form
          </Link>
        </nav>

        <div className="search">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for Survey forms"
            aria-label="Search"
          />
        </div>
      </header>

      <main className="main">
        <h1 className="page-title">Survey Forms</h1>

        <div className="grid">
          {surveys.map((_, i) => (
            <Link href={`/forms/${i}`} key={i} className="card-link">
              <article className="card">
                <div className="card-preview">
                  <div className="preview-paper">
                    <div className="preview-top">
                      <div className="preview-title">CUSTOMER SURVEY</div>
                      <div className="preview-green-line" />
                    </div>
                    <div className="preview-body">
                      <div className="dots" />
                    </div>
                  </div>
                </div>

                <h3 className="card-title">Customers Feedback Form</h3>
                <p className="card-desc">
                  Please rate our services. Your feedback is valuable to us. Thank
                  You very much.
                </p>
              </article>
            </Link>
          ))}
        </div>
      </main>

      <footer style={{ height: 40, background: "#000", color: "#f3b04d", display: "flex", alignItems: "center", paddingLeft: 12 }}>
        <div style={{ fontSize: 12 }}>Copyright © 2016 ANECO, INC.</div>
      </footer>
    </div>
  );
}
