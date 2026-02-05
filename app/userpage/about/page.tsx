"use client";
import Link from "next/link";
import React from "react";

export default function AboutPage() {
  return (
    <div className="app about-page">
      <header className="header">
       <div className="logo">
          <img src="/logo_aneco.png" alt="ANECO logo" className="logo-img" />
        </div>

        <nav className="nav">
          <Link href="/userpage/landingpage" className="nav-btn">
            Survey Forms
          </Link>
          <Link href="/userpage/about" className="nav-btn active">
            About
          </Link>
        </nav>
      </header>

      <main className="main">
        <div className="about-container">
          <section className="about-intro">
            <div className="about-text">
              <h1 className="about-title">Corporate Profile</h1>
              <p>
                The Agusan del Norte Electric Cooperative, Inc. (ANECO) is a non-stock,
                non-profit, service oriented electric cooperative responsible for the
                distribution of power to households, businesses and industries in
                Agusan del Norte.
              </p>

              <p>
                ANECO was incorporated on February 12, 1977 under the provisions of PD
                269 and operates to provide reliable electric service to its
                member-consumers across multiple cities and municipalities.
              </p>

              <h3 className="section-heading">Area of Business Operation</h3>
              <ul className="areas-list">
                <li>District 1 - Central Butuan</li>
                <li>District 2 - Northeast Butuan</li>
                <li>District 3 - Northwest Butuan</li>
                <li>District 4 - Southeast Butuan</li>
                <li>District 5 - Southwest Butuan</li>
                <li>District 6 - Cabadbaran City and RTR</li>
                <li>District 7 - Nasipit</li>
                <li>District 8 - Buenavista</li>
                <li>District 9 - Las Nieves</li>
                <li>District 10 - Carmen</li>
              </ul>
            </div>

            <aside className="about-aside">
              <img src="/aneco-logo.svg" alt="ANECO" className="about-logo" />
              <div className="quick-facts">
                <h4>Quick Facts</h4>
                <p>Members: ~137,000</p>
                <p>Total Demand: ~55 MW</p>
              </div>
            </aside>
          </section>

          <section className="vision-mission">
            <h2 className="section-heading">Vision and Mission</h2>
            <div className="vm-grid">
              <div>
                <h4 className="vm-title">Our Vision</h4>
                <p>The leading and innovative electric distribution utility service in CARAGA by 2026.</p>
              </div>
              <div>
                <h4 className="vm-title">Our Mission</h4>
                <p>To provide safe and reliable energy distribution service to ensure consumers' satisfaction beyond expectation.</p>
              </div>
            </div>
          </section>

          <section className="directors">
            <h2 className="section-heading">ANECO Board of Directors</h2>

            {/* Featured President */}
            <div className="featured-officer">
              <div className="featured-name">Romeo J. Gumadlas</div>
              <div className="featured-role">President</div>
              <div className="featured-district">District - 10 Carmen</div>
            </div>

            {/* Officers Grid */}
            <div className="directors-grid">
              {[
                { name: "Manuelito C. Suan", role: "Executive Vice President", district: "District - 2 Northeast Butuan" },
                { name: "Tito A. Bebis", role: "VP-External Affairs", district: "District - 9 Southeast Butuan" },
                { name: "Nicolas D. Hernandez", role: "VP-District Operations", district: "District - 6 RTR/Cabadabaran" },
                { name: "Rodolfo L. Ranoco", role: "Treasurer", district: "District - 1 Cabadbaran" },
                { name: "Marlon R. Labis", role: "Secretary", district: "District - 3 Lasam" },
                { name: "Roger L. Nanol", role: "Board Member", district: "District - 4 Butuan" },
                { name: "Randy T. Comandante", role: "Board Member", district: "District - 5 Magallanes" },
                { name: "Norberto M. Ablen", role: "Board Member", district: "District - 7 Surigao" },
                { name: "Walter A. Butao", role: "Board Member", district: "District - 8 Tandag" },
                { name: "Khevin M. Bucong", role: "Board Member", district: "District - 11 Bislig" },
                { name: "Lourdesita E. Parajes", role: "Board Member", district: "District - 12 General Santos" },
                { name: "Darwin T. Daymiel", role: "General Manager", district: "Management" },
              ].map((officer, i) => (
                <div className="director" key={i}>
                  <div className="director-name">{officer.name}</div>
                  <div className="director-role">{officer.role}</div>
                  <div className="director-district">{officer.district}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="history">
            <h2 className="section-heading">Brief History of ANECO</h2>
            <p>
              ANECO was established to bring electrification and development to the
              communities it serves. Over the decades ANECO expanded its service area
              and improved reliability through investments in substations and lines.
            </p>
          </section>

          <section className="awards">
            <h2 className="section-heading">Awards and Recognitions</h2>
            <div className="award-gallery">
              <div className="award">Award 1</div>
              <div className="award">Award 2</div>
              <div className="award">Award 3</div>
            </div>
          </section>

          <section className="substations">
            <h2 className="section-heading">Substations and Facilities</h2>
            <div className="substations-grid">
              {Array.from({ length: 9 }).map((_, i) => (
                <div className="substation" key={i}>Substation {i + 1}</div>
              ))}
            </div>
          </section>

          <section className="map-section">
            <h2 className="section-heading">Service Area Map</h2>
            <div className="map-placeholder">Map (embed)</div>
          </section>

        </div>
      </main>

      <footer>
        <div style={{ fontSize: 12 }}>Copyright © 2016 ANECO, INC.</div>
      </footer>
    </div>
  );
}
// canonical About page (client component) — no server redirect here
