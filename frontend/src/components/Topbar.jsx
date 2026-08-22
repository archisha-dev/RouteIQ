import React, { useState } from "react";

export default function Topbar({ onGoHome, onViewChange, activeView, notifications = [] }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const defaultNotifications = notifications.length > 0 ? notifications : [
    { id: 1, title: "1930 Portal Auto-Sync Active", desc: "Inter-bank Rapid Financial Lien protocol operational.", time: "Just now" },
    { id: 2, title: "Security Advisory", desc: "Beware of malicious APK electricity bill extortion SMS.", time: "2 hrs ago" },
    { id: 3, title: "Case Update: RQ-2026-89412", desc: "Assigned to Inspector Rajesh Sharma, Cyber Cell.", time: "1 day ago" }
  ];

  return (
    <header style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
      paddingBottom: 14,
      borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
      position: "relative",
      zIndex: 50
    }}>
      {/* Navigation Breadcrumbs */}
      <div style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
        <button
          type="button"
          onClick={onGoHome}
          style={{
            background: "transparent",
            border: "none",
            color: activeView === "dashboard" ? "#ffffff" : "#94a3b8",
            fontWeight: activeView === "dashboard" ? 700 : 500,
            fontSize: 14,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6
          }}
        >
          <span>🏠</span> Home
        </button>

        <span style={{ color: "rgba(255, 255, 255, 0.2)" }}>/</span>

        <button
          type="button"
          onClick={() => onViewChange("my")}
          style={{
            background: "transparent",
            border: "none",
            color: activeView === "my" ? "#ffffff" : "#94a3b8",
            fontWeight: activeView === "my" ? 700 : 500,
            fontSize: 14,
            cursor: "pointer"
          }}
        >
          My Complaints
        </button>

        <span style={{ color: "rgba(255, 255, 255, 0.2)" }}>/</span>

        <button
          type="button"
          onClick={() => onViewChange("track")}
          style={{
            background: "transparent",
            border: "none",
            color: activeView === "track" ? "#ffffff" : "#94a3b8",
            fontWeight: activeView === "track" ? 700 : 500,
            fontSize: 14,
            cursor: "pointer"
          }}
        >
          Track Status
        </button>

        <span style={{ color: "rgba(255, 255, 255, 0.2)" }}>/</span>

        <button
          type="button"
          onClick={() => onViewChange("help")}
          style={{
            background: "transparent",
            border: "none",
            color: activeView === "help" ? "#ffffff" : "#94a3b8",
            fontWeight: activeView === "help" ? 700 : 500,
            fontSize: 14,
            cursor: "pointer"
          }}
        >
          Help & FAQs
        </button>
      </div>

      {/* Right Controls: Helpline, Notifications, Profile */}
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        {/* Helpline Pill */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "6px 12px",
          borderRadius: 20,
          background: "rgba(239, 68, 68, 0.15)",
          border: "1px solid rgba(239, 68, 68, 0.3)",
          color: "#fca5a5",
          fontSize: 12,
          fontWeight: 700
        }}>
          <span>📞</span> 1930 Helpline
        </div>

        {/* Notification Bell with Dropdown */}
        <div style={{ position: "relative" }}>
          <button
            type="button"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfile(false);
            }}
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              color: "#cbd5e1",
              width: 38,
              height: 38,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              position: "relative",
              fontSize: 16
            }}
          >
            🔔
            <span style={{
              position: "absolute",
              top: 6,
              right: 6,
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#38bdf8",
              boxShadow: "0 0 8px #38bdf8"
            }} />
          </button>

          {/* Notifications Panel */}
          {showNotifications && (
            <div className="modal-animate" style={{
              position: "absolute",
              top: 48,
              right: 0,
              width: 320,
              background: "#0d1527",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: 12,
              padding: "14px",
              boxShadow: "0 15px 35px rgba(0, 0, 0, 0.6)",
              zIndex: 100
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#ffffff" }}>Live Cyber Alerts</span>
                <span style={{ fontSize: 11, color: "#38bdf8" }}>{defaultNotifications.length} updates</span>
              </div>

              <div style={{ display: "grid", gap: 8 }}>
                {defaultNotifications.map((n, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "8px 10px",
                      borderRadius: 8,
                      background: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid rgba(255, 255, 255, 0.04)",
                      fontSize: 12
                    }}
                  >
                    <div style={{ fontWeight: 600, color: "#f8fafc" }}>{n.title}</div>
                    <div style={{ color: "#94a3b8", fontSize: 11, marginTop: 2 }}>{n.desc}</div>
                    <div style={{ color: "#64748b", fontSize: 10, marginTop: 4 }}>{n.time}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar with Popup */}
        <div style={{ position: "relative" }}>
          <button
            type="button"
            onClick={() => {
              setShowProfile(!showProfile);
              setShowNotifications(false);
            }}
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #6b5cff 0%, #3ec1ff 100%)",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: 14,
              border: "none",
              cursor: "pointer",
              boxShadow: "0 0 12px rgba(107, 92, 255, 0.4)"
            }}
          >
            VD
          </button>

          {/* Profile Modal Dropdown */}
          {showProfile && (
            <div className="modal-animate" style={{
              position: "absolute",
              top: 48,
              right: 0,
              width: 260,
              background: "#0d1527",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: 12,
              padding: "16px",
              boxShadow: "0 15px 35px rgba(0, 0, 0, 0.6)",
              zIndex: 100
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #6b5cff, #3ec1ff)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: 13,
                  color: "#fff"
                }}>
                  VD
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: "#ffffff" }}>Vikram Deshmukh</div>
                  <div style={{ fontSize: 11, color: "#34d399" }}>● Verified Citizen</div>
                </div>
              </div>

              <div style={{ fontSize: 12, color: "#94a3b8", borderTop: "1px solid rgba(255, 255, 255, 0.05)", paddingTop: 10 }}>
                <div><strong>Phone:</strong> +91 98201 45872</div>
                <div style={{ marginTop: 4 }}><strong>Location:</strong> Mumbai, Maharashtra</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}