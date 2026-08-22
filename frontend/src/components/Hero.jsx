import React from "react";

export default function Hero({ onRegister, onTrack }) {
  return (
    <div style={{
      background: "linear-gradient(135deg, rgba(107, 92, 255, 0.1) 0%, rgba(62, 193, 255, 0.05) 50%, rgba(13, 22, 41, 0.9) 100%)",
      padding: "24px 28px",
      borderRadius: "16px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      border: "1px solid rgba(107, 92, 255, 0.2)",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.35), 0 0 20px rgba(107, 92, 255, 0.08)",
      position: "relative",
      overflow: "hidden",
      gap: 20
    }}>
      {/* Background ambient glow */}
      <div style={{
        position: "absolute",
        top: -40,
        left: -40,
        width: 160,
        height: 160,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(107, 92, 255, 0.25) 0%, transparent 70%)",
        filter: "blur(20px)",
        pointerEvents: "none"
      }} />

      <div style={{ flex: 1, zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <span style={{
            fontSize: 11,
            fontWeight: 700,
            padding: "3px 10px",
            borderRadius: 20,
            background: "rgba(107, 92, 255, 0.25)",
            color: "#c7d2fe",
            border: "1px solid rgba(107, 92, 255, 0.4)",
            display: "inline-flex",
            alignItems: "center",
            gap: 6
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#38bdf8", display: "inline-block" }} />
            RouteIQ Intelligence Portal 2.0
          </span>

          <span style={{
            fontSize: 11,
            fontWeight: 600,
            padding: "3px 10px",
            borderRadius: 20,
            background: "rgba(239, 68, 68, 0.15)",
            color: "#fca5a5",
            border: "1px solid rgba(239, 68, 68, 0.3)"
          }}>
            📞 Helpline: 1930
          </span>
        </div>

        <h2 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: "#ffffff" }}>
          File a Cyber Crime Complaint
        </h2>
        <p style={{ margin: "8px 0 0 0", color: "#94a3b8", fontSize: 14, maxWidth: 640, lineHeight: 1.5 }}>
          Provide accurate details and our AI model will immediately analyze, classify, and route your complaint directly to the specialized cyber cell division.
        </p>

        {/* Action Button Row */}
        <div style={{ display: "flex", gap: 12, marginTop: 18, flexWrap: "wrap", alignItems: "center" }}>
          <button
            type="button"
            onClick={onRegister}
            className="btn-primary"
            style={{ padding: "10px 20px", fontSize: 14 }}
          >
          
          

          <button
            type="button"
            onClick={onTrack}
            className="btn-secondary"
            style={{ padding: "10px 18px", fontSize: 14 }}
          >
            🔍 Track Existing Complaint
          </button>
        </div>

        {/* Quick Highlights */}
        <div style={{ display: "flex", gap: 20, marginTop: 20, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#cbd5e1" }}>
            <span style={{ color: "#34d399" }}>✓</span> Real-time 1930 Portal Integration
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#cbd5e1" }}>
            <span style={{ color: "#38bdf8" }}>✓</span> End-to-End 256-bit Encryption
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#cbd5e1" }}>
            <span style={{ color: "#a78bfa" }}>✓</span> Immediate FIR Acknowledgment
          </div>
        </div>
      </div>

      {/* Cyber Shield Visual Graphic */}
      <div style={{
        width: 140,
        height: 110,
        borderRadius: 14,
        background: "linear-gradient(135deg, #0d1933, #070d1c)",
        border: "1px solid rgba(107, 92, 255, 0.25)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.5), inset 0 0 15px rgba(107, 92, 255, 0.15)",
        flexShrink: 0
      }}>
        <svg width="56" height="56" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <defs>
            <linearGradient id="shieldGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#6b5cff" />
              <stop offset="100%" stopColor="#3ec1ff" />
            </linearGradient>
          </defs>
          <rect x="8" y="4" width="48" height="56" rx="10" fill="rgba(107, 92, 255, 0.12)" />
          <path d="M32 10L46 16V26C46 39.5 32 47 32 47C32 47 18 39.5 18 26V16L32 10Z" stroke="url(#shieldGrad)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="rgba(11, 18, 32, 0.8)" />
          <rect x="27" y="27" width="10" height="9" rx="2" fill="none" stroke="#3ec1ff" strokeWidth="1.8" />
          <path d="M29 27V24C29 22.3431 30.3431 21 32 21C33.6569 21 35 22.3431 35 24V27" stroke="#3ec1ff" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        <span style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", marginTop: 4, letterSpacing: "0.06em" }}>
          ROUTEIQ SHIELD
        </span>
      </div>
    </div>
  );
}