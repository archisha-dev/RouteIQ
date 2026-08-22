import React from "react";

export default function AboutRouteIQ({ onNew }) {
  return (
    <div className="fade-in" style={{ maxWidth: 960, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <span style={{
          fontSize: 11,
          fontWeight: 700,
          padding: "4px 12px",
          borderRadius: 20,
          background: "rgba(107, 92, 255, 0.2)",
          color: "#c7d2fe",
          border: "1px solid rgba(107, 92, 255, 0.4)",
          display: "inline-block",
          marginBottom: 10
        }}>
          ROUTEIQ CYBER INTELLIGENCE ARCHITECTURE
        </span>
        <h2 style={{ fontSize: 26, margin: "0 0 10px", color: "#ffffff" }}>
          Next-Generation Cyber Crime Classification & Rapid Routing
        </h2>
        <p style={{ color: "#94a3b8", fontSize: 14, margin: 0, maxWidth: 680, marginInline: "auto", lineHeight: 1.5 }}>
          RouteIQ bridges the gap between cyber victims and law enforcement by deploying intelligent categorization, instant financial lien notices, and end-to-end evidence pipelines.
        </p>
      </div>

      {/* 4 Core Pillars Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 28 }}>
        {[
          {
            icon: "🧠",
            title: "Dynamic AI Crime Classification",
            desc: "Parses complex complaint narratives across 8 specialized domains (Financial, POCSO, Women Safety, Ransomware) and extracts critical forensic hashes instantly."
          },
          {
            icon: "⚡",
            title: "1930 & Banking Nodal Rapid Sync",
            desc: "Automatically drafts and dispatches inter-bank lien requests and beneficiary freezing alerts to minimize financial leakage during the golden response window."
          },
          {
            icon: "🔐",
            title: "Zero-Knowledge & Privacy Safeguards",
            desc: "Complies with statutory privacy standards, offering confidential anonymous reporting with 256-bit AES encryption on all uploaded evidence files."
          },
          {
            icon: "📡",
            title: "Inter-Agency Jurisdictional Routing",
            desc: "Eliminates multi-jurisdiction confusion by mapping incidents to the exact state cyber cell, district police station, and designated investigating officer."
          }
        ].map((pillar, i) => (
          <div
            key={i}
            style={{
              background: "linear-gradient(180deg, #0d1629 0%, #09101f 100%)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: 14,
              padding: "22px",
              display: "flex",
              gap: 16
            }}
          >
            <div style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background: "rgba(107, 92, 255, 0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              flexShrink: 0
            }}>
              {pillar.icon}
            </div>

            <div>
              <h3 style={{ margin: "0 0 6px", fontSize: 16, color: "#ffffff" }}>
                {pillar.title}
              </h3>
              <p style={{ margin: 0, fontSize: 13, color: "#94a3b8", lineHeight: 1.5 }}>
                {pillar.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Box */}
      <div style={{
        background: "linear-gradient(135deg, rgba(107, 92, 255, 0.12) 0%, rgba(62, 193, 255, 0.08) 100%)",
        border: "1px solid rgba(107, 92, 255, 0.25)",
        borderRadius: 16,
        padding: "24px 28px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 16
      }}>
        <div>
          <h3 style={{ margin: "0 0 6px", fontSize: 18, color: "#ffffff" }}>
            Ready to file or track a cyber complaint?
          </h3>
          <p style={{ margin: 0, fontSize: 13, color: "#cbd5e1" }}>
            Our dynamic intake forms adapt directly to the nature of the crime for expedited review.
          </p>
        </div>

        <button type="button" onClick={onNew} className="btn-primary">
          + Start Registration Form
        </button>
      </div>
    </div>
  );
}
