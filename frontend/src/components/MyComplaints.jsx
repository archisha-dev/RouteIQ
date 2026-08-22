import React, { useState } from "react";

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

export default function MyComplaints({ complaints = [], onNew, onTrack, onAddUpdate }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [newNote, setNewNote] = useState("");
  const [noteSuccess, setNoteSuccess] = useState(false);

  const filteredComplaints = complaints.filter(c => {
    const matchesSearch =
      (c.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.id || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.categoryTitle || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.ackNumber || "").toLowerCase().includes(searchQuery.toLowerCase());

    if (filterStatus === "all") return matchesSearch;
    if (filterStatus === "registered") return matchesSearch && c.status === "Registered";
    if (filterStatus === "investigating") return matchesSearch && (c.status === "Under Investigation" || c.status === "Under Review");
    if (filterStatus === "resolved") return matchesSearch && c.status === "Resolved";
    return matchesSearch;
  });

  const handleAddNoteSubmit = (e) => {
    e.preventDefault();
    if (!newNote.trim() || !selectedComplaint) return;

    const newEntry = {
      timestamp: new Date().toISOString(),
      title: "Supplemental Note / Information Added",
      detail: newNote.trim()
    };

    if (onAddUpdate) {
      onAddUpdate(selectedComplaint.id, newEntry);
    }

    setSelectedComplaint(prev => ({
      ...prev,
      updates: [...(prev.updates || []), newEntry]
    }));

    setNewNote("");
    setNoteSuccess(true);
    setTimeout(() => setNoteSuccess(false), 3000);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Resolved":
        return { bg: "rgba(16, 185, 129, 0.15)", color: "#34d399", border: "1px solid rgba(16, 185, 129, 0.3)" };
      case "Under Investigation":
      case "Under Review":
        return { bg: "rgba(129, 140, 248, 0.15)", color: "#a5b4fc", border: "1px solid rgba(129, 140, 248, 0.3)" };
      default:
        return { bg: "rgba(245, 158, 11, 0.15)", color: "#fbbf24", border: "1px solid rgba(245, 158, 11, 0.3)" };
    }
  };

  return (
    <div className="fade-in">
      {/* Top Header & Search Bar */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 16,
        marginBottom: 20
      }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 22, color: "#ffffff" }}>My Registered Complaints</h2>
          <p style={{ margin: "4px 0 0", color: "#94a3b8", fontSize: 13 }}>
            Monitor investigation status, view case updates, and manage submitted evidence.
          </p>
        </div>

        <button
          type="button"
          onClick={onNew}
          className="btn-primary"
          style={{ padding: "9px 16px", fontSize: 13 }}
        >
          + Register New Complaint
        </button>
      </div>

      {/* Filter Tabs & Search Box */}
      <div style={{
        background: "#0a1120",
        padding: "14px 18px",
        borderRadius: 12,
        border: "1px solid rgba(255, 255, 255, 0.06)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 12,
        marginBottom: 20
      }}>
        {/* Search */}
        <div style={{ position: "relative", minWidth: 260, flex: "1 1 300px" }}>
          <input
            type="text"
            placeholder="Search by ID, Category, Title, or FIR..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              paddingLeft: 36,
              background: "#060b16",
              borderColor: "rgba(255, 255, 255, 0.08)",
              fontSize: 13
            }}
          />
          <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#64748b", fontSize: 14 }}>
            🔍
          </span>
        </div>

        {/* Filter Pills */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {[
            { key: "all", label: `All (${complaints.length})` },
            { key: "registered", label: "Registered" },
            { key: "investigating", label: "In Investigation" },
            { key: "resolved", label: "Resolved" }
          ].map(f => (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilterStatus(f.key)}
              style={{
                padding: "6px 14px",
                borderRadius: 20,
                fontSize: 12,
                fontWeight: 600,
                border: "none",
                background: filterStatus === f.key ? "linear-gradient(90deg, #6b5cff, #3ec1ff)" : "rgba(255, 255, 255, 0.04)",
                color: filterStatus === f.key ? "#ffffff" : "#94a3b8"
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Complaints List or Empty State */}
      {filteredComplaints.length === 0 ? (
        <div style={{
          background: "#0a1120",
          border: "1px dashed rgba(255, 255, 255, 0.1)",
          borderRadius: 14,
          padding: "48px 24px",
          textAlign: "center"
        }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>📂</div>
          <h3 style={{ margin: "0 0 6px", fontSize: 16, color: "#ffffff" }}>No Complaints Found</h3>
          <p style={{ margin: "0 0 16px", color: "#94a3b8", fontSize: 13 }}>
            {searchQuery ? "No cases match your search query." : "You haven't filed any complaints yet."}
          </p>
          <button type="button" onClick={onNew} className="btn-primary">
            + File a Cyber Crime Complaint
          </button>
        </div>
      ) : (
        <div style={{ display: "grid", gap: 14 }}>
          {filteredComplaints.map(c => {
            const badge = getStatusBadge(c.status);

            return (
              <div
                key={c.id}
                style={{
                  background: "linear-gradient(180deg, #0d1629 0%, #09101f 100%)",
                  border: "1px solid rgba(255, 255, 255, 0.07)",
                  borderRadius: 14,
                  padding: "18px 20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: 16,
                  flexWrap: "wrap",
                  transition: "border-color 0.2s, box-shadow 0.2s"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(107, 92, 255, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.07)";
                }}
              >
                <div style={{ flex: "1 1 380px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
                    <span style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: "#38bdf8",
                      background: "rgba(56, 189, 248, 0.1)",
                      padding: "2px 8px",
                      borderRadius: 6,
                      border: "1px solid rgba(56, 189, 248, 0.2)"
                    }}>
                      {c.id}
                    </span>

                    <span style={{ fontSize: 12, color: "#94a3b8" }}>
                      FIR: <strong style={{ color: "#cbd5e1" }}>{c.ackNumber || "ACK-PENDING"}</strong>
                    </span>

                    <span style={{
                      fontSize: 11,
                      padding: "2px 8px",
                      borderRadius: 12,
                      background: "rgba(107, 92, 255, 0.15)",
                      color: "#c7d2fe",
                      fontWeight: 600
                    }}>
                      {c.categoryTitle || c.category}
                    </span>

                    {c.priority && (
                      <span style={{
                        fontSize: 11,
                        padding: "2px 6px",
                        borderRadius: 4,
                        background: c.priority === "Critical" ? "rgba(239, 68, 68, 0.2)" : "rgba(245, 158, 11, 0.2)",
                        color: c.priority === "Critical" ? "#f87171" : "#fbbf24",
                        fontWeight: 600
                      }}>
                        {c.priority} Priority
                      </span>
                    )}
                  </div>

                  <h3 style={{ margin: "0 0 6px", fontSize: 16, color: "#ffffff" }}>
                    {c.title}
                  </h3>

                  <p style={{
                    margin: "0 0 10px",
                    color: "#94a3b8",
                    fontSize: 13,
                    lineHeight: 1.45,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden"
                  }}>
                    {c.description}
                  </p>

                  <div style={{ display: "flex", gap: 14, fontSize: 12, color: "#64748b", flexWrap: "wrap" }}>
                    <span>📍 {c.city || "Online"}, {c.state || "India"}</span>
                    <span>🏛️ {c.department || "Cyber Crime Wing"}</span>
                    <span>🕒 {formatDate(c.createdAt)}</span>
                  </div>
                </div>

                {/* Right Column: Status & Buttons */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10, flexShrink: 0 }}>
                  <div style={{
                    padding: "4px 12px",
                    borderRadius: 20,
                    fontSize: 12,
                    fontWeight: 700,
                    ...badge
                  }}>
                    ● {c.status}
                  </div>

                  <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                    <button
                      type="button"
                      onClick={() => setSelectedComplaint(c)}
                      className="btn-primary"
                      style={{ padding: "8px 14px", fontSize: 12 }}
                    >
                      Inspect Case
                    </button>

                    <button
                      type="button"
                      onClick={() => onTrack && onTrack(c.id)}
                      className="btn-outline"
                      style={{ padding: "8px 12px", fontSize: 12 }}
                    >
                      Track Live ➔
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* DEEP CASE INSPECTION MODAL */}
      {selectedComplaint && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(3, 7, 18, 0.85)",
          backdropFilter: "blur(8px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1050,
          padding: 16
        }}>
          <div className="modal-animate" style={{
            width: 820,
            maxWidth: "100%",
            maxHeight: "92vh",
            background: "#0d1527",
            borderRadius: 16,
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 25px 60px rgba(0, 0, 0, 0.9)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            color: "#f1f5f9"
          }}>
            {/* Header */}
            <div style={{
              padding: "18px 24px",
              background: "#080e1c",
              borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{
                    fontSize: 12,
                    fontWeight: 700,
                    padding: "3px 8px",
                    borderRadius: 6,
                    background: "rgba(56, 189, 248, 0.15)",
                    color: "#38bdf8"
                  }}>
                    {selectedComplaint.id}
                  </span>
                  <span style={{ fontSize: 12, color: "#94a3b8" }}>
                    FIR Ref: <strong style={{ color: "#ffffff" }}>{selectedComplaint.ackNumber}</strong>
                  </span>
                </div>
                <h3 style={{ margin: "6px 0 0", fontSize: 18, color: "#ffffff" }}>
                  {selectedComplaint.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setSelectedComplaint(null)}
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  color: "#94a3b8",
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14
                }}
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
              {/* Status Banner */}
              <div style={{
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
                borderRadius: 12,
                padding: "14px 18px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 12,
                marginBottom: 20,
                fontSize: 13
              }}>
                <div>
                  <span style={{ color: "#64748b" }}>Current Status:</span>
                  <div style={{ fontWeight: 700, color: "#34d399", marginTop: 2 }}>
                    ● {selectedComplaint.status}
                  </div>
                </div>
                <div>
                  <span style={{ color: "#64748b" }}>Assigned Division:</span>
                  <div style={{ fontWeight: 600, color: "#cbd5e1", marginTop: 2 }}>
                    {selectedComplaint.department}
                  </div>
                </div>
                <div>
                  <span style={{ color: "#64748b" }}>Investigating Officer:</span>
                  <div style={{ fontWeight: 600, color: "#38bdf8", marginTop: 2 }}>
                    {selectedComplaint.assignedOfficer || "Assigned via Cell Head"}
                  </div>
                </div>
              </div>

              {/* Comprehensive Narrative */}
              <div style={{ marginBottom: 20 }}>
                <h4 style={{ margin: "0 0 8px", fontSize: 14, color: "#38bdf8" }}>Incident Statement</h4>
                <div style={{
                  background: "#080e1a",
                  padding: "14px 16px",
                  borderRadius: 10,
                  fontSize: 13,
                  color: "#cbd5e1",
                  lineHeight: 1.55,
                  border: "1px solid rgba(255, 255, 255, 0.04)"
                }}>
                  {selectedComplaint.description}
                </div>
              </div>

              {/* Dynamic Category-Specific Parameters */}
              {selectedComplaint.specificData && Object.keys(selectedComplaint.specificData).length > 0 && (
                <div style={{ marginBottom: 20 }}>
                  <h4 style={{ margin: "0 0 8px", fontSize: 14, color: "#38bdf8" }}>
                    Category Parameters ({selectedComplaint.categoryTitle || selectedComplaint.category})
                  </h4>
                  <div style={{
                    background: "#080e1a",
                    padding: "14px 16px",
                    borderRadius: 10,
                    border: "1px solid rgba(255, 255, 255, 0.04)",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 12,
                    fontSize: 13
                  }}>
                    {Object.entries(selectedComplaint.specificData).map(([key, val]) => (
                      <div key={key}>
                        <div style={{ color: "#64748b", textTransform: "capitalize", fontSize: 11 }}>
                          {key.replace(/([A-Z])/g, " $1")}
                        </div>
                        <div style={{ color: "#f8fafc", fontWeight: 500, marginTop: 2 }}>
                          {String(val)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Complainant & Jurisdiction */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
                marginBottom: 20
              }}>
                <div style={{
                  background: "#080e1a",
                  padding: "12px 16px",
                  borderRadius: 10,
                  border: "1px solid rgba(255, 255, 255, 0.04)",
                  fontSize: 13
                }}>
                  <h4 style={{ margin: "0 0 6px", fontSize: 13, color: "#94a3b8" }}>Complainant Info</h4>
                  <div><strong style={{ color: "#cbd5e1" }}>Name:</strong> {selectedComplaint.name}</div>
                  <div><strong style={{ color: "#cbd5e1" }}>Contact:</strong> {selectedComplaint.contact}</div>
                  <div><strong style={{ color: "#cbd5e1" }}>Email:</strong> {selectedComplaint.email}</div>
                </div>

                <div style={{
                  background: "#080e1a",
                  padding: "12px 16px",
                  borderRadius: 10,
                  border: "1px solid rgba(255, 255, 255, 0.04)",
                  fontSize: 13
                }}>
                  <h4 style={{ margin: "0 0 6px", fontSize: 13, color: "#94a3b8" }}>Jurisdiction & Timeline</h4>
                  <div><strong style={{ color: "#cbd5e1" }}>State/City:</strong> {selectedComplaint.city}, {selectedComplaint.state}</div>
                  <div><strong style={{ color: "#cbd5e1" }}>Station:</strong> {selectedComplaint.policeStation || "Cyber Police Station"}</div>
                  <div><strong style={{ color: "#cbd5e1" }}>Logged:</strong> {formatDate(selectedComplaint.createdAt)}</div>
                </div>
              </div>

              {/* Activity & Investigation Milestones */}
              <div style={{ marginBottom: 20 }}>
                <h4 style={{ margin: "0 0 10px", fontSize: 14, color: "#38bdf8" }}>
                  Investigation Timeline & Milestones
                </h4>
                <div style={{
                  background: "#080e1a",
                  padding: "16px",
                  borderRadius: 10,
                  border: "1px solid rgba(255, 255, 255, 0.04)"
                }}>
                  {(selectedComplaint.updates || []).map((u, i) => (
                    <div
                      key={i}
                      style={{
                        position: "relative",
                        paddingLeft: 24,
                        paddingBottom: i === (selectedComplaint.updates.length - 1) ? 0 : 16,
                        borderLeft: i === (selectedComplaint.updates.length - 1) ? "none" : "2px solid rgba(107, 92, 255, 0.3)",
                        marginLeft: 6
                      }}
                    >
                      <div style={{
                        position: "absolute",
                        left: -6,
                        top: 0,
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: "#38bdf8",
                        boxShadow: "0 0 10px #38bdf8"
                      }} />
                      <div style={{ fontSize: 11, color: "#64748b" }}>
                        {formatDate(u.timestamp)}
                      </div>
                      <div style={{ fontWeight: 600, color: "#f8fafc", fontSize: 13, marginTop: 2 }}>
                        {u.title}
                      </div>
                      <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>
                        {u.detail}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add Supplemental Note / Information */}
              <div style={{
                background: "rgba(107, 92, 255, 0.05)",
                border: "1px solid rgba(107, 92, 255, 0.2)",
                borderRadius: 10,
                padding: "14px 16px"
              }}>
                <h4 style={{ margin: "0 0 6px", fontSize: 13, color: "#c7d2fe" }}>
                  Add Supplemental Evidence / Statement Note
                </h4>
                <form onSubmit={handleAddNoteSubmit}>
                  <textarea
                    rows={2}
                    placeholder="Provide additional transaction IDs, suspect links, or follow-up notes..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    style={{ background: "#060b16", marginBottom: 8, fontSize: 13 }}
                  />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    {noteSuccess ? (
                      <span style={{ fontSize: 12, color: "#34d399" }}>✓ Note appended to investigation log</span>
                    ) : <span />}
                    <button
                      type="submit"
                      className="btn-primary"
                      style={{ padding: "6px 14px", fontSize: 12 }}
                    >
                      Submit Update
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Footer */}
            <div style={{
              padding: "14px 24px",
              background: "#080e1c",
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <button
                type="button"
                onClick={() => window.print()}
                style={{
                  background: "transparent",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  color: "#cbd5e1",
                  padding: "8px 14px",
                  borderRadius: 8,
                  fontSize: 13
                }}
              >
                🖨️ Print FIR Slip
              </button>

              <button
                type="button"
                onClick={() => setSelectedComplaint(null)}
                className="btn-secondary"
                style={{ padding: "8px 18px", fontSize: 13 }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}