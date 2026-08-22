import React from "react";

export default function Sidebar({ active, onChange, onNew, complaintsCount = 0 }) {
  const items = [
    { key: "dashboard", label: "Dashboard", icon: "📊" },
    { key: "my", label: "My Complaints", icon: "📁", badge: complaintsCount > 0 ? complaintsCount : null },
    { key: "track", label: "Track Complaint", icon: "🔍" },
    { key: "help", label: "Help & Support", icon: "🛟" },
    { key: "about", label: "About RouteIQ", icon: "ℹ️" },
  ];

  return (
    <aside style={{
      width: 260,
      padding: "24px 18px",
      background: "linear-gradient(180deg, #060e1d 0%, #040913 100%)",
      color: "#e6eef8",
      borderRight: "1px solid rgba(255, 255, 255, 0.05)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      flexShrink: 0
    }}>
      <div>
        {/* Brand Header */}
        <div
          onClick={() => onChange("dashboard")}
          style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 24, cursor: "pointer" }}
        >
          <div style={{
            width: 42,
            height: 42,
            borderRadius: 10,
            background: "linear-gradient(135deg, #6b5cff 0%, #3ec1ff 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 800,
            fontSize: 16,
            color: "#ffffff",
            boxShadow: "0 0 20px rgba(107, 92, 255, 0.4)"
          }}>
            RQ
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: "-0.01em", color: "#ffffff" }}>
              ROUTEIQ
            </div>
            <div style={{ color: "#94a3b8", fontSize: 11, fontWeight: 500 }}>
              Cyber Crime Intelligence
            </div>
          </div>
        </div>

        {/* Primary CTA Button */}
        <button
          type="button"
          onClick={onNew}
          className="btn-primary"
          style={{
            width: "100%",
            padding: "12px 14px",
            marginBottom: 20,
            justifyContent: "flex-start",
            fontSize: 14
          }}
        >
          <span style={{ fontSize: 18 }}>+</span> New Complaint
        </button>

        {/* Navigation Items */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {items.map(it => {
            const isActive = active === it.key;

            return (
              <button
                key={it.key}
                type="button"
                onClick={() => onChange(it.key)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "11px 14px",
                  borderRadius: 10,
                  border: "none",
                  background: isActive ? "linear-gradient(90deg, rgba(107, 92, 255, 0.18), rgba(62, 193, 255, 0.06))" : "transparent",
                  color: isActive ? "#ffffff" : "#94a3b8",
                  fontWeight: isActive ? 600 : 500,
                  textAlign: "left",
                  cursor: "pointer",
                  borderLeft: isActive ? "3px solid #6b5cff" : "3px solid transparent",
                  transition: "all 0.15s ease"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 16 }}>{it.icon}</span>
                  <span style={{ fontSize: 13 }}>{it.label}</span>
                </div>

                {it.badge && (
                  <span style={{
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "2px 7px",
                    borderRadius: 10,
                    background: isActive ? "linear-gradient(90deg, #6b5cff, #3ec1ff)" : "rgba(255, 255, 255, 0.1)",
                    color: "#ffffff"
                  }}>
                    {it.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer Security Badge & Helpline */}
      <div>
        <div style={{
          padding: "12px 14px",
          borderRadius: 10,
          background: "rgba(239, 68, 68, 0.1)",
          border: "1px solid rgba(239, 68, 68, 0.2)",
          marginBottom: 12
        }}>
          <div style={{ fontSize: 11, color: "#fca5a5", fontWeight: 700 }}>
            🚨 Emergency Helpline
          </div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#ffffff", marginTop: 2 }}>
            Dial 1930 (24x7 Free)
          </div>
        </div>

        <div style={{
          padding: "12px 14px",
          borderRadius: 10,
          background: "rgba(255, 255, 255, 0.02)",
          border: "1px solid rgba(255, 255, 255, 0.04)",
          color: "#94a3b8"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 14 }}>🔒</span>
            <div style={{ fontWeight: 700, fontSize: 12, color: "#e2e8f0" }}>
              100% Encrypted & Safe
            </div>
          </div>
          <div style={{ fontSize: 11, color: "#64748b", marginTop: 4 }}>
            AES-256 Law Enforcement Standard
          </div>
        </div>
      </div>
    </aside>
  );
}