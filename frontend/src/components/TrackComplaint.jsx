import React, { useState, useEffect } from "react";

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  } catch {
    return iso;
  }
}

export default function TrackComplaint({ complaints = [], initialTrackingId = "", onGoHome, onNew }) {
  const [searchId, setSearchId] = useState(initialTrackingId || "");
  const [foundComplaint, setFoundComplaint] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (initialTrackingId) {
      setSearchId(initialTrackingId);
      performSearch(initialTrackingId);
    }
  }, [initialTrackingId, complaints]);

  const performSearch = (idToSearch) => {
    const term = (idToSearch || searchId).trim().toLowerCase();
    setHasSearched(true);
    if (!term) {
      setFoundComplaint(null);
      return;
    }

    const match = complaints.find(
      c => (c.id && c.id.toLowerCase() === term) ||
           (c.ackNumber && c.ackNumber.toLowerCase() === term) ||
           (c.contact && c.contact.includes(term))
    );

    setFoundComplaint(match || null);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    performSearch(searchId);
  };

  const getStepStatus = (stepIndex, status) => {
    // 0: Registered, 1: Routed, 2: Assigned, 3: Investigation, 4: Resolved
    if (status === "Resolved") return "completed";
    if (status === "Under Investigation" || status === "Under Review") {
      if (stepIndex <= 2) return "completed";
      if (stepIndex === 3) return "active";
      return "pending";
    }
    // Registered
    if (stepIndex === 0) return "completed";
    if (stepIndex === 1) return "active";
    return "pending";
  };

  const steps = [
    { title: "Complaint Logged", desc: "Submitted & Encrypted" },
    { title: "AI Classification", desc: "RouteIQ Cell Mapping" },
    { title: "Officer Assigned", desc: "Forensic Officer Allocated" },
    { title: "Active Investigation", desc: "Legal & Recovery Action" },
    { title: "Case Resolution", desc: "Closed & Redressed" }
  ];

  return (
    <div className="fade-in" style={{ maxWidth: 960, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <h2 style={{ fontSize: 24, margin: "0 0 8px", color: "#ffffff" }}>
          Cyber Crime Real-Time Status Tracker
        </h2>
        <p style={{ color: "#94a3b8", fontSize: 14, margin: 0 }}>
          Enter your RouteIQ Tracking ID (e.g. RQ-2026-XXXXX) or FIR Reference Number to view live investigation progress.
        </p>
      </div>

      {/* Search Box Card */}
      <div style={{
        background: "linear-gradient(135deg, #0d1629 0%, #09101f 100%)",
        border: "1px solid rgba(107, 92, 255, 0.3)",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4), 0 0 20px rgba(107, 92, 255, 0.1)",
        borderRadius: 16,
        padding: "24px",
        marginBottom: 24
      }}>
        <form onSubmit={handleSearchSubmit} style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <div style={{ position: "relative", flex: 1, minWidth: 260 }}>
            <input
              type="text"
              placeholder="Enter Tracking ID (e.g., RQ-2026-89412 or ACK-MH-94812)..."
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              style={{
                padding: "12px 16px 12px 42px",
                fontSize: 15,
                fontWeight: 500,
                background: "#060b16",
                borderColor: "rgba(255, 255, 255, 0.12)"
              }}
            />
            <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16, color: "#6b5cff" }}>
              🔍
            </span>
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{ padding: "12px 24px", fontSize: 14 }}
          >
            Track Status
          </button>
        </form>

        {/* Quick sample chips */}
        <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <span style={{ fontSize: 12, color: "#64748b" }}>Quick Test Sample Cases:</span>
          {complaints.slice(0, 3).map(c => (
            <button
              key={c.id}
              type="button"
              onClick={() => {
                setSearchId(c.id);
                performSearch(c.id);
              }}
              style={{
                fontSize: 11,
                padding: "4px 10px",
                borderRadius: 6,
                background: "rgba(107, 92, 255, 0.15)",
                color: "#c7d2fe",
                border: "1px solid rgba(107, 92, 255, 0.3)"
              }}
            >
              {c.id} ({c.categoryTitle || c.category})
            </button>
          ))}
        </div>
      </div>

      {/* Case Details or Not Found */}
      {hasSearched && !foundComplaint && (
        <div style={{
          background: "#0a1120",
          border: "1px dashed rgba(239, 68, 68, 0.3)",
          borderRadius: 14,
          padding: "36px 20px",
          textAlign: "center",
          color: "#f87171"
        }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>⚠️</div>
          <h3 style={{ margin: "0 0 6px", fontSize: 16 }}>No Active Case Found</h3>
          <p style={{ margin: "0 0 14px", color: "#94a3b8", fontSize: 13 }}>
            Could not find any complaint matching ID "<strong>{searchId}</strong>". Please check for typos or file a new report.
          </p>
          <button type="button" onClick={onNew} className="btn-primary">
            + File a New Complaint
          </button>
        </div>
      )}

      {foundComplaint && (
        <div className="fade-in" style={{ display: "grid", gap: 20 }}>
          {/* Main Status Header Card */}
          <div style={{
            background: "linear-gradient(180deg, #0d1629 0%, #09101f 100%)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: 16,
            padding: "22px 24px"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 14 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                  <span style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#38bdf8",
                    background: "rgba(56, 189, 248, 0.15)",
                    padding: "3px 10px",
                    borderRadius: 6,
                    border: "1px solid rgba(56, 189, 248, 0.25)"
                  }}>
                    {foundComplaint.id}
                  </span>

                  <span style={{ fontSize: 13, color: "#94a3b8" }}>
                    FIR Ref: <strong style={{ color: "#ffffff" }}>{foundComplaint.ackNumber}</strong>
                  </span>
                </div>

                <h3 style={{ margin: "0 0 4px", fontSize: 18, color: "#ffffff" }}>
                  {foundComplaint.title}
                </h3>
                <div style={{ color: "#94a3b8", fontSize: 13 }}>
                  Category: <strong style={{ color: "#a5b4fc" }}>{foundComplaint.categoryTitle}</strong> • Registered on {formatDate(foundComplaint.createdAt)}
                </div>
              </div>

              <div style={{
                padding: "6px 16px",
                borderRadius: 20,
                fontSize: 13,
                fontWeight: 700,
                background: foundComplaint.status === "Resolved" ? "rgba(16, 185, 129, 0.2)" : "rgba(129, 140, 248, 0.2)",
                color: foundComplaint.status === "Resolved" ? "#34d399" : "#a5b4fc",
                border: `1px solid ${foundComplaint.status === "Resolved" ? "rgba(16, 185, 129, 0.4)" : "rgba(129, 140, 248, 0.4)"}`
              }}>
                ● {foundComplaint.status}
              </div>
            </div>

            {/* 5-Step Visual Progress Stepper */}
            <div style={{ marginTop: 28, marginBottom: 12 }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8, position: "relative" }}>
                {steps.map((st, i) => {
                  const state = getStepStatus(i, foundComplaint.status);
                  const isCompleted = state === "completed";
                  const isActive = state === "active";

                  return (
                    <div key={i} style={{ textAlign: "center", position: "relative" }}>
                      {/* Step Circle */}
                      <div style={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        margin: "0 auto 8px",
                        background: isCompleted ? "#10b981" : (isActive ? "linear-gradient(135deg, #6b5cff, #3ec1ff)" : "#1e293b"),
                        color: isCompleted || isActive ? "#ffffff" : "#64748b",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 13,
                        fontWeight: 700,
                        boxShadow: isActive ? "0 0 15px rgba(107, 92, 255, 0.6)" : "none",
                        border: isActive ? "2px solid #ffffff" : "none"
                      }}>
                        {isCompleted ? "✓" : i + 1}
                      </div>

                      <div style={{ fontSize: 12, fontWeight: 600, color: isCompleted || isActive ? "#f8fafc" : "#64748b" }}>
                        {st.title}
                      </div>
                      <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 2 }}>
                        {st.desc}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Assigned Cell & Officer Card */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16
          }}>
            <div style={{
              background: "rgba(255, 255, 255, 0.02)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              borderRadius: 14,
              padding: "18px 20px"
            }}>
              <h4 style={{ margin: "0 0 12px", fontSize: 14, color: "#38bdf8" }}>
                Assigned Cyber Division & Officer
              </h4>
              <div style={{ display: "grid", gap: 8, fontSize: 13 }}>
                <div>
                  <span style={{ color: "#64748b" }}>Division:</span>
                  <div style={{ fontWeight: 600, color: "#f8fafc" }}>{foundComplaint.department}</div>
                </div>
                <div>
                  <span style={{ color: "#64748b" }}>Lead Investigating Officer:</span>
                  <div style={{ fontWeight: 600, color: "#34d399" }}>{foundComplaint.assignedOfficer || "Cyber Desk Inspector"}</div>
                </div>
                <div>
                  <span style={{ color: "#64748b" }}>Jurisdiction:</span>
                  <div style={{ color: "#cbd5e1" }}>{foundComplaint.policeStation || "Regional Cyber Police Station"}, {foundComplaint.city}</div>
                </div>
              </div>
            </div>

            <div style={{
              background: "rgba(255, 255, 255, 0.02)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              borderRadius: 14,
              padding: "18px 20px"
            }}>
              <h4 style={{ margin: "0 0 12px", fontSize: 14, color: "#38bdf8" }}>
                Emergency Cyber Helpline
              </h4>
              <p style={{ margin: "0 0 12px", fontSize: 13, color: "#94a3b8" }}>
                For immediate financial transaction freezing or urgent physical safety concerns, contact the national cyber desk directly:
              </p>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "8px 14px",
                borderRadius: 8,
                background: "rgba(239, 68, 68, 0.15)",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                color: "#fca5a5",
                fontWeight: 700,
                fontSize: 14
              }}>
                📞 Dial 1930 (24x7 Toll Free)
              </div>
            </div>
          </div>

          {/* Full Activity & Milestone Timeline */}
          <div style={{
            background: "linear-gradient(180deg, #0d1629 0%, #09101f 100%)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: 16,
            padding: "22px 24px"
          }}>
            <h4 style={{ margin: "0 0 16px", fontSize: 15, color: "#ffffff" }}>
              Case Activity & Forensic Trail ({foundComplaint.updates ? foundComplaint.updates.length : 0} Events)
            </h4>

            <div style={{ display: "grid", gap: 14 }}>
              {(foundComplaint.updates || []).map((u, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 14,
                    padding: "12px 14px",
                    background: "rgba(255, 255, 255, 0.02)",
                    borderRadius: 10,
                    border: "1px solid rgba(255, 255, 255, 0.04)"
                  }}
                >
                  <div style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: "rgba(107, 92, 255, 0.2)",
                    color: "#a5b4fc",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    flexShrink: 0
                  }}>
                    {idx + 1}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
                      <div style={{ fontWeight: 600, color: "#f8fafc", fontSize: 13 }}>
                        {u.title}
                      </div>
                      <div style={{ fontSize: 11, color: "#64748b" }}>
                        {formatDate(u.timestamp)}
                      </div>
                    </div>
                    <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 4, lineHeight: 1.45 }}>
                      {u.detail}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
